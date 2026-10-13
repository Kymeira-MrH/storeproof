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

  it("caps the score at 100 for pathological volume (Review Focus: overflow)", () => {
    const s = scoreScan(result([v("critical", 100000)]));
    expect(s.score).toBe(100);
    expect(Number.isNaN(s.score)).toBe(false);
    expect(s.band).toBe("severe");
  });

  it("bands mid-range serious issues as high", () => {
    const s = scoreScan(result([v("serious", 5)]));
    expect(s.score).toBeGreaterThanOrEqual(30);
    expect(s.band).toBe("high");
  });
});
