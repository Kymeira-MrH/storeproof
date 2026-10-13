import type { Scanner, ScanResult } from "./scanner/types";
import { assertPublicUrl } from "./scanner/url-guard";
import { scoreScan, type RiskScore } from "./scoring/risk-score";

export async function runScan(
  scanner: Scanner,
  url: string,
): Promise<{ result: ScanResult; score: RiskScore }> {
  const pinnedIp = await assertPublicUrl(url);
  const result = await scanner.scan(url, pinnedIp);
  return { result, score: scoreScan(result) };
}
