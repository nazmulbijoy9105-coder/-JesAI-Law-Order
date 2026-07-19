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
    const msgLower = message.toLowerCase().trim();

    // ─── NEW: Echo detection ─────────────────────────────────
    function isEchoOfPreviousResponse(input: string, history: { role: string; content: string }[]): boolean {
      if (!history || history.length === 0) return false;
      const lastAssistantMsg = history
        .filter(m => m.role === "assistant")
        .pop()?.content;
      if (!lastAssistantMsg) return false;
      const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
      const normInput = normalize(input);
      const normLast = normalize(lastAssistantMsg);
      const botArtifacts = ["trace id:", "pipeline:", "verdict:", "⚠️ unlock", "⛔ **black", "ilrmf", "corpus"];
      const hasBotArtifact = botArtifacts.some(a => normInput.includes(a));
      const similarity = normInput === normLast || (normInput.length > 20 && normLast.includes(normInput.slice(0, 50)));
      return hasBotArtifact || similarity;
    }

    if (isEchoOfPreviousResponse(message, history)) {
      const echoResponse = lang === "bn"
        ? "Mone hochche apni amar puroborti uttor copy-paste korechen. Apnar nijer obostha ba prosnoti bolen."
        : "It looks like you pasted my previous response. Please describe your own situation or ask your question in your own words.";
      return NextResponse.json({
        response: echoResponse,
        source: "echo_guard",
        metadata: { area: selectedArea, confidence: "low", escalate: false, language: lang, paywallActive: false }
      });
    }

    // ─── NEW: Category selection detection ───────────────────
    function isCategorySelection(input: string, area: string | null): boolean {
      if (!area) return false;
      const areaLabels: Record<string, string[]> = {
        criminal: ["police & criminal", "police and criminal", "crime", "police"],
        family: ["family & marriage", "family law", "marriage", "family"],
        tax: ["tax law", "tax"],
        property: ["land & property", "property law", "land law"],
        labour: ["labour law", "employment"],
        company: ["company law", "business law"],
        consumer: ["consumer rights", "consumer law"],
        cyber: ["cyber law", "digital law"],
        contract: ["contract law"],
        constitutional: ["constitutional law"],
        nrb: ["nrb investment", "nrb law"],
      };
      const labels = areaLabels[area] || [];
      return labels.some(label => input.includes(label));
    }

    if (isCategorySelection(msgLower, selectedArea)) {
      const fb = selectedArea || "general";
      return NextResponse.json({
        response: FALLBACKS[fb] || FALLBACKS["general"],
        source: "area_prompt",
        metadata: { area: fb, confidence: "low", escalate: false, language: lang, paywallActive: false }
      });
    }

    // ─── NEW: Sample/example request detection ────────────────
    function detectUserIntent(input: string): "question" | "sample_request" | "greeting" | "echo" | "unclear" {
      const m = input.toLowerCase();
      if (/^(hi|hello|hey|assalamu|salam)/.test(m)) return "greeting";
      if (/(sample|example|fact pattern|demo|scenario|show me|give me an example)/.test(m)) return "sample_request";
      if (m.includes("trace id:") || m.includes("verdict:") || m.includes("pipeline:")) return "echo";
      if (/\b(what|how|when|where|why|can|could|should|will|is|are|do|does|explain|help|guide)\b/.test(m) || m.includes("?")) return "question";
      return "unclear";
    }

    const intent = detectUserIntent(msgLower);

        if (intent === "sample_request") {
      const area = selectedArea || "general";
      const samples: Record<string, { en: string; bn: string }> = {
        criminal: {
          en: `**Sample — Criminal Law**\n\n"My shop was broken into last night in Dhaka. Cash and goods stolen. No FIR filed yet."\n\n**Issues:** Theft (S.379), police reporting, insurance claim.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — ফৌজদারি আইন**\n\n"গতরাতে আমার দোকানে চুরি হয়েছে। টাকা ও মালামাল চুরি গেছে। এখনো FIR করা হয়নি।"\n\n**সমস্যা:** চুরি (S.379), পুলিশ রিপোর্ট, বীমা দাবি।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        },
        family: {
          en: `**Sample — Family Law**\n\n"Husband left 6 months ago, stopped all maintenance. I have nikahnama."\n\n**Issues:** Maintenance (MFLO S.3), judicial divorce grounds.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — পারিবারিক আইন**\n\n"স্বামী ৬ মাস আগে চলে গেছেন, ভরণপোষণ দেন না। নিকাহনামা আছে।"\n\n**সমস্যা:** ভরণপোষণ (MFLO S.3), বিচারিক তালাকের মানদণ্ড।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        },
        tax: {
          en: `**Sample — Tax Law**\n\n"NBR sent demand notice claiming I under-reported income by Tk 2 lakh."\n\n**Issues:** Assessment validity, appeal to Commissioner (Appeals), documentation.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — কর আইন**\n\n"NBR চাহিদা নোটিশ পাঠিয়েছে, আমি ২ লাখ টাকা কম দেখিয়েছি বলে দাবি।"\n\n**সমস্যা:** মূল্যায়নের বৈধতা, কমিশনারের আপিল, কাগজপত্র।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        },
        property: {
          en: `**Sample — Property Law**\n\n"Neighbor built a wall 2 feet onto my land. I have CS khatian showing boundary."\n\n**Issues:** Boundary dispute, encroachment, survey demarcation.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — জমি আইন**\n\n"প্রতিবেশী আমার জমিতে ২ ফুট দেয়াল তৈরি করেছে। CS খতিয়ানে সীমানা আছে।"\n\n**সমস্যা:** সীমানা বিরোধ, জবরদখল, সার্ভে নির্ধারণ।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        },
        labour: {
          en: `**Sample — Labour Law**\n\n"Fired after 5 years without notice or gratuity. Have appointment letter."\n\n**Issues:** Unfair dismissal, gratuity (Labour Act S.2), notice pay.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — শ্রম আইন**\n\n"৫ বছর চাকরির পর নোটিশ ছাড়া চাকরিচ্যুত, গ্র্যাচুইটি পাইনি। অ্যাপয়েন্টমেন্ট লেটার আছে।"\n\n**সমস্যা:** অন্যায় চাকরিচ্যুতি, গ্র্যাচুইটি (শ্রম আইন S.2), নোটিশ পে।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        },
        general: {
          en: `**Sample — Legal Scenario**\n\n"Paid Tk 50,000 advance for a flat. Seller now refuses to register the deed."\n\n**Issues:** Breach of contract, specific performance, refund claim.\n\n*Does this match? Tell me what's different.*`,
          bn: `**Sample — আইনি পরিস্থিতি**\n\n"ফ্ল্যাটের জন্য ৫০,০০০ টাকা অগ্রিম দিয়েছি। বিক্রেতা এখন দলিল রেজিস্ট্রেশন করতে অস্বীকার করছে।"\n\n**সমস্যা:** চুক্তি লঙ্ঘন, নির্দিষ্ট পালন, ফেরত দাবি।\n\n*আপনার ক্ষেত্রে কী ভিন্ন?*`
        }
      };

      const sampleResponse = (samples[area] || samples["general"])[lang];
      return NextResponse.json({
        response: sampleResponse,
        source: "sample_scenario",
        metadata: { area: selectedArea, confidence: "high", escalate: false, language: lang, paywallActive: false }
      });
    }

    if (intent === "unclear" && msgLower.length > 5) {
      const noQuestionResponse = lang === "bn"
        ? "Ami apnar prosnoti bujhte parchi na. Ekti nirdishto prosno korun, ba apnar obostha bolen."
        : "I don't see a specific question. Please ask something specific, or describe your situation.";
      return NextResponse.json({
        response: noQuestionResponse,
        source: "clarification",
        metadata: { area: selectedArea, confidence: "low", escalate: false, language: lang, paywallActive: false }
      });
    }

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
      // msgLower already declared above
      const isJustGreeting = /^(hi|hello|hey|assalamu|salam|greetings)/.test(msgLower);
      if (isFirstMessage || isJustGreeting || msgLower.length < 10) {
        return NextResponse.json({ response: FALLBACKS[fb] || FALLBACKS["general"], source: "area_prompt", metadata: { area: fb, confidence: "low", escalate: false, language: lang, paywallActive: false, ilrmfVerdict: "BLACK", traceId: ilrmf.trace.traceId } });
      }
      const isInheritance = /(son|father|inherit|ancestral|self-acquired|share|will|gift)/.test(msgLower);
      const hasFamily = /(divorce|marriage|nikah|talaq|khula|custody|maintenance|dowry|domestic violence|husband|wife|child|children|guardian|ward|adoption|inheritance|family property|family dispute)/i.test(msgLower);
      const hasCriminal = /(fir|arrest|bail|assault|theft|fraud|cheating|forgery|murder|rape|kidnapping|extortion|robbery|dacoity|riot|unlawful assembly|criminal breach|criminal intimidation|attempt|conspiracy|abetment|police|court|jail|prison|sentence|punishment|penal code|crpc|evidence)/i.test(msgLower);
      const hasLabour = /(termination|salary|wages|gratuity|notice period|unfair dismissal|employment contract|appointment letter|overtime|leave|maternity|workplace|employer|employee|labour court|industrial dispute|trade union|collective bargaining|minimum wage|bonus|provident fund)/i.test(msgLower);
      const hasLocation = /(dhaka|chittagong|sylhet|rajshahi|khulna|barisal|rangpur|mymensingh|comilla|narayanganj|gazipur|tangail|bogra|cox|s|bazar|pabna|dinajpur|jessore|kushtia|faridpur|madaripur|gopalganj|shariatpur|rajbari|manikganj|munshiganj|narsingdi|kishoreganj|brahmanbaria|chandpur|feni|noakhali|lakshmipur|khagrachari|rangamati|bandarban|habiganj|maulvibazar|sunamganj|netrokona|jamalpur|sherpur|naogaon|natore|sirajganj|pabna|meherpur|chuadanga|jhenaidah|magura|narail|bagerhat|satkhira|pirojpur|jhalokati|bhola|patuakhali|barguna|joypurhat|gaibandha|kurigram|lalmonirhat|nilphamari|panchagarh|thakurgaon|district|upazila|thana|village|mouza|dag|khatian|cs|sa|rs|plot|land|flat|apartment|building|shop|office|factory|warehouse|agricultural|homestead|commercial|residential|industrial)/.test(msgLower);
      const hasTax = /(tax|income tax|vat|gst|property tax|land tax|holding tax|municipal tax|city tax|development tax|surcharge|cess|levy|duty|customs|excise|stamp duty|registration fee|court fee|government fee|official fee| Treasury challan|challan|tax return|itr|tax assessment|tax notice|tax demand|tax refund|tax exemption|tax deduction|tax credit|tax rebate|tax certificate|tax clearance|tax penalty|tax interest|tax audit)/.test(msgLower);
      const hasDocument = /(deed|sale deed|bain|kabala|khatian|mutation|cs|sa|rs|dag|plot|registration|registered|unregistered|forged|fake|false|fraud|cheat|betray|agreement|contract|power of attorney|poa|will|gift|partition|release|relinquishment|exchange|lease|mortgage|lien|encumbrance|nec|non-encumbrance|court order|injunction|decree|judgment|fir|gd|general diary|complaint|case|suit|petition|appeal|revision|review|execution|warrant|attachment|auction|sale certificate|possession|delivery|eviction|ejectment|trespass|boundary|survey|demarcation|map|plan|blueprint|photo|video|witness|affidavit|notary|stamp|revenue|tax|rent|lease|tenancy|landlord|tenant|occupancy|possession|adverse|prescription|limitation|12 years|30 years|prescription|easement|right of way|right to light|right to air|right to water|drainage|path|road|highway|river|canal|pond|tank|well|tube well|borehole|boundary|wall|fence|pillar|demarcation|survey|map|plan)/.test(msgLower);
      const hasAction = /(fake|forged|false|fraud|cheat|deceive|betray|trick|scam|con|duped|fooled|misled|misrepresent|conceal|hide|suppress|destroy|tear|burn|alter|tamper|forge|fabricate|create|make|prepare|execute|register|transfer|sell|buy|purchase|acquire|inherit|bequeath|gift|donate|partition|divide|share|release|relinquish|exchange|lease|rent|mortgage|pledge|hypothecate|charge|lien|encumber|attach|seize|confiscate|auction|sell|purchase|acquire|possess|occupy|trespass|encroach|adverse|prescription|evict|eject|remove|dispossess|displace|oust|throw|turn|lock|break|enter|force|trespass|intrude|encroach|invade|usurp|seize|take|grab|capture|occupy|hold|keep|retain|refuse|deny|reject|dispute|challenge|contest|oppose|resist|defy|violate|breach|break|violate|infringe|trespass|encroach|infringe|violate|breach|default|fail|neglect|omit|delay|defer|postpone|suspend|stay|stop|halt|prevent|hinder|obstruct|impede|interfere|intervene|interrupt|disrupt|disturb|interfere|meddle|tamper|alter|change|modify|vary|amend|revise|correct|rectify|remedy|repair|fix|restore|recover|retrieve|reclaim|repossess|reinstate|reinstall|replace|substitute|exchange|swap|trade|barter|transfer|convey|assign|devise|bequeath|gift|donate|grant|give|hand|deliver|surrender|yield|waive|abandon|relinquish|renounce|disclaim|disown|repudiate|reject|refuse|decline|deny|dispute|challenge|contest|oppose|resist|defy|violate|breach|break|default|fail|file|suit|case|petition|application|appeal|revision|review|execution|warrant|attachment|auction|sale|certificate|possession|delivery|eviction|ejectment|trespass|boundary|survey|demarcation|map|plan|photo|video|witness|affidavit|notary|stamp|revenue|tax|rent|lease|tenancy|landlord|tenant|occupancy|possession|adverse|prescription|limitation|12 years|30 years|prescription|easement|right of way|right to light|right to air|right to water|drainage|path|road|highway|river|canal|pond|tank|well|tube well|borehole|boundary|wall|fence|pillar|demarcation|survey|map|plan)/.test(msgLower);
      const hasSubstantiveInfo = hasLocation || hasDocument || hasAction || hasFamily || hasCriminal || hasLabour || hasTax;

      const contextualFollowUp = lang === "bn"
        ? (isInheritance
            ? (hasSubstantiveInfo
                ? `Apnar tothyo onujayi Bangladesh ain:\n\n1. **Dolil jachai**: Jodi dolil bhul/fake hoy, Sub-Registry e jachai korun. Jodi registration bhul hoy, eita criminal offence (forgery) hote pare.\n2. **Civil o Criminal Suit**: Apni civil suit (damages/recovery) ebong criminal complaint (cheating/forgery) duiti korte paren.\n3. **Shohojogita**: Jodi bondhu ke dhore fela hoy, tahole police e GD/complaint korun.\n\n_Aro nirdishto poramorsher jonno ekti upojoggo advocate-er shathe poramorsho korun._`
                : `Ami apnar prosno bujhte parchi: "${message.slice(0, 100)}...". Eti shothik mullayoner jonno:\n• Sompotti ki poitrik (dada/propitamoher) naki pitar nijossho uparjon?\n• Apnar dhormo ki (Muslim/Hindu/Christian)?\n• Apni proptoboyoshk ki na ebong biye hoyeche kina?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`)
            : (hasSubstantiveInfo
                ? `Apnar tothyo onujayi Bangladesh ain:\n\n1. **Dolil jachai**: Jodi dolil bhul/fake hoy, Sub-Registry e jachai korun. Jodi registration bhul hoy, eita criminal offence (forgery) hote pare.\n2. **Civil o Criminal Suit**: Apni civil suit (damages/recovery) ebong criminal complaint (cheating/forgery) duiti korte paren.\n3. **Shohojogita**: Jodi bondhu ke dhore fela hoy, tahole police e GD/complaint korun.\n\n_Aro nirdishto poramorsher jonno ekti upojoggo advocate-er shathe poramorsho korun._`
                : `Ami apnar prosno bujhte parchi: "${message.slice(0, 100)}...". Eti shothik mullayoner jonno aro kichu tothyo din:\n• Sompotti kothay obosthito?\n• Apnar kache ki kagojpotro ache? (dolil, khatian, chuktipotro)\n• Somossati kokhon theke shuru hoyeche?\n\n_Ei tothyo chhara shothik ain poramorsho dewa shombhob noy._`))
        : (isInheritance
            ? (hasSubstantiveInfo
                ? `Based on your information, here is what Bangladesh law says:\n\n1. **Title Verification**: If the deed is fake or forged, verify at the Sub-Registry. Fraudulent registration may be a criminal offence (forgery).\n2. **Civil and Criminal Remedies**: You can file both a civil suit (damages/recovery) and a criminal complaint (cheating/forgery).\n3. **Immediate Steps**: If the friend is traceable, file a GD/complaint with police immediately.\n\n_For more specific guidance, consult a competent advocate._`
                : `I understand you are asking about "${message.slice(0, 100)}...". To assess this inheritance matter properly under Bangladesh law:\n• Is the property ancestral (inherited from grandfather) or self-acquired by the father?\n• What is your religion? Muslim, Hindu, and Christian personal laws have different rules.\n• Are you an adult or minor? Married or unmarried?\n\n_These details determine which law applies and what share you may be entitled to._`)
            : (hasSubstantiveInfo
                ? `Based on your information, here is what Bangladesh law says:\n\n1. **Title Verification**: If the sale deed is fake or forged, verify immediately at the Sub-Registry. A forged deed is void ab initio (invalid from the start).\n2. **Civil and Criminal Remedies**: You can file a civil suit for declaration and recovery, AND a criminal complaint under the Penal Code for cheating (Section 420) and forgery (Section 463-465).\n3. **Immediate Steps**: Gather all evidence (original documents, WhatsApp messages, bank transfers, witness statements). File a GD with police if the friend is absconding.\n\n_For more specific guidance, consult a competent advocate._`
                : `I understand you are asking about "${message.slice(0, 100)}...". To help you properly under Bangladesh law, I need a few more details:\n• Where is the property located?\n• What documents do you have? (deed, khatian, agreement, FIR)\n• When did this issue start, and has any legal action already been taken?\n\n_These details are essential for accurate legal guidance._`));
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