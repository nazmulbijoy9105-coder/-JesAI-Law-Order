// ─── JesAI API Route — LLM-Powered Legal AI ──────────────────
//
// ARCHITECTURE:
//   User message
//     → queryKnowledge()        [RAG: find relevant Q&A + rules]
//     → buildSystemPrompt()     [inject BD law context]
//     → Gemini API              [LLM generates personalised answer]
//     → applyPaywallTier()      [gate conclusion for free users]
//     → stream to client
//
// LLM FALLBACK:
//   If Gemini unavailable / key missing → falls back to static
//   knowledge store response (current behavior). Zero downtime.
//
// ENV REQUIRED:
//   GEMINI_API_KEY=your_key_here   (Google AI Studio — free tier)
//
// ─────────────────────────────────────────────────────────────

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

// Server-side Supabase for token verification (lazy init — no module-level createClient)
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

// ─── Config ───────────────────────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_MODEL   = "gemini-2.0-flash"; // free tier, fast
const LLM_ENABLED    = GEMINI_API_KEY.length > 0;

// ─── Language Detection ───────────────────────────────────────
function detectLanguage(text: string): "bn" | "en" {
  return /[\u0980-\u09FF]/.test(text) ? "bn" : "en";
}

// ─── Area Labels ──────────────────────────────────────────────
const AREA_LABELS: Record<string, { en: string; bn: string }> = {
  property:       { en: "Land & Property Law",   bn: "ভূমি ও সম্পত্তি আইন"   },
  criminal:       { en: "Criminal Law",           bn: "ফৌজদারি আইন"            },
  family:         { en: "Family Law",             bn: "পারিবারিক আইন"          },
  labour:         { en: "Labour Law",             bn: "শ্রম আইন"               },
  company:        { en: "Company Law",            bn: "কোম্পানি আইন"           },
  tax:            { en: "Tax Law",                bn: "কর আইন"                 },
  nrb:            { en: "NRB Investment Law",     bn: "প্রবাসী বিনিয়োগ আইন"   },
  constitutional: { en: "Constitutional Law",     bn: "সাংবিধানিক আইন"         },
  consumer:       { en: "Consumer Rights Law",    bn: "ভোক্তা অধিকার আইন"     },
  cyber:          { en: "Cyber Law",              bn: "সাইবার আইন"             },
  contract:       { en: "Contract Law",           bn: "চুক্তি আইন"             },
};

// ─── Out-of-scope response ────────────────────────────────────
function outOfScopeResponse(
  selectedArea: LawArea,
  detectedArea: LawArea | null,
  lang: "en" | "bn"
): string {
  const sel = AREA_LABELS[selectedArea] ?? { en: selectedArea, bn: selectedArea };
  const det = detectedArea ? (AREA_LABELS[detectedArea] ?? null) : null;
  if (lang === "bn") {
    return (
      `আপনি এখন **${sel.bn}** বিভাগে আছেন।\n\n` +
      (det ? `আপনার প্রশ্নটি **${det.bn}** বিষয়ক মনে হচ্ছে।\n\n` : "") +
      `এই বিভাগে শুধুমাত্র **${sel.bn}** সংক্রান্ত প্রশ্ন করুন।\n\n` +
      `অন্য বিষয়ের জন্য মূল মেনু থেকে সঠিক বিভাগ বেছে নিন।`
    );
  }
  return (
    `You are in the **${sel.en}** section.\n\n` +
    (det ? `Your question appears to be about **${det.en}**.\n\n` : "") +
    `Please ask about **${sel.en}** only, or return to the main menu to switch topics.`
  );
}

