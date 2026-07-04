//  JesAI API Route — ILRMF Orchestrator
// Zero LLM. Zero transformation bridge.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { LawArea, KnowledgeResult } from "@/lib/knowledge/types";
import { queryKnowledge, detectArea, TIER_PRICING } from "@/lib/knowledge";
import type { ILRMFInput, ILRMFResult, VerdictBand } from "@/lib/knowledge/ilrmf-types";
import { runILRMF } from "@/lib/knowledge/ilrmf-engine";
import {
  matchScenario, nextStep,
  isNextStepCommand, isPrevStepCommand,
  type ScenarioSession,
} from "@/lib/knowledge/scenario-manager";

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
      if (det && det !== selectedArea && det !== "general" && det !== "administrative" && det !== "evidence") {
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
    const fb = selectedArea ?? knowledgeResult.area;
    if (fb && FALLBACKS[fb]) {
      return NextResponse.json({ response: FALLBACKS[fb], source: "area_prompt", metadata: { area: fb, confidence: "low", escalate: false, language: lang, paywallActive: false, ilrmfVerdict: "BLACK", traceId: ilrmf.trace.traceId } });
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