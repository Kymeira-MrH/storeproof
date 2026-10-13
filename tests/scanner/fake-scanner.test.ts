import { describe, it, expect } from "vitest";
import { FakeScanner } from "@/lib/scanner/fake-scanner";
import type { ScanResult } from "@/lib/scanner/types";

const sample: ScanResult = {
  url: "https://example.com",
  scannedAt: "2026-10-13T00:00:00.000Z",
  violations: [],
  passes: 10,
  incomplete: 0,
};

describe("FakeScanner", () => {
  it("returns the canned result regardless of url", async () => {
    const result = await new FakeScanner(sample).scan("https://anything.test");
    expect(result).toEqual(sample);
  });
});
