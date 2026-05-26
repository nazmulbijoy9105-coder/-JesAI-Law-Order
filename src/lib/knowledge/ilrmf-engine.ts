// ─── ILRMF Deterministic Engine ──────────────────────────────
// JesAI BD — Zero LLM. Zero randomness. Zero API cost.
//
// Implements ILRMF v2.0 four-property definition:
//   (1) Deterministic sequential staging
//   (2) Rule-source abstraction (BD statutory corpus)
//   (3) Confidence-banded verdict emission GREEN/YELLOW/RED/BLACK
//   (4) Mandatory reasoning trace output
//
// Confidence formula (Section 3.8, ILRMF Academic v2.0):
//   C = (BaseScore × RuleMatchFactor)
//       - MissingFactPenalty
//       - AmbiguityPenalty
//       - ConflictPenalty
//       - EscalationPenalty
//   C clamped to [0.0, 1.0]
//
// Verdict bands:
//   GREEN  : C >= 0.85
//   YELLOW : 0.50 <= C < 0.85
//   RED    : 0.20 <= C < 0.50
//   BLACK  : C < 0.20
//
// NLC validated — Md Nazmul Islam, Advocate, SCB
// ─────────────────────────────────────────────────────────────

import { randomUUID } from "crypto";
import type { QAEntry, LegalRule, KnowledgeResult } from "./types";
import type {
  ILRMFResult,
  ReasoningTrace,
  ScoringBreakdown,
  TierOneCheck,
  VerdictBand,
  TierOneResult,
} from "./ilrmf-types";

// ─── Constants ────────────────────────────────────────────────
const PIPELINE_VERSION = "2.0.0";
const CORPUS_VERSION   = "BD.MULTI.v1.0";

// Certainty → weight mapping
const CERTAINTY_WEIGHTS: Record<string, number> = {
  "confirmed":            1.00,
  "arguable":             0.72,
  "verify-with-lawyer":   0.45,
};

// Verdict thresholds
const THRESHOLD_GREEN  = 0.85;
const THRESHOLD_YELLOW = 0.50;
const THRESHOLD_RED    = 0.20;

// Penalty values (per Section 3.8)
const PENALTY_MISSING_FACT  = 0.10; // per mandatory missing fact, cap 0.40
const PENALTY_AMBIGUITY     = 0.15; // per ambiguous rule, cap 0.30
const PENALTY_CONFLICT      = 0.20; // per unresolved conflict, cap 0.40
const PENALTY_ESCALATION    = 0.12; // escalate=true means complexity/urgency

// Completeness threshold — below this emit BLACK immediately
const COMPLETENESS_THRESHOLD = 0.15;

// ─── Tier-1 Deterministic Checks ─────────────────────────────
// These run pure logic on the query text — zero LLM

const LIMITATION_PATTERNS: { pattern: RegExp; period: string; area: string }[] = [
  { pattern: /land|property|deed|mutation|khatian/i,   period: "12 years",  area: "property" },
  { pattern: /contract|agreement|breach|payment/i,     period: "3 years",   area: "contract" },
  { pattern: /labour|salary|termination|gratuity/i,    period: "3 years",   area: "labour"   },
  { pattern: /cheque|dishonour|bounce/i,               period: "1 year",    area: "criminal" },
  { pattern: /company|director|shareholder/i,          period: "3 years",   area: "company"  },
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
    issue: "Police confession inadmissible under Evidence Act s.25 — significant evidence risk",
    penalty: 0.20 },
  { pattern: /verbal.*agreement|oral.*contract|no.*written/i,
    issue: "No written agreement — proof challenge; verbal contract enforceable but harder to establish",
    penalty: 0.15 },
  { pattern: /no.*witness|without.*witness/i,
    issue: "Absence of witnesses reduces evidence quality",
    penalty: 0.10 },
  { pattern: /digital.*evidence|electronic.*evidence|screenshot|whatsapp/i,
    issue: "Electronic evidence requires s.65B certificate — verify availability",
    penalty: 0.08 },
];

