//  ILRMF Deterministic Engine v2.1
// Zero LLM. Zero randomness. Zero API cost.
//
// Scoring module inlined (no separate ilrmf/scoring/ folder needed).

import { randomUUID } from "crypto";
import type { QAEntry, LegalRule } from "../shared/types";
import type {
  ILRMFInput,
  ILRMFResult,
  ReasoningTrace,
  VerdictBand,
  TierOneCheck,
} from "./ilrmf-types";

const PIPELINE_VERSION = "2.1.0";
const CORPUS_VERSION   = "BD.MULTI.v1.0";
const COMPLETENESS_THRESHOLD = 0.15;

// ─── Scoring Constants ─────────────────────────────────────

const CERTAINTY_WEIGHTS: Record<string, number> = {
  "confirmed": 1.00,
  "arguable": 0.72,
  "verify-with-lawyer": 0.45,
};

const THRESHOLD_GREEN  = 0.70;
const THRESHOLD_YELLOW = 0.45;
const THRESHOLD_RED    = 0.20;

const PENALTY_MISSING_FACT = 0.10;
const PENALTY_AMBIGUITY    = 0.15;
const PENALTY_CONFLICT     = 0.20;
const PENALTY_ESCALATION   = 0.12;

// ─── Scoring Functions (inlined) ────────────────────────────

function getRAGWeight(confidence: "high" | "medium" | "low"): number {
  return confidence === "high" ? 1.0 : confidence === "medium" ? 0.85 : 0.70;
}

function calculateRuleMatchFactor(rules: LegalRule[]): number {
  if (rules.length === 0) return 0.75;
  const weights = rules.map((r) => CERTAINTY_WEIGHTS[r.certainty] ?? 0.5);
  return weights.reduce((a, b) => a + b, 0) / weights.length;
}

function detectConflicts(rules: LegalRule[]): boolean {
  const levels = rules.map((r) => r.certainty);
  return levels.includes("arguable") && levels.includes("confirmed") && rules.length > 2;
}

function getVerdictExplanation(v: VerdictBand): string {
  return {
    GREEN:  "Applicable rule clearly governs stated facts; proceed with recommended relief.",
    YELLOW: "Applicable rule exists but fact gaps or ambiguity require professional review before action.",
    RED:    "Weak or partial rule match; mandatory professional review — do not act unilaterally.",
    BLACK:  "No operable rule match or jurisdiction bar identified — immediate referral to qualified advocate required.",
  }[v];
}

function verdictEmoji(v: VerdictBand): string {
  return { GREEN: "✅", YELLOW: "⚠️", RED: "🔴", BLACK: "⛔" }[v];
}

// ─── Tier-1 Check Data ─────────────────────────────────────

const LIMITATION_PATTERNS: { pattern: RegExp; period: string; area: string }[] = [
  { pattern: /land|property|deed|mutation|khatian/i,  period: "12 years", area: "property" },
  { pattern: /contract|agreement|breach|payment/i,    period: "3 years",  area: "contract" },
  { pattern: /labour|salary|termination|gratuity/i,   period: "3 years",  area: "labour"   },
  { pattern: /cheque|dishonour|bounce/i,              period: "1 year",   area: "criminal" },
  { pattern: /company|director|shareholder/i,         period: "3 years",  area: "company"  },
];

const TIME_BAR_PATTERNS = [
  /time.?bar/i, /limitation.*expir/i, /expir.*limitation/i,
  /too late/i, /years? ago/i, /decade/i,
];

const JURISDICTION_BARS: { pattern: RegExp; bar: string }[] = [
  { pattern: /service.*matter|government.*employee|civil.*servant/i,
    bar: "Administrative Tribunal has exclusive jurisdiction — High Court writ not maintainable" },
  { pattern: /labour.*court|industrial.*dispute/i,
    bar: "Labour Court has exclusive jurisdiction under Labour Act 2006" },
  { pattern: /tax.*tribunal|nbr.*appeal/i,
    bar: "Taxes Appellate Tribunal jurisdiction — exhaust before High Court" },
];

const EVIDENCE_ISSUES: { pattern: RegExp; issue: string; penalty: number }[] = [
  { pattern: /confession.*police|police.*confession/i,
    issue: "Police confession inadmissible under Evidence Act s.25", penalty: 0.20 },
  { pattern: /verbal.*agreement|oral.*contract|no.*written/i,
    issue: "No written agreement — proof challenge", penalty: 0.15 },
  { pattern: /no.*witness|without.*witness/i,
    issue: "Absence of witnesses reduces evidence quality", penalty: 0.10 },
  { pattern: /digital.*evidence|electronic.*evidence|screenshot|whatsapp/i,
    issue: "Electronic evidence requires s.65B certificate", penalty: 0.08 },
];

