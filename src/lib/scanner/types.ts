export type Impact = "minor" | "moderate" | "serious" | "critical";

export interface Violation {
  id: string; // axe rule id, e.g. "image-alt"
  impact: Impact;
  wcagCriteria: string[]; // axe tags beginning with "wcag"
  nodes: number; // count of affected elements
  help: string; // human-readable description
  helpUrl: string;
}

export interface ScanResult {
  url: string;
  scannedAt: string; // ISO timestamp
  violations: Violation[];
  passes: number;
  incomplete: number; // "needs review" count
}

export interface Scanner {
  // pinnedIp (when provided) is the pre-validated public IP of url's host, so the
  // implementation can pin DNS at connection time and resist rebinding.
  scan(url: string, pinnedIp?: string): Promise<ScanResult>;
}
