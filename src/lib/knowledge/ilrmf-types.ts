// ─── ILRMF Engine Types ───────────────────────────────────────
// Deterministic output contract for JesAI BD
// All fields are computed — zero LLM involvement

export type VerdictBand = "GREEN" | "YELLOW" | "RED" | "BLACK";

export type TierOneCheckType =
  | "LIMITATION"
  | "REGISTRATION"
  | "JURISDICTION"
  | "EVIDENCE"
  | "ESCALATION";

export interface TierOneCheck {
  checkType: TierOneCheckType;
  result: VerdictBand;
  basis: string;
  penalty: number;
}

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
  certaintLevels: string[];
  conflictsDetected: boolean;
}

export interface Stage3Trace {
  application: string;
  pathwayStrength: number;
  tierOneChecks: TierOneCheck[];
}

export interface ScoringBreakdown {
  baseScore: number;
  ruleMatchFactor: number;
  missingFactPenalty: number;
  ambiguityPenalty: number;
  conflictPenalty: number;
  escalationPenalty: number;
  rawScore: number;
  finalScore: number;
}

export interface ReliefOption {
  type: string;
  description: string;
  conditions: string[];
  deadline?: string;
}

export interface Stage4Trace {
  conclusion: string;
  scoringBreakdown: ScoringBreakdown;
  confidenceScore: number;
  verdict: VerdictBand;
  verdictExplanation: string;
  reliefOptions: string[];
}

export interface ILRMFTrace {
  traceId: string;
  timestamp: string;
  pipelineVersion: string;
  corpusVersion: string;
  stage1: Stage1Trace;
  stage2: Stage2Trace;
  stage3: Stage3Trace;
  stage4: Stage4Trace;
}

export interface ILRMFResult {
  responseText: string;
  source: string;
  area: string;
  confidenceScore: number;
  verdict: VerdictBand;
  verdictEmoji: string;
  verdictExplanation: string;
  escalate: boolean;
  escalateReason: string | null;
  language: string;
  trace: ILRMFTrace;
}

export type ReasoningTrace = ILRMFTrace;

// Kept for backward compatibility if referenced elsewhere
export interface TierOneResult {
  checks: TierOneCheck[];
  passed: boolean;
  blockingIssues: string[];
}