// ─── Tier-1 Runner ─────────────────────────────────────────

function runTierOneChecks(
  message: string,
  entry: QAEntry,
  area: string | null
): TierOneCheck[] {
  const checks: TierOneCheck[] = [];
  const msg = message.toLowerCase();

  const limMatch = LIMITATION_PATTERNS.find((l) => area === l.area || l.pattern.test(msg));
  if (limMatch) {
    const isTimeBared = TIME_BAR_PATTERNS.some((p) => p.test(msg));
    checks.push({
      checkType: "LIMITATION",
      result: isTimeBared ? "RED" : "GREEN",
      basis: isTimeBared
        ? `Limitation concern — ${limMatch.area}: ${limMatch.period}`
        : `Within limitation period — ${limMatch.area}: ${limMatch.period}`,
      penalty: isTimeBared ? 0.25 : 0,
    });
  }

  const jurisMatch = JURISDICTION_BARS.find((j) => j.pattern.test(msg));
  if (jurisMatch) {
    checks.push({ checkType: "JURISDICTION", result: "BLACK", basis: jurisMatch.bar, penalty: 0.40 });
  }

  for (const ev of EVIDENCE_ISSUES) {
    if (ev.pattern.test(msg)) {
      checks.push({ checkType: "EVIDENCE", result: "YELLOW", basis: ev.issue, penalty: ev.penalty });
    }
  }

  if (
    (area === "property" || /deed|register|registration/i.test(msg)) &&
    /unregister|not register|no register|oral.*sale|verbal.*sale/i.test(msg)
  ) {
    checks.push({
      checkType: "REGISTRATION",
      result: "YELLOW",
      basis: "Unregistered deed — Transfer of Property Act s.48: first REGISTERED deed prevails",
      penalty: 0.15,
    });
  }

  if (entry.escalate) {
    checks.push({
      checkType: "ESCALATION",
      result: "YELLOW",
      basis: entry.escalateReason ?? "Professional legal representation strongly advised",
      penalty: PENALTY_ESCALATION,
    });
  }

  return checks;
}

// ─── Relief Extractor ──────────────────────────────────────

function extractReliefOptions(conclusion: string): string[] {
  const options: string[] = [];
  for (const line of conclusion.split("\n")) {
    const clean = line.replace(/^[-*\d\.\s]+/, "").trim();
    if (
      clean.length > 10 &&
      clean.length < 200 &&
      !clean.startsWith("**") &&
      !clean.startsWith("|")
    ) {
      options.push(clean);
    }
  }
  return options.slice(0, 5);
}

// ─── Response Formatter ─────────────────────────────────────

function formatResponse(
  trace: ReasoningTrace,
  isPaid: boolean,
  lang: "en" | "bn",
  escalate: boolean,
  escalateReason?: string
): string {
  const { verdict, confidenceScore, verdictExplanation } = trace.stage4;
  const pct = Math.round(confidenceScore * 100);
  const lines: string[] = [];

  if (escalate && escalateReason) {
    lines.push(`🚨 **IMMEDIATE ATTENTION REQUIRED**\n${escalateReason}\n---\n`);
  }

  lines.push(`**${trace.stage2.issue}**\n`);
  lines.push(`**What the law says:**\n${trace.stage2.ruleText}\n`);

  if (trace.stage3.tierOneChecks.length > 0) {
    lines.push("**Deterministic Checks:**");
    for (const c of trace.stage3.tierOneChecks) {
      const icon =
        c.result === "GREEN" ? "✅" :
        c.result === "YELLOW" ? "⚠️" :
        c.result === "RED" ? "🔴" : "⛔";
      lines.push(`${icon} **${c.checkType}:** ${c.basis}`);
    }
    lines.push("");
  }

  if (isPaid) {
    lines.push(`**How this applies:**\n${trace.stage3.application}\n`);
    lines.push(`**What you should do:**\n${trace.stage4.conclusion}\n`);
  } else {
    const appLines = trace.stage3.application.split("\n").slice(0, 2).join("\n");
    lines.push(`**How this applies:**\n${appLines}\n`);
    lines.push(
      lang === "bn"
        ? "⚠️ **পূর্ণ বিশ্লেষণ আনলক করুন** — সম্পূর্ণ অ্যাকশন প্ল্যান, ডকুমেন্ট চেকলিস্ট"
        : "⚠️ **Unlock full analysis** — complete action plan, document checklist, step-by-step guide"
    );
    lines.push("");
  }

  lines.push("---");
  lines.push(`**Verdict: ${verdictEmoji(verdict)} ${verdict}** (Rule-match confidence: ${pct}%)`);
  lines.push(`_${verdictExplanation}_`);
  lines.push(
    `\n_Trace ID: ${trace.traceId} | Pipeline: ILRMF v${PIPELINE_VERSION} | Corpus: ${CORPUS_VERSION}_`
  );
  lines.push(
    "\n⚖️ Legal information only — not legal advice. For representation, consult a registered Bangladesh Bar Council advocate."
  );

  return lines.join("\n");
}

