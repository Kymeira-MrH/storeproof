import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { scanAndPersist } from "@/lib/scans/persist";
import { sendRegressionAlert, type Regression } from "@/lib/email/send-alert";

export const maxDuration = 300;

// Band severity order for regression detection.
const ORDER: Record<string, number> = { low: 0, elevated: 1, high: 2, severe: 3 };

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: subs } = await admin
    .from("subscriptions")
    .select("account_id, status")
    .in("status", ["active", "trialing"]);
  const accountIds = [...new Set((subs ?? []).map((s) => s.account_id as string))];
  if (accountIds.length === 0) return NextResponse.json({ ok: true, scanned: 0 });

  let scanned = 0;
  let regressions = 0;
  let alerts = 0;

  for (const accountId of accountIds) {
    const { data: userRes } = await admin.auth.admin.getUserById(accountId);
    const email = userRes?.user?.email ?? null;

    const { data: stores } = await admin
      .from("stores")
      .select("id, url")
      .eq("account_id", accountId);

    const worse: Regression[] = [];
    for (const store of (stores ?? []) as Array<{ id: string; url: string }>) {
      const { data: prev } = await admin
        .from("scans")
        .select("band")
        .eq("store_id", store.id)
        .order("scanned_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const prevBand = (prev?.band as string | undefined) ?? null;

      try {
        const { band } = await scanAndPersist({
          accountId,
          storeId: store.id,
          url: store.url,
          contactEmail: email ?? "info@vpnetworks.co.uk",
        });
        scanned++;
        if (prevBand && (ORDER[band] ?? 0) > (ORDER[prevBand] ?? 0)) {
          worse.push({ url: store.url, from: prevBand, to: band });
          regressions++;
        }
      } catch {
        // skip a store that fails to scan this cycle; next run retries
      }
    }

    if (email && worse.length > 0) {
      const sent = await sendRegressionAlert(email, worse);
      if (sent) alerts++;
    }
  }

  return NextResponse.json({ ok: true, scanned, regressions, alerts });
}
