//  JesAI Shared Types — Single Source of Truth
// 
// ALL imports of LawArea, QAEntry, LegalRule, KnowledgeResult,
// KnowledgeBank, IRAC must come from this file.
//
// Consumed by:
//   - knowledge/index.ts        (RAG layer)
//   - knowledge/banks/*.ts     (all knowledge banks)
//   - ilrmf/ilrmf-types.ts     (imports LawArea, QAEntry, LegalRule, KnowledgeResult)
//   - ilrmf/engine.ts         (reads QAEntry.irac, LegalRule.certainty)
//   - scenarios/manager.ts     (imports LawArea)
//   - app/api/chat/route.ts   (imports LawArea, KnowledgeResult)
//
// No re-definitions anywhere else. If a field changes here,
// TypeScript catches it at compile time in all consumers.

// ─── Law Area ──────────────────────────────────────────────

export type LawArea =
  | "property"
  | "criminal"
  | "family"
  | "labour"
  | "company"
  | "tax"
  | "nrb"
  | "constitutional"
  | "consumer"
  | "cyber"
  | "contract"
  | "general"
  | "administrative"
  | "evidence";

// ─── Legal Rule ────────────────────────────────────────────
// certainty flows directly into ILRMF scoring:
//   confirmed          → weight 1.00
//   arguable           → weight 0.72
//   verify-with-lawyer → weight 0.45

export interface LegalRule {
  id: string;
  title: string;
  source: string;
  rule: string;
  certainty: "confirmed" | "arguable" | "verify-with-lawyer";
}

// ─── IRAC Structure ────────────────────────────────────────
// Used by QAEntry and consumed directly by ILRMF Stage 2-4

export interface IRAC {
  issue: string;
  rule: string;
  application: string;
  conclusion: string;
}

// ─── QA Entry ──────────────────────────────────────────────
// Knowledge bank unit. ILRMF reads:
//   .triggerKeywords → Stage 1 match density
//   .irac.issue     → Stage 2 issue display
//   .irac.rule      → Stage 2 rule display
//   .irac.application → Stage 3 argument
//   .irac.conclusion → Stage 4 relief
//   .escalate        → missing fact penalty
//   .relatedRules    → fetches LegalRule[] for scoring

export interface QAEntry {
  id: string;
  question: string;
  area: LawArea;
  jurisdiction: string;
  triggerKeywords: string[];
  irac: IRAC;
  relatedRules: string[];
  escalate: boolean;
  escalateReason?: string;
}

// ─── Knowledge Bank ───────────────────────────────────────
// Container for one law area's rules + Q&A entries

export interface KnowledgeBank {
  area: LawArea;
  rules: LegalRule[];
  qaBank: QAEntry[];
}

// ─── Knowledge Result ──────────────────────────────────────
// Output of queryKnowledge(). Flows directly into
// ILRMFInput.knowledge with zero transformation.
//
// confidence is "high" | "medium" | "low" — NOT a number.
// ILRMF converts this to a weight:
//   "high"   → 1.00
//   "medium" → 0.85
//   "low"    → 0.70

export interface KnowledgeResult {
  matched: boolean;
  area: LawArea | null;
  qaEntry: QAEntry | null;
  rules: LegalRule[];
  escalate: boolean;
  escalateReason?: string;
  confidence: "high" | "medium" | "low";
}