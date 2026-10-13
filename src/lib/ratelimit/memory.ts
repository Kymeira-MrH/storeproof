import type { RateLimiter, RateLimitResult } from "./types";

// Fixed-window limiter. Per-instance (fine for local dev); production uses Upstash
// so the window is shared across all serverless instances.
export class MemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, { count: number; reset: number }>();
  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.hits.get(key);
    if (!entry || now >= entry.reset) {
      this.hits.set(key, { count: 1, reset: now + this.windowMs });
      return { allowed: true, remaining: this.limit - 1, resetSeconds: Math.ceil(this.windowMs / 1000) };
    }
    const resetSeconds = Math.max(1, Math.ceil((entry.reset - now) / 1000));
    if (entry.count >= this.limit) {
      return { allowed: false, remaining: 0, resetSeconds };
    }
    entry.count += 1;
    return { allowed: true, remaining: this.limit - entry.count, resetSeconds };
  }
}
