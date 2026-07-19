//  JesAI API Route — ILRMF Orchestrator
// Zero LLM. Zero transformation bridge.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { LawArea, KnowledgeResult } from "@/lib/shared/types";
import { queryKnowledge, detectArea, TIER_PRICING } from "@/lib/knowledge";
import type { ILRMFInput, ILRMFResult, VerdictBand } from "@/lib/ilrmf/ilrmf-types";
import { runILRMF } from "@/lib/ilrmf/engine";
import {
  matchScenario, nextStep,
  isNextStepCommand, isPrevStepCommand,
  type ScenarioSession,
} from "@/lib/scenarios/manager";

// ─── Auth ──────────────────────────────────────────────────

function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function verifyUserIsPaid(token: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { data: { user } } = await getSupabaseServer().auth.getUser(token);
    if (!user) return false;
    const { data: p } = await getSupabaseServer().from("users").select("is_paid, tier_expires_at").eq("id", user.id).single();
    if (!p?.is_paid) return false;
    if (p.tier_expires_at && new Date(p.tier_expires_at) < new Date()) return false;
    return true;
  } catch { return false; }
}

// ─── Helpers ───────────────────────────────────────────────

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "01XXXXXXXXX";

function detectLanguage(t: string): "en" | "bn" {
  return /[\u0980-\u09FF]/.test(t) ? "bn" : "en";
}

const AREA_LABELS: Record<string, { en: string; bn: string }> = {
  property: { en: "Land & Property Law", bn: "জমি ও সম্পত্তি আইন" },
  criminal: { en: "Criminal Law", bn: "ফৌজদারি আইন" },
  family: { en: "Family Law", bn: "পারিবারিক আইন" },
  labour: { en: "Labour Law", bn: "শ্রমিক আইন" },
  company: { en: "Company Law", bn: "কোম্পানী আইন" },
  tax: { en: "Tax Law", bn: "কর আইন" },
  nrb: { en: "NRB Investment Law", bn: "প্রবাসী বিনিয়োগ আইন" },
  constitutional: { en: "Constitutional Law", bn: "সংবিধান আইন" },
  consumer: { en: "Consumer Rights Law", bn: "ভোক্তা অধিকার আইন" },
  cyber: { en: "Cyber Law", bn: "সাইবার আইন" },
  contract: { en: "Contract Law", bn: "চুক্তি আইন" },
};

function outOfScope(sel: LawArea, det: LawArea | null, lang: "en" | "bn") {
  const s = AREA_LABELS[sel] ?? { en: sel, bn: sel };
  const d = det ? AREA_LABELS[det] : null;
  return lang === "bn"
    ? `⚠️ আপনি **${s.bn}** বিভাগে আছেন।${d ? ` আপনার প্রশ্ন **${d.bn}** সম্পর্কিত।` : ""} অনুগ্রহ করে **${s.bn}** সম্পর্কে জিজ্ঞাসা করুন।`
    : `⚠️ You are in **${s.en}**.${d ? ` Your question is about **${d.en}**.` : ""} Please ask about **${s.en}** only.`;
}

const FALLBACKS: Record<string, string> = {
  property: "**Land & Property Law — Bangladesh**\n\nPlease describe:\n• Location of the property\n• When the issue started\n• Documents you have\n\n_I understand property disputes can be stressful._",
  criminal: "**Criminal Law — Bangladesh**\n\nPlease describe:\n• What happened\n• When and where\n• Has any FIR been filed?\n\n_Criminal matters can be frightening._",
  family: "**Family Law — Bangladesh**\n\nPlease describe your family law matter.\n\n_Family matters are deeply personal._",
  labour: "**Labour Law — Bangladesh**\n\nPlease describe your employment situation.\n\n_Your rights as a worker matter._",
  company: "**Company Law — Bangladesh**\n\nPlease describe your company or business matter.\n\n_Let me simplify company law for you._",
  tax: "**Tax Law — Bangladesh**\n\nPlease describe your tax situation.\n\n_Tax issues are time-sensitive._",
  nrb: "**NRB Investment — Bangladesh**\n\nPlease describe your NRB matter.\n\n_Cross-border rules are complex._",
  constitutional: "**Constitutional Law — Bangladesh**\n\nPlease describe your constitutional rights matter.\n\n_Your rights are fundamental._",
  consumer: "**Consumer Rights — Bangladesh**\n\nPlease describe your consumer complaint.\n\n_You have legal protections._",
  cyber: "**Cyber Law — Bangladesh**\n\nPlease describe your cyber law matter.\n\n_Digital crime is serious._",
  contract: "**Contract Law — Bangladesh**\n\nPlease describe your contract matter.\n\n_Contracts are about enforcing promises._",
  general: "I'm JesAI. Please describe your legal situation:\n1. What happened\n2. Who is involved\n3. What you want\n\n**JesAI covers:** Land • Criminal • Family • Labour • Company • Tax • NRB • Constitutional • Consumer • Cyber",
};

