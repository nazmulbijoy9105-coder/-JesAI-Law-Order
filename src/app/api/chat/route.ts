//  JesAI API Route  LLM-Powered Legal AI 
//
// ARCHITECTURE:
//   User message
//      queryKnowledge()        [RAG: find relevant Q&A + rules]
//      buildSystemPrompt()     [inject BD law context]
//      Gemini API              [LLM generates personalised answer]
//      applyPaywallTier()      [gate conclusion for free users]
//      stream to client
//
// LLM FALLBACK:
//   If Gemini unavailable / key missing  falls back to static
//   knowledge store response (current behavior). Zero downtime.
//
// ENV REQUIRED:
//   GEMINI_API_KEY=your_key_here   (Google AI Studio  free tier)
//
// 

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { LawArea, KnowledgeResult } from "@/lib/knowledge/types";
import {
  queryKnowledge,
  detectArea,
  formatResponse,
  TIER_PRICING,
} from "@/lib/knowledge";
import {
  matchScenario,
  nextStep,
  isNextStepCommand,
  isPrevStepCommand,
  type ScenarioSession,
} from "@/lib/knowledge/scenario-manager";

// Server-side Supabase for token verification (lazy init  no module-level createClient)
function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function verifyUserIsPaid(token: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const supabaseServer = getSupabaseServer();
    const { data: { user } } = await supabaseServer.auth.getUser(token);
    if (!user) return false;
    const { data: profile } = await supabaseServer
      .from("users")
      .select("is_paid, tier, tier_expires_at")
      .eq("id", user.id)
      .single();
    if (!profile?.is_paid) return false;
    if (profile.tier_expires_at && new Date(profile.tier_expires_at) < new Date()) return false;
    return true;
  } catch {
    return false;
  }
}

//  Config 
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY ?? "";
const GEMINI_MODEL    = "gemini-2.0-flash";
const LLM_ENABLED     = GEMINI_API_KEY.length > 0;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "01XXXXXXXXX";

//  Language Detection 
function detectLanguage(text: string): "bn" | "en" {
  return /[\u0980-\u09FF]/.test(text) ? "bn" : "en";
}

//  Area Labels 
const AREA_LABELS: Record<string, { en: string; bn: string }> = {
  property:       { en: "Land & Property Law",   bn: "   "   },
  criminal:       { en: "Criminal Law",           bn: " "            },
  family:         { en: "Family Law",             bn: " "          },
  labour:         { en: "Labour Law",             bn: " "               },
  company:        { en: "Company Law",            bn: " "           },
  tax:            { en: "Tax Law",                bn: " "                 },
  nrb:            { en: "NRB Investment Law",     bn: "  "   },
  constitutional: { en: "Constitutional Law",     bn: " "         },
  consumer:       { en: "Consumer Rights Law",    bn: "  "     },
  cyber:          { en: "Cyber Law",              bn: " "             },
  contract:       { en: "Contract Law",           bn: " "             },
};

//  Out-of-scope response 
function outOfScopeResponse(
  selectedArea: LawArea,
  detectedArea: LawArea | null,
  lang: "en" | "bn"
): string {
  const sel = AREA_LABELS[selectedArea] ?? { en: selectedArea, bn: selectedArea };
  const det = detectedArea ? (AREA_LABELS[detectedArea] ?? null) : null;
  if (lang === "bn") {
    return (
      `  **${sel.bn}**  \n\n` +
      (det ? `  **${det.bn}**   \n\n` : "") +
      `   **${sel.bn}**   \n\n` +
      `         `
    );
  }
  return (
    `You are in the **${sel.en}** section.\n\n` +
    (det ? `Your question appears to be about **${det.en}**.\n\n` : "") +
    `Please ask about **${sel.en}** only, or return to the main menu to switch topics.`
  );
}

