import { describe, it, expect } from "vitest";
import { runScan } from "@/lib/scan-service";
import { FakeScanner } from "@/lib/scanner/fake-scanner";
import type { ScanResult, Scanner } from "@/lib/scanner/types";

// A public IP literal: passes the SSRF guard without a network DNS lookup.
const PUBLIC = "https://93.184.216.34";
const clean: ScanResult = {
  url: PUBLIC,
  scannedAt: "2026-10-13T00:00:00.000Z",
  violations: [],
  passes: 5,
  incomplete: 0,
};

describe("runScan", () => {
  it("returns result + score for a valid public url", async () => {
    const out = await runScan(new FakeScanner(clean), PUBLIC);
    expect(out.result.passes).toBe(5);
    expect(out.score.band).toBe("low");
  });

  it("rejects an SSRF target before scanning (Review Focus)", async () => {
    await expect(runScan(new FakeScanner(clean), "http://127.0.0.1")).rejects.toThrow("blocked-host");
  });

  it("rejects an invalid url (Review Focus)", async () => {
    await expect(runScan(new FakeScanner(clean), "not-a-url")).rejects.toThrow("invalid-url");
  });

  it("propagates a scanner failure for the route to map to 502 (Review Focus)", async () => {
    const throwing: Scanner = {
      scan: async () => {
        throw new Error("nav-failed");
      },
    };
    await expect(runScan(throwing, PUBLIC)).rejects.toThrow("nav-failed");
  });
});