const sessions = new Map<string, ScenarioSession>();

function getSessionId(req: NextRequest) {
  return `${req.headers.get("x-forwarded-for") ?? "anon"}::${(req.headers.get("user-agent") ?? "").slice(0, 40)}`;
}

const VERDICT_CONFIDENCE: Record<VerdictBand, string> = {
  GREEN: "high", YELLOW: "medium", RED: "low", BLACK: "critical",
};

function ilrmfMeta(r: ILRMFResult, lang: "en" | "bn", paid: boolean) {
  return {
    area: r.area,
    confidence: VERDICT_CONFIDENCE[r.verdict],
    escalate: r.escalate,
    escalateReason: r.escalateReason,
    language: lang,
    paywallActive: !paid,
    verdict: r.verdict,
    confidenceScore: r.confidenceScore,
    traceId: r.trace.traceId,
    source: r.source,
    matchedEntryId: r.matchedEntryId,
    matchedRuleIds: r.matchedRuleIds,
  };
}

function scenarioMeta(r: { scenario: { area: string; escalate: boolean; scenarioId: string }; stepNumber: number; totalSteps: number; progressPercent: number; isComplete: boolean }, lang: "en" | "bn") {
  return {
    area: r.scenario.area, confidence: "high" as const, escalate: r.scenario.escalate,
    language: lang, paywallActive: false,
    scenario: { scenarioId: r.scenario.scenarioId, stepNumber: r.stepNumber, totalSteps: r.totalSteps, progressPercent: r.progressPercent, isComplete: r.isComplete },
  };
}