//  LLM System Prompt Builder  ILRMF Architecture 
function buildSystemPrompt(
  result: KnowledgeResult,
  selectedArea: LawArea | null,
  isPaid: boolean,
  lang: "en" | "bn"
): string {
  const areaLabel = selectedArea
    ? (AREA_LABELS[selectedArea]?.[lang === "bn" ? "bn" : "en"] ?? selectedArea)
    : "Bangladesh Law";

  const lawContext: string[] = [];
  if (result.qaEntry) {
    const { irac } = result.qaEntry;
    lawContext.push(`VALIDATED LEGAL CONTEXT:\nIssue: ${irac.issue}\nLaw: ${irac.rule}`);
    if (isPaid) {
      lawContext.push(`Assessment: ${irac.application}\nResolution: ${irac.conclusion}`);
    }
    if (result.qaEntry.escalate && result.qaEntry.escalateReason) {
      lawContext.push(` URGENT: ${result.qaEntry.escalateReason}`);
    }
  }
  if (result.rules.length > 0) {
    const rulesSummary = result.rules
      .slice(0, 5)
      .map((r) => ` ${r.title} [${r.source}]: ${r.rule.slice(0, 250)}`)
      .join("\n");
    lawContext.push(`APPLICABLE LAWS:\n${rulesSummary}`);
  }

  const langInstruction = lang === "bn"
    ? "LANGUAGE:     , ,            (FIR, RJSC, Section )"
    : "LANGUAGE: Respond in English. Warm, clear, plain language. Not robotic.";

  const ilrmfInstruction = `

ILRMF  INTEGRATED LEGAL REASONING & MAPPING FRAMEWORK


PIPELINE STAGE 1  FACT EXTRACTION
Extract: Parties, Subject matter, Key dates, Documents, Urgency indicators

PIPELINE STAGE 2  ISSUE CLASSIFICATION
Identify EACH distinct legal issue separately

PIPELINE STAGE 3  TIER-1 DETERMINISTIC CHECKS
LIMITATION:  GREEN (within time) /  RED (time-barred)
REGISTRATION:  GREEN /  YELLOW (weaker position)
JURISDICTION:  PROCEED /  BLACK (jurisdiction bar)
EVIDENCE:  GREEN /  YELLOW /  RED

PIPELINE STAGE 4  ARGUMENT TREES
Both sides: YOUR SIDE argues / OPPOSING SIDE may argue

PIPELINE STAGE 5  RELIEF CLASSIFICATION
 GREEN (deterministic) /  YELLOW (discretionary) /  RED (blocked) /  BLACK (jurisdiction bar)

PIPELINE STAGE 6  RESOLUTION & NEXT STEPS
Immediate steps, Documents, Court/authority, Timeline

PIPELINE STAGE 7  HUMAN TOUCH
Sincere, warm closing

VERDICT SUMMARY: **Verdict: [///]** + one sentence
`;

  const tierInstruction = isPaid
    ? "ACCESS: FULL  Run all 7 pipeline stages completely."
    : `ACCESS: FREE  Run stages 13 fully. For stages 46, end with: " **Unlock full analysis  [price]**"`;

  return `You are JesAI  Bangladesh's Legal Reasoning AI, built by Neum Lex Counsel (NLC).

CORE RULES:
1. Subject: ${areaLabel}  Bangladesh law only
2. Use only validated law context + your verified Bangladesh law knowledge
3. Never invent statutes, case names, penalties, or sections
4. Always flag urgency prominently
5. Never use "IRAC"  use ILRMF pipeline stages naturally
6. Be honest about uncertainty
7. Write with human warmth
8. Always end with:  This is legal information, not legal advice.

 ${langInstruction}

 ${ilrmfInstruction}

 ${tierInstruction}

NLC-VALIDATED LAW CONTEXT:
 ${lawContext.length > 0 ? lawContext.join("\n\n") : `Area: ${areaLabel}. Use your verified Bangladesh law knowledge.`}`;
}