// ─── Black Builder ─────────────────────────────────────────

function buildBlack(
  message: string,
  area: string | null,
  lang: "en" | "bn"
): ILRMFResult {
  const traceId = randomUUID();
  const now = new Date().toISOString();

  const trace: ReasoningTrace = {
    traceId,
    timestamp: now,
    pipelineVersion: PIPELINE_VERSION,
    corpusVersion: CORPUS_VERSION,
    stage1: {
      jurisdiction: "BD",
      area: area ?? "general",
      keywordsMatched: [],
      matchDensity: 0,
      completenessScore: 0,
      escalateFlag: false,
    },
    stage2: {
      entryId: "NO_MATCH",
      question: message,
      issue: "No matching legal issue identified in current rule corpus",
      ruleText: "No applicable rule found",
      relatedRuleIds: [],
      certaintyLevels: [],
      conflictsDetected: false,
    },
    stage3: {
      application: "Query does not match any encoded rule in the current corpus",
      pathwayStrength: 0,
      tierOneChecks: [],
    },
    stage4: {
      conclusion: "Refer to qualified legal counsel",
      scoringBreakdown: {
        baseScore: 0, ruleMatchFactor: 0, ragConfidenceWeight: 0,
        missingFactPenalty: 0, ambiguityPenalty: 0, conflictPenalty: 0,
        escalationPenalty: 0, rawScore: 0, finalScore: 0,
      },
      confidenceScore: 0,
      verdict: "BLACK",
      verdictExplanation: "No operable rule match.",
      reliefOptions: ["Consult a qualified Bangladesh Bar Council advocate"],
    },
  };

  return {
    verdict: "BLACK",
    confidenceScore: 0,
    verdictEmoji: "⛔",
    verdictExplanation: trace.stage4.verdictExplanation,
    responseText:
      lang === "bn"
        ? `⛔ **BLACK — কোনো প্রযোজ্য নিয়ম মেলেনি**\n\nআপনার প্রশ্নটি বর্তমান কর্পাসের সুযোগের বাইরে।\n\n_Trace ID: ${traceId}_`
        : `⛔ **BLACK — No operable rule match**\n\nYour query is outside the current rule corpus scope.\n\n_Trace ID: ${traceId}_`,
    trace,
    source: { engine: "ilrmf_deterministic", entryId: null, ruleIds: [], corpusVersion: CORPUS_VERSION },
    escalate: false,
    escalateReason: null,
    area: (area ?? "general") as ILRMFResult["area"],
    language: lang,
    matchedEntryId: null,
    matchedRuleIds: [],
  };
}

// ─── Main Engine ───────────────────────────────────────────