function runTierOneChecks(
  message: string,
  entry: QAEntry,
  area: string | null
): TierOneCheck[] {
  const checks: TierOneCheck[] = [];
  const msg = message.toLowerCase();

  // ── Limitation check ──────────────────────────────────────
  const limMatch = LIMITATION_PATTERNS.find(
    (l) => area === l.area || l.pattern.test(msg)
  );
  if (limMatch) {
    const isTimeBared = TIME_BAR_PATTERNS.some((p) => p.test(msg));
    checks.push({
      checkType: "LIMITATION",
      result: isTimeBared ? "RED" : "GREEN",
      basis: isTimeBared
        ? `Limitation period concern detected — ${limMatch.area} limitation: ${limMatch.period} (Limitation Act 1908)`
        : `Within apparent limitation period — ${limMatch.area}: ${limMatch.period} (Limitation Act 1908)`,
      penalty: isTimeBared ? 0.25 : 0,
    });
  }

  // ── Jurisdiction check ────────────────────────────────────
  const jurisMatch = JURISDICTION_BARS.find((j) => j.pattern.test(msg));
  if (jurisMatch) {
    checks.push({
      checkType: "JURISDICTION",
      result: "BLACK",
      basis: jurisMatch.bar,
      penalty: 0.40,
    });
  }

  // ── Evidence quality check ────────────────────────────────
  for (const ev of EVIDENCE_ISSUES) {
    if (ev.pattern.test(msg)) {
      checks.push({
        checkType: "EVIDENCE",
        result: "YELLOW",
        basis: ev.issue,
        penalty: ev.penalty,
      });
    }
  }

  // ── Registration / formality check (property) ─────────────
  if (area === "property" || /deed|register|registration/i.test(msg)) {
    const unregistered = /unregister|not register|no register|oral.*sale|verbal.*sale/i.test(msg);
    if (unregistered) {
      checks.push({
        checkType: "REGISTRATION",
        result: "YELLOW",
        basis: "Unregistered deed — Transfer of Property Act s.48: first REGISTERED deed prevails; unregistered position is weaker",
        penalty: 0.15,
      });
    }
  }

  // ── Escalation check ──────────────────────────────────────
  if (entry.escalate) {
    checks.push({
      checkType: "ESCALATION",
      result: "YELLOW",
      basis: entry.escalateReason ?? "Professional legal representation strongly advised for this matter",
      penalty: PENALTY_ESCALATION,
    });
  }

  return checks;
}

// ─── Stage 1 — Facts ──────────────────────────────────────────
function stage1(
  message: string,
  entry: QAEntry,
  matchScore: number
): ReasoningTrace["stage1"] {
  const keywords = entry.triggerKeywords;
  const msg = message.toLowerCase();
  const matched = keywords.filter((kw) => msg.includes(kw.toLowerCase()));
  const matchDensity = keywords.length > 0 ? matched.length / keywords.length : 0;

  return {
    jurisdiction: entry.jurisdiction,
    area: entry.area,
    keywordsMatched: matched,
    matchDensity,
    completenessScore: matchDensity,
    escalateFlag: entry.escalate,
  };
}

// ─── Stage 2 — Law ────────────────────────────────────────────
function stage2(
  entry: QAEntry,
  relatedRules: LegalRule[]
): ReasoningTrace["stage2"] {
  const certaintyLevels = relatedRules.map((r) => r.certainty);
  const hasConflict = certaintyLevels.includes("arguable") &&
    certaintyLevels.includes("confirmed") &&
    relatedRules.length > 2;

  return {
    entryId: entry.id,
    question: entry.question,
    issue: entry.irac.issue,
    ruleText: entry.irac.rule,
    relatedRuleIds: entry.relatedRules,
    certaintLevels: certaintyLevels,
    conflictsDetected: hasConflict,
  };
}

// ─── Stage 3 — Argument ───────────────────────────────────────
function stage3(
  message: string,
  entry: QAEntry,
  area: string | null,
  matchDensity: number
): { stage: ReasoningTrace["stage3"]; tierOnePenalty: number } {
  const checks = runTierOneChecks(message, entry, area);
  const tierOnePenalty = Math.min(
    checks.reduce((sum, c) => sum + c.penalty, 0),
    0.60 // hard cap on tier-one penalties combined
  );

  return {
    stage: {
      application: entry.irac.application,
      pathwayStrength: matchDensity,
      tierOneChecks: checks,
    },
    tierOnePenalty,
  };
}

