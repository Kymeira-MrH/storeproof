import type { RateLimiter } from "./types";
import { MemoryRateLimiter } from "./memory";
import { UpstashRateLimiter } from "./upstash";

// A scan launches a headless browser, so it is expensive: cap per IP.
const SCAN_LIMIT = 5;
const SCAN_WINDOW_SECONDS = 3600; // 5 scans per hour per IP

// A fix run calls Claude + Shopify per image, so it is costly: cap per user.
const FIX_LIMIT = 6;
const FIX_WINDOW_SECONDS = 3600; // 6 fix runs per hour per user

let cached: RateLimiter | null = null;
let cachedFix: RateLimiter | null = null;

function build(limit: number, windowSeconds: number): RateLimiter {
  return process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new UpstashRateLimiter(limit, windowSeconds)
    : new MemoryRateLimiter(limit, windowSeconds * 1000);
}

export function createRateLimiter(): RateLimiter {
  if (!cached) cached = build(SCAN_LIMIT, SCAN_WINDOW_SECONDS);
  return cached;
}

export function createFixRateLimiter(): RateLimiter {
  if (!cachedFix) cachedFix = build(FIX_LIMIT, FIX_WINDOW_SECONDS);
  return cachedFix;
}