export function runILRMF(input: ILRMFInput): ILRMFResult {
  const { message, knowledge, isPaid, language: lang } = input;
  const traceId = randomUUID();
  const now = new Date().toISOString();

  if (!knowledge.matched || !knowledge.qaEntry) {
    return buildBlack(message, knowledge.area, lang);
  }

  const entry = knowledge.qaEntry;
  const rules = knowledge.rules;

  // ── STAGE 1: Facts ──
  const msg = message.toLowerCase();
  const matched = entry.triggerKeywords.filter((kw) =>
    msg.includes(kw.toLowerCase())
  );
  const matchDensity =
    entry.triggerKeywords.length > 0
      ? matched.length / entry.triggerKeywords.length
      : 0;

  if (matchDensity < COMPLETENESS_THRESHOLD) {
    return buildBlack(message, knowledge.area, lang);
  }

  const s1: ReasoningTrace["stage1"] = {
    jurisdiction: entry.jurisdiction ?? "Bangladesh",
    area: entry.area ?? "general",
    keywordsMatched: matched,
    matchDensity,
    completenessScore: matchDensity,
    escalateFlag: entry.escalate,
  };

  // ── STAGE 2: Law ──
  const certaintyLevels = rules.map((r) => r.certainty);
  const conflictsDetected =
    certaintyLevels.includes("arguable") &&
    certaintyLevels.includes("confirmed") &&
    rules.length > 2;

  const s2: ReasoningTrace["stage2"] = {
    entryId: entry.id,
    question: entry.question,
    issue: entry.irac.issue,
    ruleText: entry.irac.rule,
    relatedRuleIds: entry.relatedRules,
    certaintyLevels,
    conflictsDetected,
  };

  // ── STAGE 3: Argument + Tier-1 ──
  const tierOneChecks = runTierOneChecks(message, entry, knowledge.area);
  const tierOnePenalty = Math.min(
    tierOneChecks.reduce((s, c) => s + c.penalty, 0),
    0.60
  );

  const s3: ReasoningTrace["stage3"] = {
    application: entry.irac.application,
    pathwayStrength: matchDensity,
    tierOneChecks,
  };

  // Jurisdiction bar → immediate BLACK
  const jurisBar = tierOneChecks.find(
    (c) => c.checkType === "JURISDICTION" && c.result === "BLACK"
  );
  if (jurisBar) {
    const black = buildBlack(message, knowledge.area, lang);
    black.trace.stage1 = s1;
    black.trace.stage2 = s2;
    black.trace.stage3 = s3;
    black.responseText =
      lang === "bn"
        ? `⛔ **BLACK — এখতিয়ার বাধা**\n\n${jurisBar.basis}\n\nPlease approach the correct tribunal or court.\n\n_Trace ID: ${traceId}_`
        : `⛔ **BLACK — Jurisdiction Bar**\n\n${jurisBar.basis}\n\nPlease approach the correct tribunal or court.\n\n_Trace ID: ${traceId}_`;
    return black;
  }

  // ── STAGE 4: Scoring ──
  const ruleMatchFactor = calculateRuleMatchFactor(rules);
  const ragConfidenceWeight = getRAGWeight(knowledge.confidence);

  const missingFactPenalty = entry.escalate
    ? Math.min(PENALTY_MISSING_FACT, 0.40)
    : 0;

  const ambiguityPenalty = rules.some((r) => r.certainty === "arguable")
    ? Math.min(PENALTY_AMBIGUITY, 0.30)
    : 0;

  const conflictPenalty = conflictsDetected
    ? Math.min(PENALTY_CONFLICT, 0.40)
    : 0;

  const rawScore =
    matchDensity * ruleMatchFactor * ragConfidenceWeight -
    missingFactPenalty -
    ambiguityPenalty -
    conflictPenalty -
    tierOnePenalty;

  const finalScore = Math.max(0, Math.min(1, rawScore));

  const verdict: VerdictBand =
    finalScore >= THRESHOLD_GREEN
      ? "GREEN"
      : finalScore >= THRESHOLD_YELLOW
      ? "YELLOW"
      : finalScore >= THRESHOLD_RED
      ? "RED"
      : "BLACK";

  const s4: ReasoningTrace["stage4"] = {
    conclusion: entry.irac.conclusion,
    scoringBreakdown: {
      baseScore: matchDensity,
      ruleMatchFactor,
      ragConfidenceWeight,
      missingFactPenalty,
      ambiguityPenalty,
      conflictPenalty,
      escalationPenalty: tierOnePenalty,
      rawScore,
      finalScore,
    },
    confidenceScore: finalScore,
    verdict,
    verdictExplanation: getVerdictExplanation(verdict),
    reliefOptions: extractReliefOptions(entry.irac.conclusion),
  };

  const trace: ReasoningTrace = {
    traceId,
    timestamp: now,
    pipelineVersion: PIPELINE_VERSION,
    corpusVersion: CORPUS_VERSION,
    stage1: s1,
    stage2: s2,
    stage3: s3,
    stage4: s4,
  };

  return {
    verdict,
    confidenceScore: finalScore,
    verdictEmoji: verdictEmoji(verdict),
    verdictExplanation: s4.verdictExplanation,
    responseText: formatResponse(trace, isPaid, lang, entry.escalate, entry.escalateReason),
    trace,
    source: {
      engine: "ilrmf_deterministic",
      entryId: entry.id,
      ruleIds: rules.map((r) => r.id),
      corpusVersion: CORPUS_VERSION,
    },
    escalate: entry.escalate,
    escalateReason: entry.escalateReason ?? null,
    area: entry.area ?? "general",
    language: lang,
    matchedEntryId: entry.id,
    matchedRuleIds: rules.map((r) => r.id),
  };
}

// ─── Reproducibility Test ──────────────────────────────────

export function reproducibilityTest(
  input: ILRMFInput,
  runs: number = 10
) {
  const verdicts: VerdictBand[] = [];
  const scores: number[] = [];
  for (let i = 0; i < runs; i++) {
    const r = runILRMF(input);
    verdicts.push(r.verdict);
    scores.push(r.confidenceScore);
  }
  return {
    passed:
      verdicts.every((v) => v === verdicts[0]) &&
      scores.every((s) => s === scores[0]),
    verdicts,
    scores,
  };
}