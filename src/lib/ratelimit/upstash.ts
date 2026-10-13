import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { RateLimiter, RateLimitResult } from "./types";

// Shared sliding-window limiter across all serverless instances.
// Requires UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
export class UpstashRateLimiter implements RateLimiter {
  private readonly rl: Ratelimit;
  constructor(limit: number, windowSeconds: number) {
    this.rl = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: "storeproof:scan",
      analytics: false,
    });
  }

  async check(key: string): Promise<RateLimitResult> {
    const r = await this.rl.limit(key);
    return {
      allowed: r.success,
      remaining: r.remaining,
      resetSeconds: Math.max(1, Math.ceil((r.reset - Date.now()) / 1000)),
    };
  }
}