//  Gemini API Call 
async function callGemini(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: { role: "user" | "model"; text: string }[] = []
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const contents = [
    {
      role: "user",
      parts: [{ text: `[SYSTEM INSTRUCTIONS]\n${systemPrompt}\n[END SYSTEM]\n\nUser's question: ${userMessage}` }],
    },
  ];

  for (const turn of conversationHistory.slice(-6)) {
    contents.push({
      role: turn.role,
      parts: [{ text: turn.text }],
    });
  }

  const body = {
    contents,
    generationConfig: {
      temperature: 0.4,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
      stopSequences: [],
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25000),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("Gemini returned empty response");
  return text.trim();
}

//  Paywall Post-Processing 
function applyPaywallToLLMResponse(
  llmText: string,
  result: KnowledgeResult,
  isPaid: boolean,
  lang: "en" | "bn"
): string {
  if (isPaid) return llmText;
  if (llmText.includes("")) return llmText;

  const paragraphs = llmText.split(/\n\n+/);
  const freeSection = paragraphs.slice(0, 2).join("\n\n");
  const area = result.area ?? "general";
  const pricing = TIER_PRICING[area] ?? { price: 999, label: "Full Legal Guide" };

  const paywallAppend = lang === "bn"
    ? `\n\n **     ${pricing.price.toLocaleString()}**\n_${pricing.label}_\n\n WhatsApp: **${WHATSAPP_NUMBER}**`
    : `\n\n **Unlock full answer  ${pricing.price.toLocaleString()}**\n_${pricing.label}_\n\n WhatsApp: **${WHATSAPP_NUMBER}**`;

  return freeSection + paywallAppend;
}

//  Static Fallback Responses 
const AREA_FALLBACK: Record<string, string> = {
  property: "**Land & Property Law  Bangladesh**\n\nI'm here to help with your property matter. Please describe what happened.\n\n_I understand property disputes can be stressful. Let me help you understand your rights._",
  criminal: "**Criminal Law  Bangladesh**\n\nI can help you understand the criminal law aspects of your situation. Please describe what happened.\n\n_Criminal matters can be frightening. You deserve to understand your rights._",
  family: "**Family Law  Bangladesh**\n\nI'm here to help with your family law matter. Please describe your situation.\n\n_Family matters are deeply personal. I will explain the law with care._",
  labour: "**Labour Law  Bangladesh**\n\nI can help with your employment situation. Please describe what happened.\n\n_Your rights as a worker matter. Let me explain what the Labour Act 2006 says._",
  company: "**Company Law  Bangladesh**\n\nI can assist with your company or business matter. Please describe the issue.\n\n_Navigating company law can be complex. Let me simplify it for you._",
  tax: "**Tax Law  Bangladesh**\n\nI can help with your tax situation. Please describe the matter.\n\n_Tax issues are time-sensitive. Let me help you understand your position._",
  nrb: "**NRB Investment  Bangladesh**\n\nI can assist with your cross-border investment or NRB matter. Please describe your situation.\n\n_Cross-border investment has complex rules. Let me guide you through them._",
  constitutional: "**Constitutional Law  Bangladesh**\n\nI can help with your constitutional rights matter. Please describe the situation.\n\n_Your constitutional rights are fundamental. Let me explain how to protect them._",
  consumer: "**Consumer Rights  Bangladesh**\n\nI can help with your consumer rights complaint. Please describe what happened.\n\n_As a consumer, you have legal protections. Let me explain them._",
  cyber: "**Cyber Law  Bangladesh**\n\nI can assist with your cyber or digital law matter. Please describe the issue.\n\n_Digital crime is a serious matter. Let me explain your rights and options._",
  contract: "**Contract Law  Bangladesh**\n\nI can help with your contract matter. Please describe the situation.\n\n_Contract disputes are about enforcing promises. Let me explain your legal position._",
  general: "I'm JesAI, your Bangladesh legal literacy companion. Please describe your legal situation.\n\n_Whatever your legal challenge, you deserve to understand the law that applies to you._",
};

const FALLBACK_TEXT: Record<string, string> = {
  en: "Please describe your legal situation:\n1. What happened\n2. Who is involved\n3. What you want\n\n**JesAI covers:** Land & Property  Criminal  Family  Labour  Company  Tax  NRB  Constitutional  Consumer  Cyber\n\n Legal information only  not legal advice.",
  bn: "      :\n.  \n.  \n.   \n\n      ",
};

//  Scenario Sessions 
const scenarioSessions = new Map<string, ScenarioSession>();

function getSessionId(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 40);
  return `${ip}::${ua}`;
}

