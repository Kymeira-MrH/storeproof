import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { RateLimiter, RateLimitResult } from "./types";

// Strip surrounding quotes/whitespace — a common copy-paste slip when pasting
// Upstash's .env snippet (which wraps values in double quotes) into a dashboard.
function cleanEnv(value: string | undefined): string {
  return (value ?? "").trim().replace(/^['"]+|['"]+$/g, "");
}

// Shared sliding-window limiter across all serverless instances.
// Requires UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
export class UpstashRateLimiter implements RateLimiter {
  private readonly rl: Ratelimit;
  constructor(limit: number, windowSeconds: number) {
    const url = cleanEnv(process.env.UPSTASH_REDIS_REST_URL);
    const token = cleanEnv(process.env.UPSTASH_REDIS_REST_TOKEN);
    this.rl = new Ratelimit({
      redis: new Redis({ url, token }),
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
