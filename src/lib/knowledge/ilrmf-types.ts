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
  type: TierOneCheckType;
  status: "PASS" | "FAIL" | "N/A";
  detail: string;
}

export interface Stage1Trace {
  inputLength: number;
  normalizedInput: string;
  triggerMatchCount: number;
  matchedTriggers: string[];
}

export interface Stage2Trace {
  areaMatched: boolean;
  areaSource: string;
  pathwayStrength: number;
  ruleCount: number;
  matchedRules: string[];
}

export interface Stage3Trace {
  tierOneChecks: TierOneCheck[];
  pathwayStrength: number;
  hardBlocks: string[];
  softWarnings: string[];
}

export interface ScoringBreakdown {
  baseScore: number;
  tierOneBonus: number;
  pathwayBonus: number;
  escalationPenalty: number;
  finalScore: number;
}

export interface ReliefOption {
  type: string;
  description: string;
  conditions: string[];
  deadline?: string;
}

export interface Stage4Trace {
  scoringBreakdown: ScoringBreakdown;
  reliefOptions: ReliefOption[];
  verdictReasoning: string;
}

export interface ILRMFTrace {
  traceId: string;
  timestamp: string;
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