import { describe, it, expect } from "vitest";
import { scoreScan } from "@/lib/scoring/risk-score";
import type { ScanResult, Violation } from "@/lib/scanner/types";

function result(violations: Violation[]): ScanResult {
  return { url: "https://x.test", scannedAt: "2026-10-13T00:00:00.000Z", violations, passes: 0, incomplete: 0 };
}
const v = (impact: Violation["impact"], nodes = 1): Violation => ({
  id: "image-alt",
  impact,
  wcagCriteria: ["wcag111"],
  nodes,
  help: "Images must have alt text",
  helpUrl: "https://x",
});

describe("scoreScan", () => {
  it("scores a clean site as low (Review Focus: clean site)", () => {
    const s = scoreScan(result([]));
    expect(s.score).toBe(0);
    expect(s.band).toBe("low");
    expect(s.totalViolations).toBe(0);
  });

  it("bands a critical violation as severe", () => {
    const s = scoreScan(result([v("critical")]));
    expect(s.band).toBe("severe");
    expect(s.criticalCount).toBe(1);
  });

  it("does not overflow or NaN on pathological volume, still severe (Review Focus)", () => {
    const s = scoreScan(result([v("critical", 100000)]));
    expect(Number.isNaN(s.score)).toBe(false);
    expect(s.score).toBeLessThanOrEqual(100);
    expect(s.band).toBe("severe"); // critical present
  });

  it("bands a single serious issue as high", () => {
    const s = scoreScan(result([v("serious", 5)]));
    expect(s.band).toBe("high");
  });

  it("bands two serious issues as high, not severe (calibrated, not alarmist)", () => {
    const s = scoreScan(result([v("serious", 10), v("serious", 3)]));
    expect(s.seriousCount).toBe(2);
    expect(s.band).toBe("high");
  });

  it("escalates many serious issues to severe", () => {
    const s = scoreScan(result([v("serious"), v("serious"), v("serious"), v("serious"), v("serious")]));
    expect(s.band).toBe("severe");
  });
});
