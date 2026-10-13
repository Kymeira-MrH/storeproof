import type { Scanner } from "./types";
import { AxeScanner } from "./axe-scanner";

// Single place that decides which Scanner the app uses. Today: the real axe scanner.
// Future: swap to a hosted-browser implementation here with zero changes elsewhere.
export function scannerFromEnv(): Scanner {
  return new AxeScanner();
}
