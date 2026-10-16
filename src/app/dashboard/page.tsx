import { createClient } from "@/lib/supabase/server";
import { AddStore } from "./add-store";
import { Billing } from "./billing";
import { SubSuccess } from "./sub-success";

export const dynamic = "force-dynamic";

const BAND_LABEL: Record<string, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};
const BAND_CLASS: Record<string, string> = { low: "low", elevated: "ele", high: "hi", severe: "sev" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: stores } = await supabase
    .from("stores")
    .select("id, url, created_at")
    .order("created_at", { ascending: false });
  const { data: scans } = await supabase
    .from("scans")
    .select("store_id, band, scanned_at")
    .order("scanned_at", { ascending: false });
  const { data: subRow } = await supabase
    .from("subscriptions")
    .select("status, tier")
    .maybeSingle();

  const latest = new Map<string, { band: string; scanned_at: string }>();
  for (const s of (scans ?? []) as Array<{ store_id: string; band: string; scanned_at: string }>) {
    if (!latest.has(s.store_id)) latest.set(s.store_id, { band: s.band, scanned_at: s.scanned_at });
  }
  const subStatus = (subRow?.status as string | undefined) ?? "none";
  const subTier = (subRow?.tier as string | undefined) ?? "";
  const storeList = (stores ?? []) as Array<{ id: string; url: string; created_at: string }>;

  return (
    <>
      <SubSuccess />
      <h1 className="dash-h1">Your stores</h1>
      <p className="dash-sub">
        Scan, monitor and document accessibility compliance — and keep the evidence your lawyer
        needs on hand.
      </p>

      <div style={{ marginTop: "22px" }}>
        <Billing status={subStatus} tier={subTier} />
      </div>

      <div className="section-label">Add a store</div>
      <div className="add-panel" style={{ marginTop: "12px" }}>
        <AddStore />
      </div>

      {storeList.length > 0 ? (
        <div className="store-grid">
          {storeList.map((s) => {
            const l = latest.get(s.id);
            return (
              <a className="store-card" href={`/dashboard/stores/${s.id}`} key={s.id}>
                <span className={l ? `band-pill ${BAND_CLASS[l.band] ?? ""}` : "band-pill"}>
                  {l ? BAND_LABEL[l.band] ?? l.band : "Not scanned"}
                </span>
                <div className="url">{s.url}</div>
                <div className="meta">
                  {l ? `Last scan ${new Date(l.scanned_at).toLocaleDateString()}` : "Scan pending"}
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="add-panel" style={{ marginTop: "24px" }}>
          <div className="section-label" style={{ marginTop: 0 }}>
            Getting started
          </div>
          <p className="dash-sub" style={{ marginTop: "8px" }}>
            Add your store above to run its first scan. Here&rsquo;s the flow:
          </p>
          <ol className="connect-steps" style={{ marginTop: "12px" }}>
            <li>
              <b>Add &amp; scan</b> your store URL — you&rsquo;ll get an exposure band and a
              plain-English issue list in under a minute.
            </li>
            <li>
              <b>Connect Shopify</b> on the store&rsquo;s page so we can write alt-text fixes back to
              your products.
            </li>
            <li>
              <b>Subscribe</b> to keep it monitored and your evidence pack current.
            </li>
          </ol>
        </div>
      )}
    </>
  );
}
