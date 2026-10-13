import type { RateLimiter } from "./types";
import { MemoryRateLimiter } from "./memory";
import { UpstashRateLimiter } from "./upstash";

// A scan launches a headless browser, so it is expensive: cap per IP.
const SCAN_LIMIT = 5;
const SCAN_WINDOW_SECONDS = 3600; // 5 scans per hour per IP

let cached: RateLimiter | null = null;

export function createRateLimiter(): RateLimiter {
  if (cached) return cached;
  cached =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
      ? new UpstashRateLimiter(SCAN_LIMIT, SCAN_WINDOW_SECONDS)
      : new MemoryRateLimiter(SCAN_LIMIT, SCAN_WINDOW_SECONDS * 1000);
  return cached;
}