// ─── Stage 4 — Relief & Confidence Scoring ───────────────────
function stage4(
  entry: QAEntry,
  relatedRules: LegalRule[],
  stage1Out: ReasoningTrace["stage1"],
  stage2Out: ReasoningTrace["stage2"],
  tierOnePenalty: number
): ReasoningTrace["stage4"] {

  // Base score — keyword match density
  const baseScore = stage1Out.matchDensity;

  // Rule match factor — weighted average of rule certainties
  const weights = relatedRules.map((r) => CERTAINTY_WEIGHTS[r.certainty] ?? 0.5);
  const ruleMatchFactor = weights.length > 0
    ? weights.reduce((a, b) => a + b, 0) / weights.length
    : 0.75; // default if no related rules found

  // Penalties
  const missingFactPenalty = entry.escalate
    ? Math.min(1 * PENALTY_MISSING_FACT, 0.40)
    : 0;

  const ambiguityPenalty = relatedRules.some((r) => r.certainty === "arguable")
    ? Math.min(1 * PENALTY_AMBIGUITY, 0.30)
    : 0;

  const conflictPenalty = stage2Out.conflictsDetected
    ? Math.min(1 * PENALTY_CONFLICT, 0.40)
    : 0;

  const escalationPenalty = tierOnePenalty;

  // Raw score
  const rawScore = (baseScore * ruleMatchFactor)
    - missingFactPenalty
    - ambiguityPenalty
    - conflictPenalty
    - escalationPenalty;

  // Clamp to [0, 1]
  const finalScore = Math.max(0, Math.min(1, rawScore));

  // Scoring breakdown
  const scoring: ScoringBreakdown = {
    baseScore,
    ruleMatchFactor,
    missingFactPenalty,
    ambiguityPenalty,
    conflictPenalty,
    escalationPenalty,
    rawScore,
    finalScore,
  };

  // Verdict band
  const verdict: VerdictBand =
    finalScore >= THRESHOLD_GREEN  ? "GREEN"  :
    finalScore >= THRESHOLD_YELLOW ? "YELLOW" :
    finalScore >= THRESHOLD_RED    ? "RED"    : "BLACK";

  // Verdict explanation
  const verdictExplanations: Record<VerdictBand, string> = {
    GREEN:  "Applicable rule clearly governs stated facts; proceed with recommended relief.",
    YELLOW: "Applicable rule exists but fact gaps or ambiguity require professional review before action.",
    RED:    "Weak or partial rule match; mandatory professional review — do not act unilaterally.",
    BLACK:  "No operable rule match or jurisdiction bar identified — immediate referral to qualified advocate required.",
  };

  // Extract relief options from conclusion text
  const reliefOptions = extractReliefOptions(entry.irac.conclusion);

  return {
    conclusion: entry.irac.conclusion,
    scoringBreakdown: scoring,
    confidenceScore: finalScore,
    verdict,
    verdictExplanation: verdictExplanations[verdict],
    reliefOptions,
  };
}

// ─── Relief Option Extractor ──────────────────────────────────
function extractReliefOptions(conclusion: string): string[] {
  const options: string[] = [];
  const lines = conclusion.split("\n");

  for (const line of lines) {
    const clean = line.replace(/^[•✅❌\-\*\d\.\s]+/, "").trim();
    if (
      clean.length > 10 &&
      clean.length < 200 &&
      !clean.startsWith("**") &&
      !clean.startsWith("|") &&
      !clean.startsWith("📄") &&
      !clean.startsWith("⚠️") &&
      !clean.startsWith("📱") &&
      !clean.startsWith("📋")
    ) {
      options.push(clean);
    }
  }

  return options.slice(0, 5);
}

// ─── Verdict Emoji ────────────────────────────────────────────
function verdictEmoji(v: VerdictBand): string {
  return { GREEN: "🟢", YELLOW: "🟡", RED: "🔴", BLACK: "⬛" }[v];
}

