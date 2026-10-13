import type { Impact, ScanResult } from "../scanner/types";

export type ExposureBand = "low" | "elevated" | "high" | "severe";

export interface RiskScore {
  score: number; // 0-100, higher is worse
  band: ExposureBand;
  criticalCount: number;
  seriousCount: number;
  totalViolations: number;
  affectedElements: number;
}

const IMPACT_WEIGHT: Record<Impact, number> = {
  minor: 1,
  moderate: 3,
  serious: 7,
  critical: 12,
};

export function scoreScan(result: ScanResult): RiskScore {
  let weighted = 0;
  let affectedElements = 0;
  let criticalCount = 0;
  let seriousCount = 0;
  for (const violation of result.violations) {
    weighted += IMPACT_WEIGHT[violation.impact] * Math.max(1, violation.nodes);
    affectedElements += violation.nodes;
    if (violation.impact === "critical") criticalCount += 1;
    if (violation.impact === "serious") seriousCount += 1;
  }
  const score = Math.min(100, Math.round(weighted));
  return {
    score,
    band: bandFor(score, criticalCount),
    criticalCount,
    seriousCount,
    totalViolations: result.violations.length,
    affectedElements,
  };
}

function bandFor(score: number, criticalCount: number): ExposureBand {
  if (criticalCount > 0 || score >= 60) return "severe";
  if (score >= 30) return "high";
  if (score >= 10) return "elevated";
  return "low";
}