// ─── LLM System Prompt Builder ────────────────────────────────
// Injects NLC-validated law context into the LLM's memory
// Framework: Facts → Issues → Applicable Law → Legal Assessment →
//            Party Arguments → Resolution/Judgment + Human Touch
function buildSystemPrompt(
  result: KnowledgeResult,
  selectedArea: LawArea | null,
  isPaid: boolean,
  lang: "en" | "bn"
): string {
  const areaLabel = selectedArea
    ? (AREA_LABELS[selectedArea]?.[lang === "bn" ? "bn" : "en"] ?? selectedArea)
    : "Bangladesh Law";

  // Collect validated law context from knowledge store
  const lawContext: string[] = [];

  if (result.qaEntry) {
    const { irac } = result.qaEntry;
    lawContext.push(`VALIDATED LEGAL CONTEXT:\nFactual Issue: ${irac.issue}\nApplicable Law: ${irac.rule}`);
    if (isPaid) {
      lawContext.push(`Legal Assessment: ${irac.application}\nResolution Guidance: ${irac.conclusion}`);
    }
    if (result.qaEntry.escalate && result.qaEntry.escalateReason) {
      lawContext.push(`URGENT: ${result.qaEntry.escalateReason}`);
    }
  }

  if (result.rules.length > 0) {
    const rulesSummary = result.rules
      .slice(0, 5)
      .map((r) => `• ${r.title} [${r.source}]: ${r.rule.slice(0, 250)}`)
      .join("\n");
    lawContext.push(`APPLICABLE LAWS:\n${rulesSummary}`);
  }

  const langInstruction =
    lang === "bn"
      ? "LANGUAGE: Respond in Bengali (বাংলা). Use simple, clear, warm Bengali. Legal terms may be in English where standard (FIR, RJSC, Section, etc). Write as if explaining to a friend who needs help."
      : "LANGUAGE: Respond in English. Use plain language, be warm and empathetic, not robotic or clinical.";

  const frameworkInstruction = `
RESPONSE FRAMEWORK — follow this structure naturally (do NOT use these as rigid headers, weave them into a flowing response):

1. **THE FACTS** — Acknowledge and restate the key facts from the user's situation. Show you understood their problem. Be empathetic: "I can see this is a difficult situation..."

2. **THE LEGAL ISSUES** — Identify each distinct legal issue raised by the facts. Present each issue clearly: "Looking at your situation, there are [X] key legal issues..."

3. **THE LAW** — For each issue, explain what Bangladesh law says. Quote specific sections and Acts. Be precise but accessible.

4. **LEGAL ASSESSMENT** — Apply the law to the specific facts. Assess the strength of each side's position. Be honest about strengths and weaknesses: "Based on the facts and the law, here is how this looks..."

5. **PARTY ARGUMENTS** — For contested matters, present both sides: what arguments the user's side can make, and what the opposing side might argue. This shows balanced, honest analysis.

6. **RESOLUTION & RELIEF** — What outcome is likely? What remedies are available (damages, injunction, reinstatement, etc.)? What should the person do next — practical steps, documents needed, courts to approach.

7. **HUMAN TOUCH** — End with a genuine, caring note. Acknowledge the emotional difficulty. Remind them they are not alone and that the law is there to protect them.`;

  const tierInstruction = isPaid
    ? "TIER: PAID — Give the complete, detailed answer following all 7 steps of the framework. Include document checklists, specific court names, filing fees, and timelines."
    : `TIER: FREE — Cover steps 1-4 (Facts, Issues, Law, brief Assessment). Give genuinely useful information.
Then end with: "🔒 **Unlock full analysis — ৳[price]** to get: full party arguments, resolution strategy, step-by-step action plan, and document checklist."
Do NOT reveal the complete resolution steps or party arguments — those are behind the paywall.`;

  return `You are JesAI — a para-legal AI assistant for Bangladesh law, created by Neum Lex Counsel (NLC).
You are an expert in ${areaLabel}, combining deep legal knowledge with genuine human empathy.

CORE PRINCIPLES:
1. Only answer questions about Bangladesh law in the subject: ${areaLabel}
2. Always base your answer on the validated law context provided below
3. Never invent laws, cases, penalties, or judgments — use only verified context
4. If context does not cover the question, say so honestly and suggest consulting an advocate
5. Never use the word "IRAC" in your response — use natural language headings
6. Always end with the NLC disclaimer: "⚠️ This is legal information, not legal advice. For representation, consult a Bar Council advocate."
7. If the situation is urgent (arrest, illegal detention, domestic violence, eviction) — flag this prominently at the top
8. Write with a human touch — people coming to you are often stressed, scared, or confused. Be their knowledgeable, caring guide.
9. Use concrete examples to explain abstract legal concepts
10. When there is genuine uncertainty in the law, say so — do not pretend certainty that does not exist

${langInstruction}

${frameworkInstruction}

${tierInstruction}

NLC-VALIDATED LAW CONTEXT (use this as your primary source):
${lawContext.length > 0 ? lawContext.join("\n\n") : `Subject area: ${areaLabel}. Use your verified knowledge of Bangladesh law for this subject.`}

ABOUT NLC:
- Neum Lex Counsel — founded by Md Nazmul Islam, Advocate, Supreme Court of Bangladesh
- WhatsApp consultations and document drafting services available
- Platform: JesAI (jes-ai-law-order.vercel.app)`;
}

