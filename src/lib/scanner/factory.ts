import type { Scanner } from "./types";
import { AxeScanner } from "./axe-scanner";

// Single place that decides which Scanner the app uses. Today: the real axe scanner.
// Future: branch here to a hosted-browser implementation with zero changes elsewhere.
export function createScanner(): Scanner {
  return new AxeScanner();
}
