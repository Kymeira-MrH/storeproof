import { describe, it, expect } from "vitest";
import { generateEaaStatement } from "@/lib/statement/eaa-statement";
import { scoreScan } from "@/lib/scoring/risk-score";
import type { ScanResult } from "@/lib/scanner/types";

const merchant = { legalName: "Acme Ltd", contactEmail: "help@acme.test", storeUrl: "https://acme.test" };

describe("generateEaaStatement", () => {
  it("lists known non-conformances when violations exist", () => {
    const result: ScanResult = {
      url: "https://acme.test",
      scannedAt: "2026-10-13T00:00:00.000Z",
      passes: 0,
      incomplete: 0,
      violations: [
        { id: "image-alt", impact: "critical", wcagCriteria: ["wcag111"], nodes: 3, help: "Images must have alt text", helpUrl: "https://x" },
      ],
    };
    const text = generateEaaStatement(merchant, result, scoreScan(result), "2026-10-13");
    expect(text).toContain("partially conformant");
    expect(text).toContain("Images must have alt text");
    expect(text).toContain("EN 301 549");
    expect(text).toContain("help@acme.test");
  });

  it("marks a clean site fully conformant but keeps the automated-scan caveat (Review Focus)", () => {
    const result: ScanResult = {
      url: "https://acme.test",
      scannedAt: "2026-10-13T00:00:00.000Z",
      passes: 20,
      incomplete: 0,
      violations: [],
    };
    const text = generateEaaStatement(merchant, result, scoreScan(result), "2026-10-13");
    expect(text).toContain("fully conformant");
    expect(text).toContain("does not establish full WCAG conformance");
  });
});