// ─── POST Handler ──────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { message, selectedArea = null, history = [] } = (await req.json()) as {
      message: string; selectedArea?: LawArea | null; history?: { role: string; content: string }[];
    };

    const token = req.headers.get("authorization")?.replace("Bearer ", "").trim() ?? null;
    const isPaid = await verifyUserIsPaid(token);

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const lang = detectLanguage(message);
    const sid = getSessionId(req);
    const session = sessions.get(sid);

    // Step 0: Scenario navigation
    if (session) {
      if (isNextStepCommand(message)) {
        const r = nextStep(session.scenarioId, session.currentStepIndex);
        if (r.matched) {
          r.isComplete ? sessions.delete(sid) : sessions.set(sid, { scenarioId: r.scenario.scenarioId, currentStepIndex: r.stepNumber - 1 });
          return NextResponse.json({ response: r.summary, source: "scenario", metadata: scenarioMeta(r, lang) });
        }
      }
      if (isPrevStepCommand(message)) {
        const r = nextStep(session.scenarioId, Math.max(0, session.currentStepIndex - 2));
        if (r.matched) {
          sessions.set(sid, { scenarioId: r.scenario.scenarioId, currentStepIndex: r.stepNumber - 1 });
          return NextResponse.json({ response: r.summary, source: "scenario", metadata: scenarioMeta(r, lang) });
        }
      }
    }

    // Step 1: Subject lock
    if (selectedArea) {
      const det = detectArea(message);
      if (det && det !== selectedArea && det !== "general") {
        return NextResponse.json({ response: outOfScope(selectedArea, det, lang), source: "guard", metadata: { area: selectedArea, confidence: "low", escalate: false, language: lang, paywallActive: false, offTopic: true } });
      }
    }

    // Step 2: RAG
    const knowledgeResult: KnowledgeResult = queryKnowledge(message, selectedArea);

    // Step 3: ILRMF (zero bridge — direct pass-through)
    const ilrmf: ILRMFResult = runILRMF({
      message,
      knowledge: knowledgeResult,
      isPaid,
      language: lang,
    });

    // Step 4: ILRMF hit
    if (ilrmf.verdict !== "BLACK") {
      return NextResponse.json({ response: ilrmf.responseText, source: "ilrmf_deterministic", metadata: ilrmfMeta(ilrmf, lang, isPaid) });
    }

    // Step 5: Scenario fallback
    const sc = matchScenario(message, session);
    if (sc.matched) {
      const det = detectArea(message);
      const wrong = (selectedArea && sc.scenario.area !== selectedArea) || (!selectedArea && det && det !== "general" && det !== sc.scenario.area);
      if (!wrong) {
        sessions.set(sid, { scenarioId: sc.scenario.scenarioId, currentStepIndex: sc.stepNumber - 1 });
        return NextResponse.json({ response: sc.summary, source: "scenario", metadata: scenarioMeta(sc, lang) });
      }
    }

    // Step 6: Area fallback
    const fb = selectedArea || knowledgeResult.area || "general";
    if (fb) {
      const isFirstMessage = !history || history.length === 0;
      const msgLower = message.toLowerCase().trim();
      const isJustGreeting = /^(hi|hello|hey|assalamu|salam|greetings)/.test(msgLower);
      if (isFirstMessage || isJustGreeting || msgLower.length < 10) {
        return NextResponse.json({ response: FALLBACKS[fb] || FALLBACKS["general"], source: "area_prompt", metadata: { area: fb, confidence: "low", escalate: false, language: lang, paywallActive: false, ilrmfVerdict: "BLACK", traceId: ilrmf.trace.traceId } });
      }
      const isInheritance = /(son|father|inherit|ancestral|self-acquired|share|will|gift)/.test(msgLower);
      // NOTE: original regex had a stray "|s|" alternative (from a mangled "Cox's Bazar" entry)
      // which matched almost any message containing the letter "s". Fixed below.
      const hasLocation = /(dhaka|chittagong|sylhet|rajshahi|khulna|barisal|rangpur|mymensingh|comilla|narayanganj|gazipur|tangail|bogra|cox's bazar|coxs bazar|pabna|dinajpur|jessore|kushtia|faridpur|madaripur|gopalganj|shariatpur|rajbari|manikganj|munshiganj|narsingdi|kishoreganj|brahmanbaria|chandpur|feni|noakhali|lakshmipur|khagrachari|rangamati|bandarban|habiganj|maulvibazar|sunamganj|netrokona|jamalpur|sherpur|naogaon|natore|sirajganj|meherpur|chuadanga|jhenaidah|magura|narail|bagerhat|satkhira|pirojpur|jhalokati|bhola|patuakhali|barguna|joypurhat|gaibandha|kurigram|lalmonirhat|nilphamari|panchagarh|thakurgaon|district|upazila|thana|village|mouza|dag|khatian|cs|sa|rs|plot|land|flat|apartment|building|shop|office|factory|warehouse|agricultural|homestead|commercial|residential|industrial)/.test(msgLower);
      const hasDocument = /(deed|sale deed|bain|kabala|khatian|mutation|cs|sa|rs|dag|plot|registration|registered|unregistered|forged|fake|false|fraud|cheat|betray|agreement|contract|power of attorney|poa|will|gift|partition|release|relinquishment|exchange|lease|mortgage|lien|encumbrance|nec|non-encumbrance|court order|injunction|decree|judgment|fir|gd|general diary|complaint|case|suit|petition|appeal|revision|review|execution|warrant|attachment|auction|sale certificate|possession|delivery|eviction|ejectment|trespass|boundary|survey|demarcation|map|plan|blueprint|photo|video|witness|affidavit|notary|stamp|revenue|rent|lease|tenancy|landlord|tenant|occupancy|possession|adverse|prescription|limitation|12 years|30 years|prescription|easement|right of way|right to light|right to air|right to water|drainage|path|road|highway|river|canal|pond|tank|well|tube well|borehole|boundary|wall|fence|pillar|demarcation|survey|map|plan)/.test(msgLower);
      const hasAction = /(fake|forged|false|fraud|cheat|deceive|betray|trick|scam|con|duped|fooled|misled|misrepresent|conceal|hide|suppress|destroy|tear|burn|alter|tamper|forge|fabricate|create|make|prepare|execute|register|transfer|sell|buy|purchase|acquire|inherit|bequeath|gift|donate|partition|divide|share|release|relinquish|exchange|lease|rent|mortgage|pledge|hypothecate|charge|lien|encumber|attach|seize|confiscate|auction|sell|purchase|acquire|possess|occupy|trespass|encroach|adverse|prescription|evict|eject|remove|dispossess|displace|oust|throw|turn|lock|break|enter|force|trespass|intrude|encroach|invade|usurp|seize|take|grab|capture|occupy|hold|keep|retain|refuse|deny|reject|dispute|challenge|contest|oppose|resist|defy|violate|breach|break|violate|infringe|trespass|encroach|infringe|violate|breach|default|fail|neglect|omit|delay|defer|postpone|suspend|stay|stop|halt|prevent|hinder|obstruct|impede|interfere|intervene|interrupt|disrupt|disturb|interfere|meddle|tamper|alter|change|modify|vary|amend|revise|correct|rectify|remedy|repair|fix|restore|recover|retrieve|reclaim|repossess|reinstate|reinstall|replace|substitute|exchange|swap|trade|barter|transfer|convey|assign|devise|bequeath|gift|donate|grant|give|hand|deliver|surrender|yield|waive|abandon|relinquish|renounce|disclaim|disown|repudiate|reject|refuse|decline|deny|dispute|challenge|contest|oppose|resist|defy|violate|breach|break|default|fail|file|suit|case|petition|application|appeal|revision|review|execution|warrant|attachment|auction|sale|certificate|possession|delivery|eviction|ejectment|trespass|boundary|survey|demarcation|map|plan|photo|video|witness|affidavit|notary|stamp|rent|lease|tenancy|landlord|tenant|occupancy|possession|adverse|prescription|limitation|12 years|30 years|prescription|easement|right of way|right to light|right to air|right to water|drainage|path|road|highway|river|canal|pond|tank|well|tube well|borehole|boundary|wall|fence|pillar|demarcation|survey|map|plan)/.test(msgLower);

      // Per-area adaptive follow-up. This block only runs after RAG + ILRMF have
      // already failed to match real knowledge (verdict === BLACK), so it must
      // NEVER return canned "legal guidance" text here — that was tried (see
      // commit ea99f0b) and reverted (c177f6b) because it displaced honest
      // uncertainty with fake-specific boilerplate. It only decides which
      // clarifying questions to ask, and skips ones the user already answered.
      function buildFollowUp(): { bn: string; en: string } {
        const preview = message.slice(0, 100);

        if (fb === "property" && isInheritance) {
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik mullayoner jonno:\n• Sompotti ki poitrik (dada/propitamoher) naki pitar nijossho uparjon?\n• Apnar dhormo ki (Muslim/Hindu/Christian)?\n• Apni proptoboyoshk ki na ebong biye hoyeche kina?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To assess this inheritance matter:\n• Is the property ancestral (from the grandfather) or self-acquired by the father?\n• What is your religion? (Muslim/Hindu/Christian)\n• Are you an adult, and are you married?\n\n_These details determine which law applies and what share you may be entitled to._`,
          };
        }

        if (fb === "property") {
          const bnQs: string[] = [];
          const enQs: string[] = [];
          if (!hasLocation) { bnQs.push("সম্পত্তিটি কোথায় অবস্থিত?"); enQs.push("Where is the property located?"); }
          if (!hasDocument) { bnQs.push("আপনার কাছে কী কাগজপত্র আছে? (দলিল, খতিয়ান, চুক্তিপত্র)"); enQs.push("What documents do you have? (deed, khatian, agreement)"); }
          if (!hasAction) { bnQs.push("সমস্যাটি কখন শুরু হয়েছে, এবং ইতিমধ্যে কোনো আইনি পদক্ষেপ নেওয়া হয়েছে কি?"); enQs.push("When did this start, and has any legal action already been taken?"); }
          if (bnQs.length === 0) { bnQs.push("আর কোনো প্রাসঙ্গিক বিস্তারিত জানাতে পারবেন?"); enQs.push("Is there any other relevant detail you can share?"); }
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsher jonno:\n${bnQs.map((q) => `• ${q}`).join("\n")}\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To help you properly:\n${enQs.map((q) => `• ${q}`).join("\n")}\n\n_These details are essential for accurate legal guidance._`,
          };
        }

        if (fb === "family") {
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsher jonno:\n• Apnar bishoy ta ki? (biye, talaq, denmohor, khoroposh, custody, ityadi)\n• Ei somossati kokhon theke shuru hoyeche?\n• Family Court e age kono avedon kora hoyeche ki?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To help you properly:\n• What is the specific family issue? (marriage, talaq/divorce, mahr, maintenance, custody, etc.)\n• When did this issue start?\n• Has any application already been filed in Family Court?\n\n_These details are essential for accurate legal guidance._`,
          };
        }

        if (fb === "criminal") {
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsher jonno:\n• Ki ghotona ghotechhe, ebong kokhon?\n• Kono FIR ba GD kora hoyeche ki?\n• Accused ba avijukto ke ke?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To help you properly:\n• What happened, and when?\n• Has an FIR or GD already been filed?\n• Who is the accused?\n\n_These details are essential for accurate legal guidance._`,
          };
        }

        if (fb === "labour") {
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsher jonno:\n• Apnar employment contract ba appointment letter ache ki?\n• Ki dhoroner somossa (termination, salary, notice period, ityadi)?\n• Employer er shathe kono legal step neya hoyeche ki?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To help you properly:\n• Do you have an employment contract or appointment letter?\n• What type of issue is this (termination, unpaid salary, notice period, etc.)?\n• Has any legal step already been taken with the employer?\n\n_These details are essential for accurate legal guidance._`,
          };
        }

        if (fb === "tax") {
          return {
            bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsher jonno:\n• Apnar income source ki? (salary, business, rental, ityadi)\n• Kono tax notice ashe ki?\n• Assessment year ki?\n\n_Ei tothyo chhara shothik tax poramorsho dewa shombhob noy._`,
            en: `I understand you're asking about "${preview}...". To help you properly:\n• What is your income source? (salary, business, rental, etc.)\n• Have you received any tax notice?\n• What assessment year is this for?\n\n_These details are necessary for accurate tax advice._`,
          };
        }

        return {
          bn: `Ami apnar prosno bujhte parchi: "${preview}...". Shothik poramorsho dewar jonno aro kichu tothyo din:\n• Somossati kokhon theke shuru hoyeche?\n• Kon kon shonstha ba shokti e somporkit?\n• Apnar kache ki kagojpotro ache?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`,
          en: `I understand you are asking about "${preview}...". To help you properly under Bangladesh law, I need more details:\n• When did this issue start?\n• Which institutions or authorities are involved?\n• What documents do you have?\n\n_These details are essential for accurate legal guidance._`,
        };
      }

      const followUp = buildFollowUp();
      const contextualFollowUp = lang === "bn" ? followUp.bn : followUp.en;

      return NextResponse.json({ response: contextualFollowUp, source: "contextual_followup", metadata: { area: fb, confidence: "low", escalate: false, language: lang, paywallActive: false, ilrmfVerdict: "BLACK", traceId: ilrmf.trace.traceId } });
    }

    // Step 7: Final fallback
    const finalText = lang === "bn"
      ? `⛔ **BLACK — কোনো প্রযোজ্য নিয়ম মেলেনি**\n\nআপনার প্রশ্নটি বর্তমান কর্পাসের সুযোগের বাইরে।\n\n_Trace ID: ${ilrmf.trace.traceId}_`
      : `⛔ **BLACK — No operable rule match**\n\nYour query is outside the current rule corpus scope.\n\n_Trace ID: ${ilrmf.trace.traceId}_`;

    return NextResponse.json({ response: finalText, source: "fallback", metadata: { area: null, confidence: "critical", escalate: true, language: lang, paywallActive: false, traceId: ilrmf.trace.traceId } });
  } catch (e) {
    console.error("JesAI error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "healthy", engine: "ILRMF v2.1.0", mode: "deterministic", llmEnabled: false, timestamp: new Date().toISOString() });
}