// ─── Response Formatter — Deterministic Text ──────────────────
function formatDeterministicResponse(
  entry: QAEntry,
  trace: ReasoningTrace,
  isPaid: boolean,
  lang: "en" | "bn"
): string {
  const { verdict, confidenceScore, verdictExplanation, reliefOptions } =
    trace.stage4;
  const emoji = verdictEmoji(verdict);
  const scorePercent = Math.round(confidenceScore * 100);
  const tierChecks = trace.stage3.tierOneChecks;

  const lines: string[] = [];

  // ── Issue ──────────────────────────────────────────────────
  lines.push(`**${trace.stage2.issue}**\n`);

  // ── Rule ──────────────────────────────────────────────────
  lines.push(`**What the law says:**\n${trace.stage2.ruleText}\n`);

  // ── Tier-1 checks (always free — per ILRMF spec) ──────────
  if (tierChecks.length > 0) {
    lines.push("**Deterministic Checks:**");
    for (const check of tierChecks) {
      const icon =
        check.result === "GREEN"  ? "🟢" :
        check.result === "YELLOW" ? "🟡" :
        check.result === "RED"    ? "🔴" : "⬛";
      lines.push(`${icon} **${check.checkType}:** ${check.basis}`);
    }
    lines.push("");
  }

  // ── Application (paid only) ───────────────────────────────
  if (isPaid) {
    lines.push(`**How this applies:**\n${trace.stage3.application}\n`);
    lines.push(`**What you should do:**\n${trace.stage4.conclusion}\n`);
  } else {
    // Free: show first 2 lines of application only
    const appLines = trace.stage3.application.split("\n").slice(0, 2).join("\n");
    lines.push(`**How this applies:**\n${appLines}\n`);

    // Paywall marker
    const price = lang === "bn"
      ? "🔒 **পূর্ণ উত্তর আনলক করুন** — সম্পূর্ণ বিশ্লেষণ, করণীয় পদক্ষেপ, ডকুমেন্ট তালিকা"
      : "🔒 **Unlock full analysis** — complete action plan, document checklist, step-by-step guide";
    lines.push(price + "\n");
  }

  // ── Verdict (always shown — mandatory per ILRMF) ───────────
  lines.push("---");
  lines.push(
    `**Verdict: ${emoji} ${verdict}** (Rule-match confidence: ${scorePercent}%)`
  );
  lines.push(`_${verdictExplanation}_`);

  // ── Trace reference ────────────────────────────────────────
  lines.push(
    `\n_Trace ID: ${trace.traceId} | Pipeline: ILRMF v${PIPELINE_VERSION} | Corpus: ${CORPUS_VERSION}_`
  );

  // ── Disclaimer (always) ────────────────────────────────────
  lines.push(
    "\n⚠️ Legal information only — not legal advice. For representation, consult a registered Bangladesh Bar Council advocate."
  );

  return lines.join("\n");
}

// ─── Black Response — No Match ───────────────────────────────
function buildBlackResponse(
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
      certaintLevels: [],
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
        baseScore: 0,
        ruleMatchFactor: 0,
        missingFactPenalty: 0,
        ambiguityPenalty: 0,
        conflictPenalty: 0,
        escalationPenalty: 0,
        rawScore: 0,
        finalScore: 0,
      },
      confidenceScore: 0,
      verdict: "BLACK",
      verdictExplanation:
        "No operable rule match — query is outside current corpus scope or requires specialist advice.",
      reliefOptions: ["Consult a qualified Bangladesh Bar Council advocate"],
    },
  };

  const responseText =
    lang === "bn"
      ? `⬛ **BLACK — কোনো প্রযোজ্য নিয়ম পাওয়া যায়নি**\n\nআপনার প্রশ্নটি বর্তমান আইনি ডেটাবেজে নেই। অনুগ্রহ করে একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।\n\n_Trace ID: ${traceId}_`
      : `⬛ **BLACK — No operable rule match**\n\nYour query is outside the current rule corpus scope. Please consult a qualified advocate.\n\n_Trace ID: ${traceId}_`;

  return {
    verdict: "BLACK",
    confidenceScore: 0,
    verdictEmoji: "⬛",
    verdictExplanation: trace.stage4.verdictExplanation,
    responseText,
    trace,
    source: "ilrmf_deterministic",
    escalate: false,
    area: area ?? "general",
    language: lang,
  };
}