// ─── Gemini API Call ──────────────────────────────────────────
async function callGemini(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: { role: "user" | "model"; text: string }[] = []
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  // Build conversation contents
  const contents = [
    // System prompt as first user turn (Gemini doesn't have system role)
    {
      role: "user",
      parts: [{ text: `[SYSTEM INSTRUCTIONS]\n${systemPrompt}\n[END SYSTEM]\n\nUser's question: ${userMessage}` }],
    },
  ];

  // Add conversation history for multi-turn context
  for (const turn of conversationHistory.slice(-6)) { // last 3 exchanges
    contents.push({
      role: turn.role,
      parts: [{ text: turn.text }],
    });
  }

  const body = {
    contents,
    generationConfig: {
      temperature: 0.4,        // slightly higher for human-touch responses
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,   // increased for full 7-step analysis
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
    signal: AbortSignal.timeout(25000), // 25s timeout for detailed analysis
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) throw new Error("Gemini returned empty response");
  return text.trim();
}

// ─── Paywall Post-Processing ──────────────────────────────────
// For free users: truncate LLM output at the paywall boundary
// The LLM is instructed to put 🔒 in the right place
function applyPaywallToLLMResponse(
  llmText: string,
  result: KnowledgeResult,
  isPaid: boolean,
  lang: "en" | "bn"
): string {
  if (isPaid) return llmText;

  // If LLM already included paywall block (as instructed), keep it
  if (llmText.includes("🔒")) return llmText;

  // Otherwise, add paywall block after first 2 paragraphs
  const paragraphs = llmText.split(/\n\n+/);
  const freeSection = paragraphs.slice(0, 2).join("\n\n");
  const area = result.area ?? "general";
  const pricing = TIER_PRICING[area] ?? { price: 999, label: "Full Legal Guide" };

  const paywallAppend = lang === "bn"
    ? `\n\n🔒 **পূর্ণ উত্তর আনলক করুন — ৳${pricing.price.toLocaleString()}**\n_${pricing.label}_\n\n✅ আনলক করলে পাবেন: পদক্ষেপ-বাই-পদক্ষেপ করণীয়, ডকুমেন্ট চেকলিস্ট, বিস্তারিত আইনি কৌশল\n\n📱 WhatsApp: **01XXXXXXXXX**`
    : `\n\n🔒 **Unlock full answer — ৳${pricing.price.toLocaleString()}**\n_${pricing.label}_\n\n✅ Get: step-by-step action plan, document checklist, full legal strategy\n\n📱 WhatsApp: **01XXXXXXXXX**`;

  return freeSection + paywallAppend;
}

// ─── Static Fallback Responses ────────────────────────────────
const AREA_FALLBACK: Record<string, string> = {
  property:       "**Land & Property Law — Bangladesh**\n\nI'm here to help with your property matter. Please describe what happened — include the type of property (land/flat/commercial), the parties involved, what documents you have, and what outcome you are seeking. The more detail you share, the better I can identify the applicable laws and your options.\n\n_I understand property disputes can be stressful. Let me help you understand your rights._",
  criminal:       "**Criminal Law — Bangladesh**\n\nI can help you understand the criminal law aspects of your situation. Please describe what happened — are you a victim, an accused, or a concerned family member? What stage is the matter at (FIR filed, arrest, trial, bail hearing)? I'll explain your rights and options under the Penal Code and CrPC.\n\n_Criminal matters can be frightening. You deserve to understand your rights._",
  family:         "**Family Law — Bangladesh**\n\nI'm here to help with your family law matter. Please describe your situation — divorce, talaq, custody of children, maintenance, dower (mehr), inheritance, or another family issue. Also let me know your religion, as Muslim, Hindu, and Christian family laws differ significantly in Bangladesh.\n\n_Family matters are deeply personal. I will explain the law with care._",
  labour:         "**Labour Law — Bangladesh**\n\nI can help with your employment situation. Please describe what happened — wrongful termination, unpaid wages, gratuity dispute, overtime, maternity benefit, or another issue. Also share how long you worked and your employment type (permanent, temporary, casual).\n\n_Your rights as a worker matter. Let me explain what the Labour Act 2006 says about your situation._",
  company:        "**Company Law — Bangladesh**\n\nI can assist with your company or business matter. Please describe the issue — RJSC registration, director disputes, shareholder rights, annual filings, winding up, or another corporate matter. I'll explain the position under the Companies Act 1994.\n\n_Navigating company law can be complex. Let me simplify it for you._",
  tax:            "**Tax Law — Bangladesh**\n\nI can help with your tax situation. Please describe the matter — income tax filing, TIN registration, VAT compliance, tax assessment, appeal, or another NBR-related issue. I'll explain the position under the Income Tax Act 2023.\n\n_Tax issues are time-sensitive. Let me help you understand your position._",
  nrb:            "**NRB Investment — Bangladesh**\n\nI can assist with your cross-border investment or NRB matter. Please describe your situation — repatriation, BIDA registration, withholding tax, foreign income, FBAR, or tax treaty benefits. I'll explain the applicable Bangladesh and international rules.\n\n_Cross-border investment has complex rules. Let me guide you through them._",
  constitutional: "**Constitutional Law — Bangladesh**\n\nI can help with your constitutional rights matter. Please describe the situation — unlawful detention, fundamental rights violation, writ petition, public interest matter, or constitutional amendment question. I'll analyse under the 1972 Constitution and court precedents.\n\n_Your constitutional rights are fundamental. Let me explain how to protect them._",
  consumer:       "**Consumer Rights — Bangladesh**\n\nI can help with your consumer rights complaint. Please describe what happened — defective product, false advertising, price gouging, refund refusal, or service failure. I'll guide you under the Consumer Rights Protection Act 2009.\n\n_As a consumer, you have legal protections. Let me explain them._",
  cyber:          "**Cyber Law — Bangladesh**\n\nI can assist with your cyber or digital law matter. Please describe the issue — online fraud, hacking, cyberbullying, digital defamation, data privacy, or digital transaction dispute. I'll explain under the Cyber Security Act 2023.\n\n_Digital crime is a serious matter. Let me explain your rights and options._",
  contract:       "**Contract Law — Bangladesh**\n\nI can help with your contract matter. Please describe the situation — breach of agreement, advance not returned, verbal contract dispute, personal guarantee, or another contract issue. Include what was agreed, what went wrong, and what documents you have.\n\n_Contract disputes are about enforcing promises. Let me explain your legal position._",
  general:        "I'm JesAI, your Bangladesh legal literacy companion. Please describe your legal situation — what happened, who is involved, what documents you have, and what outcome you need. I'll identify the relevant Bangladesh laws and guide you through your options.\n\n_Whatever your legal challenge, you deserve to understand the law that applies to you._",
};

const FALLBACK_TEXT: Record<string, string> = {
  en: "Please describe your legal situation:\n1. What happened\n2. Who is involved\n3. What you want\n\n**JesAI covers:** Land & Property • Criminal • Family • Labour • Company • Tax • NRB • Constitutional • Consumer • Cyber\n\n⚠️ Legal information only — not legal advice.",
  bn: "অনুগ্রহ করে আপনার আইনি পরিস্থিতি বর্ণনা করুন:\n১. কী হয়েছে\n২. কারা জড়িত\n৩. আপনি কী চান\n\n⚠️ শুধুমাত্র আইনি তথ্য — পরামর্শ নয়।",
};

// ─── Scenario Sessions ────────────────────────────────────────
const scenarioSessions = new Map<string, ScenarioSession>();

function getSessionId(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 40);
  return `${ip}::${ua}`;
}

