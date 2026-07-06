//  ILRMF v2.0 Type Definitions — CANONICAL
//
// Imports shared types from ./types (Option D).
// Defines ONLY ILRMF-domain types (VerdictBand, Traces, Scoring).

import type { LawArea, QAEntry, LegalRule, KnowledgeResult } from '../shared/types';

// ─── Verdict ────────────────────────────────────────────────

export type VerdictBand = "GREEN" | "YELLOW" | "RED" | "BLACK";

// ─── Tier-1 Checks ─────────────────────────────────────────

export type TierOneCheckType =
  | "LIMITATION"
  | "JURISDICTION"
  | "EVIDENCE"
  | "REGISTRATION"
  | "ESCALATION";

export interface TierOneCheck {
  checkType: TierOneCheckType;
  result: VerdictBand;
  basis: string;
  penalty: number;
}

// ─── Scoring ────────────────────────────────────────────────

export interface ScoringBreakdown {
  baseScore: number;
  ruleMatchFactor: number;
  ragConfidenceWeight: number;
  missingFactPenalty: number;
  ambiguityPenalty: number;
  conflictPenalty: number;
  escalationPenalty: number;
  rawScore: number;
  finalScore: number;
}

// ─── Reasoning Trace ───────────────────────────────────────

export interface Stage1Trace {
  jurisdiction: string;
  area: string;
  keywordsMatched: string[];
  matchDensity: number;
  completenessScore: number;
  escalateFlag: boolean;
}

export interface Stage2Trace {
  entryId: string;
  question: string;
  issue: string;
  ruleText: string;
  relatedRuleIds: string[];
  certaintyLevels: string[];
  conflictsDetected: boolean;
}

export interface Stage3Trace {
  application: string;
  pathwayStrength: number;
  tierOneChecks: TierOneCheck[];
}

export interface Stage4Trace {
  conclusion: string;
  scoringBreakdown: ScoringBreakdown;
  confidenceScore: number;
  verdict: VerdictBand;
  verdictExplanation: string;
  reliefOptions: string[];
}

export interface ReasoningTrace {
  traceId: string;
  timestamp: string;
  pipelineVersion: string;
  corpusVersion: string;
  stage1: Stage1Trace;
  stage2: Stage2Trace;
  stage3: Stage3Trace;
  stage4: Stage4Trace;
}

// ─── Source Tracking ────────────────────────────────────────

export interface ILRMFSource {
  engine: "ilrmf_deterministic";
  entryId: string | null;
  ruleIds: string[];
  corpusVersion: string;
}

// ─── Engine Input ──────────────────────────────────────────

export interface ILRMFInput {
  message: string;
  knowledge: KnowledgeResult;
  isPaid: boolean;
  language: "en" | "bn";
}

// ─── Engine Output ─────────────────────────────────────────

export interface ILRMFResult {
  verdict: VerdictBand;
  confidenceScore: number;
  verdictEmoji: string;
  verdictExplanation: string;
  responseText: string;
  trace: ReasoningTrace;
  source: ILRMFSource;
  escalate: boolean;
  escalateReason: string | null;
  area: LawArea;
  language: "en" | "bn";
  matchedEntryId: string | null;
  matchedRuleIds: string[];
}