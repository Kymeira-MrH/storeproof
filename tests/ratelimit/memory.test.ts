import { describe, it, expect } from "vitest";
import { MemoryRateLimiter } from "@/lib/ratelimit/memory";

describe("MemoryRateLimiter", () => {
  it("allows up to the limit then denies within the window", async () => {
    const rl = new MemoryRateLimiter(2, 60_000);
    expect((await rl.check("ip")).allowed).toBe(true);
    expect((await rl.check("ip")).allowed).toBe(true);
    const third = await rl.check("ip");
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
    expect(third.resetSeconds).toBeGreaterThan(0);
  });

  it("tracks keys (IPs) independently", async () => {
    const rl = new MemoryRateLimiter(1, 60_000);
    expect((await rl.check("a")).allowed).toBe(true);
    expect((await rl.check("b")).allowed).toBe(true);
    expect((await rl.check("a")).allowed).toBe(false);
  });
});