// ─── Main Handler ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      selectedArea  = null,
      history       = [],   // [{role:"user"|"assistant", content:"..."}]
    } = body as {
      message: string;
      selectedArea?: LawArea | null;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    // Verify paid status server-side via Bearer token
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim() ?? null;
    const isPaid = await verifyUserIsPaid(token);

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const lang = detectLanguage(message);
    const sessionId = getSessionId(req);
    const activeSession = scenarioSessions.get(sessionId);

    // ── Step 0: Scenario navigation ("next" / "back") ───────────
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

    // ── Step 1: Subject lock — reject off-topic messages ────────
    if (selectedArea) {
      const detected = detectArea(message);
      const offTopic =
        detected !== null &&
        detected !== selectedArea &&
        detected !== "general" &&
        detected !== "administrative" &&
        detected !== "evidence";
      if (offTopic) {
        return NextResponse.json({
          response: outOfScopeResponse(selectedArea, detected, lang),
          source: "guard",
          metadata: { area: selectedArea, confidence: "low", escalate: false, language: lang, paywallActive: false, offTopic: true },
        });
      }
    }

    // ── Step 2: RAG — pull relevant law context ─────────────────
    const result = queryKnowledge(message, selectedArea);

    // ── Step 3: LLM path ─────────────────────────────────────────
    if (LLM_ENABLED) {
      try {
        const systemPrompt = buildSystemPrompt(result, selectedArea, isPaid, lang);

        // Convert history format for Gemini
        const geminiHistory = history.map((h) => ({
          role: h.role === "assistant" ? "model" as const : "user" as const,
          text: h.content,
        }));

        const llmResponse = await callGemini(systemPrompt, message, geminiHistory);
        const finalResponse = applyPaywallToLLMResponse(llmResponse, result, isPaid, lang);

        return NextResponse.json({
          response: finalResponse,
          source: "llm",
          metadata: {
            area: result.area ?? selectedArea,
            confidence: result.matched ? "high" : "medium",
            escalate: result.escalate,
            language: lang,
            paywallActive: !isPaid,
            model: GEMINI_MODEL,
          },
        });
      } catch (llmError) {
        // LLM failed — log and fall through to static fallback
        console.error("Gemini error — falling back to static:", llmError);
      }
    }

    // ── Step 4: Static fallback (if LLM off or failed) ──────────

    // 4a: Scenario match
    const scenarioResult = matchScenario(message, activeSession);
    if (scenarioResult.matched) {
      const wrongSubject = selectedArea && scenarioResult.scenario.area !== selectedArea;
      if (!wrongSubject) {
        scenarioSessions.set(sessionId, { scenarioId: scenarioResult.scenario.scenarioId, currentStepIndex: scenarioResult.stepNumber - 1 });
        return NextResponse.json({
          response: scenarioResult.summary,
          source: "scenario",
          metadata: { area: scenarioResult.scenario.area, confidence: "high", escalate: scenarioResult.scenario.escalate, language: lang, paywallActive: false, scenario: { scenarioId: scenarioResult.scenario.scenarioId, stepNumber: scenarioResult.stepNumber, totalSteps: scenarioResult.totalSteps, progressPercent: scenarioResult.progressPercent, isComplete: scenarioResult.isComplete } },
        });
      }
    }

    // 4b: Knowledge store formatted response
    if (result.matched && result.qaEntry) {
      const formatted = formatResponse(result);
      let responseText = typeof formatted === "string" ? formatted : (formatted as any).response ?? "";
      if (!isPaid) {
        const price = TIER_PRICING[selectedArea ?? result.area ?? "general"]?.price ?? 99;
        const label = TIER_PRICING[selectedArea ?? result.area ?? "general"]?.label ?? "Full Legal Guide";
        const paywall = lang === "bn"
          ? `\n\nUnlock the full legal strategy and step-by-step action plan.\n\n🔒 **পূর্ণ উত্তর আনলক করুন — ৳${price.toLocaleString()}**\n_${label}_\n\n📱 WhatsApp: **01XXXXXXXXX**`
          : `\n\nUnlock the full legal strategy and step-by-step action plan.\n\n🔒 **Unlock full answer — ৳${price.toLocaleString()}**\n_${label}_\n\n📱 WhatsApp: **01XXXXXXXXX**`;
        responseText += paywall;
      }
      return NextResponse.json({
        response: responseText,
        source: "knowledge",
        metadata: { area: result.area, confidence: result.confidence, escalate: result.escalate, language: lang, paywallActive: !isPaid },
      });
    }

    // 4c: Area-level general prompt (invite user to give more detail)
    const areaForPrompt = selectedArea ?? result.area;
    if (areaForPrompt && AREA_FALLBACK[areaForPrompt]) {
      return NextResponse.json({
        response: AREA_FALLBACK[areaForPrompt],
        source: "area_prompt",
        metadata: { area: areaForPrompt, confidence: "low", escalate: false, language: lang, paywallActive: false },
      });
    }

    // 4d: Hard fallback
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
