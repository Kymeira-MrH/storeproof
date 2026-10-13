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

// One widespread issue (e.g. a nav link repeated 30x) must not dominate the score,
// or breadth eclipses severity and everything reads SEVERE. Cap each issue's element
// contribution.
const NODE_CAP = 5;

export function scoreScan(result: ScanResult): RiskScore {
  let weighted = 0;
  let affectedElements = 0;
  let criticalCount = 0;
  let seriousCount = 0;
  for (const violation of result.violations) {
    // Fail safe on malformed input: unknown impact counts as moderate, bad node
    // counts clamp to 1. A compliance tool must never silently under-report.
    const weight = IMPACT_WEIGHT[violation.impact] ?? IMPACT_WEIGHT.moderate;
    const nodes = Number.isFinite(violation.nodes) && violation.nodes > 0 ? violation.nodes : 1;
    weighted += weight * Math.min(nodes, NODE_CAP);
    affectedElements += nodes;
    if (violation.impact === "critical") criticalCount += 1;
    if (violation.impact === "serious") seriousCount += 1;
  }
  const score = Math.min(100, Math.round(weighted));
  return {
    score,
    band: bandFor(score, criticalCount, seriousCount),
    criticalCount,
    seriousCount,
    totalViolations: result.violations.length,
    affectedElements,
  };
}

// Calibrated so SEVERE means "genuinely high legal risk", not "any issue at all".
// We sell honest assessment, not fear: over-labelling every store SEVERE makes the
// band meaningless and reads as scaremongering.
function bandFor(score: number, criticalCount: number, seriousCount: number): ExposureBand {
  if (criticalCount > 0 || seriousCount >= 5 || score >= 70) return "severe";
  if (seriousCount >= 1 || score >= 35) return "high";
  if (score >= 10) return "elevated";
  return "low";
}