//  Main Handler 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      selectedArea = null,
      history = [],
    } = body as {
      message: string;
      selectedArea?: LawArea | null;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim() ?? null;
    const isPaid = await verifyUserIsPaid(token);

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const lang = detectLanguage(message);
    const sessionId = getSessionId(req);
    const activeSession = scenarioSessions.get(sessionId);

    //  Step 0: Scenario navigation 
    if (activeSession) {
      if (isNextStepCommand(message)) {
        const r = nextStep(activeSession.scenarioId, activeSession.currentStepIndex);
        if (r.matched) {
          r.isComplete
            ? scenarioSessions.delete(sessionId)
            : scenarioSessions.set(sessionId, { scenarioId: r.scenario.scenarioId, currentStepIndex: r.stepNumber - 1 });
          return NextResponse.json({
            response: r.summary,
            source: "scenario",
            metadata: { area: r.scenario.area, confidence: "high", escalate: r.scenario.escalate, language: lang, paywallActive: false, scenario: { scenarioId: r.scenario.scenarioId, stepNumber: r.stepNumber, totalSteps: r.totalSteps, progressPercent: r.progressPercent, isComplete: r.isComplete } },
          });
        }
      }
      if (isPrevStepCommand(message)) {
        const ti = Math.max(0, activeSession.currentStepIndex - 1);
        const r = nextStep(activeSession.scenarioId, Math.max(0, ti - 1));
        if (r.matched) {
          scenarioSessions.set(sessionId, { scenarioId: r.scenario.scenarioId, currentStepIndex: r.stepNumber - 1 });
          return NextResponse.json({
            response: r.summary,
            source: "scenario",
            metadata: { area: r.scenario.area, confidence: "high", escalate: r.scenario.escalate, language: lang, paywallActive: false, scenario: { scenarioId: r.scenario.scenarioId, stepNumber: r.stepNumber, totalSteps: r.totalSteps, progressPercent: r.progressPercent, isComplete: r.isComplete } },
          });
        }
      }
    }

    //  Step 1: Subject lock 
    if (selectedArea) {
      const detected = detectArea(message);
      const offTopic = detected !== null && detected !== selectedArea && detected !== "general" && detected !== "administrative" && detected !== "evidence";
      if (offTopic) {
        return NextResponse.json({
          response: outOfScopeResponse(selectedArea, detected, lang),
          source: "guard",
          metadata: { area: selectedArea, confidence: "low", escalate: false, language: lang, paywallActive: false, offTopic: true },
        });
      }
    }

    //  Step 2: RAG 
    const result = queryKnowledge(message, selectedArea);

    //  Step 3: LLM path 
    if (LLM_ENABLED) {
      try {
        const systemPrompt = buildSystemPrompt(result, selectedArea, isPaid, lang);
        const geminiHistory = history.map((h) => ({
          role: h.role === "assistant" ? "model" as const : "user" as const,
          text: h.content,
        }));
        const llmResponse = await callGemini(systemPrompt, message, geminiHistory);
        const finalResponse = applyPaywallToLLMResponse(llmResponse, result, isPaid, lang);
        return NextResponse.json({
          response: finalResponse,
          source: "llm",
          metadata: { area: result.area ?? selectedArea, confidence: result.matched ? "high" : "medium", escalate: result.escalate, language: lang, paywallActive: !isPaid, model: GEMINI_MODEL },
        });
      } catch (llmError) {
        console.error("Gemini error  falling back to static:", llmError);
      }
    }

    //  Step 4: Static fallback 
    const scenarioResult = matchScenario(message, activeSession);
    if (scenarioResult.matched) {
      const detectedAreaForScenario = detectArea(message);
const wrongSubject = (selectedArea && scenarioResult.scenario.area !== selectedArea) ||
                      (!selectedArea && detectedAreaForScenario && detectedAreaForScenario !== "general" && detectedAreaForScenario !== scenarioResult.scenario.area);
      if (!wrongSubject) {
        scenarioSessions.set(sessionId, { scenarioId: scenarioResult.scenario.scenarioId, currentStepIndex: scenarioResult.stepNumber - 1 });
        return NextResponse.json({
          response: scenarioResult.summary,
          source: "scenario",
          metadata: { area: scenarioResult.scenario.area, confidence: "high", escalate: scenarioResult.scenario.escalate, language: lang, paywallActive: false, scenario: { scenarioId: scenarioResult.scenario.scenarioId, stepNumber: scenarioResult.stepNumber, totalSteps: scenarioResult.totalSteps, progressPercent: scenarioResult.progressPercent, isComplete: scenarioResult.isComplete } },
        });
      }
    }

    if (result.matched && result.qaEntry) {
      const formatted = formatResponse(result);
      let responseText = typeof formatted === "string" ? formatted : (formatted as any).response ?? "";
      if (!isPaid) {
        const price = TIER_PRICING[selectedArea ?? result.area ?? "general"]?.price ?? 99;
        const label = TIER_PRICING[selectedArea ?? result.area ?? "general"]?.label ?? "Full Legal Guide";
        const paywall = lang === "bn"
          ? `\n\n **     ${price.toLocaleString()}**\n_${label}_\n\n WhatsApp: **${WHATSAPP_NUMBER}**`
          : `\n\n **Unlock full answer  ${price.toLocaleString()}**\n_${label}_\n\n WhatsApp: **${WHATSAPP_NUMBER}**`;
        responseText += paywall;
      }
      return NextResponse.json({
        response: responseText,
        source: "knowledge",
        metadata: { area: result.area, confidence: result.confidence, escalate: result.escalate, language: lang, paywallActive: !isPaid },
      });
    }

    const areaForPrompt = selectedArea ?? result.area;
    if (areaForPrompt && AREA_FALLBACK[areaForPrompt]) {
      return NextResponse.json({
        response: AREA_FALLBACK[areaForPrompt],
        source: "area_prompt",
        metadata: { area: areaForPrompt, confidence: "low", escalate: false, language: lang, paywallActive: false },
      });
    }

    return NextResponse.json({
      response: FALLBACK_TEXT[lang] ?? FALLBACK_TEXT.en,
      source: "fallback",
      metadata: { area: null, confidence: "low", escalate: false, language: lang, paywallActive: false },
    });

  } catch (error) {
    console.error("JesAI error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}