import { describe, it, expect } from "vitest";
import { MemoryLeadStore } from "@/lib/leads/memory-lead-store";

describe("MemoryLeadStore", () => {
  it("saves and returns leads", async () => {
    const store = new MemoryLeadStore();
    await store.save({ email: "a@b.co", storeUrl: "https://a.test", createdAt: "2026-10-13T00:00:00.000Z" });
    const all = await store.all();
    expect(all).toHaveLength(1);
    expect(all[0].email).toBe("a@b.co");
    expect(all[0].storeUrl).toBe("https://a.test");
  });
});
