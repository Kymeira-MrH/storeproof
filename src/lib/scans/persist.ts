import { createAdminClient } from "@/lib/supabase/admin";
import { createScanner } from "@/lib/scanner/factory";
import { runScan } from "@/lib/scan-service";
import { generateEaaStatement } from "@/lib/statement/eaa-statement";

// Runs a scan for an owned store and persists the result (service role) into `scans`.
// Returns the band, or throws if the scan itself fails (caller decides how to surface it).
export async function scanAndPersist(opts: {
  accountId: string;
  storeId: string;
  url: string;
  contactEmail: string;
}): Promise<{ band: string }> {
  const { result, score } = await runScan(createScanner(), opts.url);
  const statement = generateEaaStatement(
    {
      legalName: "[Your registered business name]",
      contactEmail: opts.contactEmail,
      storeUrl: opts.url,
    },
    result,
    score,
    new Date().toISOString().slice(0, 10),
  );

  const admin = createAdminClient();
  const { error } = await admin.from("scans").insert({
    store_id: opts.storeId,
    account_id: opts.accountId,
    url: opts.url,
    band: score.band,
    score: score.score,
    total_violations: score.totalViolations,
    critical_count: score.criticalCount,
    serious_count: score.seriousCount,
    affected_elements: score.affectedElements,
    statement,
    violations: result.violations,
  });
  if (error) throw new Error(`failed to persist scan: ${error.message}`);
  return { band: score.band };
}