// ─── Main Engine — Public API ─────────────────────────────────
export function runILRMF(
  message: string,
  result: { // KnowledgeResult shape
    matched: boolean;
    area: string | null;
    qaEntry: QAEntry | null;
    rules: LegalRule[];
    escalate: boolean;
    escalateReason?: string;
    confidence: string;
  },
  isPaid: boolean,
  lang: "en" | "bn"
): ILRMFResult {
  const traceId = randomUUID();
  const now = new Date().toISOString();

  // No match — emit BLACK immediately
  if (!result.matched || !result.qaEntry) {
    return buildBlackResponse(message, result.area, lang);
  }

  const entry = result.qaEntry;
  const relatedRules = result.rules;

  // ── STAGE 1 ───────────────────────────────────────────────
  const keywords = entry.triggerKeywords;
  const msg = message.toLowerCase();
  const matchScore = keywords.filter((kw) =>
    msg.includes(kw.toLowerCase())
  ).length;

  const s1 = stage1(message, entry, matchScore);

  // BLACK if completeness below threshold
  if (s1.completenessScore < COMPLETENESS_THRESHOLD) {
    return buildBlackResponse(message, result.area, lang);
  }

  // ── STAGE 2 ───────────────────────────────────────────────
  const s2 = stage2(entry, relatedRules);

  // ── STAGE 3 ───────────────────────────────────────────────
  const { stage: s3, tierOnePenalty } = stage3(
    message,
    entry,
    result.area,
    s1.matchDensity
  );

  // Jurisdiction bar — emit BLACK
  const jurisBar = s3.tierOneChecks.find(
    (c) => c.checkType === "JURISDICTION" && c.result === "BLACK"
  );
  if (jurisBar) {
    const blackResult = buildBlackResponse(message, result.area, lang);
    blackResult.trace.stage3.tierOneChecks = s3.tierOneChecks;
    blackResult.responseText =
      lang === "bn"
        ? `⬛ **BLACK — এখতিয়ার বাধা**\n\n${jurisBar.basis}\n\n_Trace ID: ${traceId}_`
        : `⬛ **BLACK — Jurisdiction Bar**\n\n${jurisBar.basis}\n\nPlease approach the correct tribunal or court.\n\n_Trace ID: ${traceId}_`;
    return blackResult;
  }

  // ── STAGE 4 ───────────────────────────────────────────────
  const s4 = stage4(entry, relatedRules, s1, s2, tierOnePenalty);

  // ── Assemble trace ────────────────────────────────────────
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

  // ── Format response ───────────────────────────────────────
  const responseText = formatDeterministicResponse(entry, trace, isPaid, lang);

  return {
    verdict: s4.verdict,
    confidenceScore: s4.confidenceScore,
    verdictEmoji: verdictEmoji(s4.verdict),
    verdictExplanation: s4.verdictExplanation,
    responseText,
    trace,
    source: "ilrmf_deterministic",
    escalate: entry.escalate,
    escalateReason: entry.escalateReason,
    area: result.area ?? "general",
    language: lang,
  };
}

// ─── Reproducibility Test Helper ─────────────────────────────
// Run same query N times — all outputs must be identical
// Used for benchmark validation (Section 7.1, ILRMF paper)
export function reproducibilityTest(
  message: string,
  result: Parameters<typeof runILRMF>[1],
  isPaid: boolean,
  lang: "en" | "bn",
  runs: number = 10
): { passed: boolean; verdicts: VerdictBand[]; scores: number[] } {
  const verdicts: VerdictBand[] = [];
  const scores: number[] = [];

  for (let i = 0; i < runs; i++) {
    const r = runILRMF(message, result, isPaid, lang);
    verdicts.push(r.verdict);
    scores.push(r.confidenceScore);
  }

  const allVerdictsIdentical = verdicts.every((v) => v === verdicts[0]);
  const allScoresIdentical = scores.every((s) => s === scores[0]);

  return {
    passed: allVerdictsIdentical && allScoresIdentical,
    verdicts,
    scores,
  };
}
