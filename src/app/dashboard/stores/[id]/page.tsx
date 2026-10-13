import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RescanButton } from "./rescan-button";
import { StatementDownload } from "./statement-download";

export const dynamic = "force-dynamic";

const BAND_LABEL: Record<string, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};

interface ScanRow {
  id: string;
  band: string;
  score: number;
  total_violations: number;
  critical_count: number;
  serious_count: number;
  affected_elements: number;
  statement: string | null;
  scanned_at: string;
}

export default async function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: store } = await supabase.from("stores").select("id, url").eq("id", id).single();
  if (!store) notFound();

  const { data: scansData } = await supabase
    .from("scans")
    .select("id, band, score, total_violations, critical_count, serious_count, affected_elements, statement, scanned_at")
    .eq("store_id", id)
    .order("scanned_at", { ascending: false })
    .limit(24);
  const scans = (scansData ?? []) as ScanRow[];
  const latest = scans[0];

  return (
    <main>
      <div className="mast">
        <div className="w">
          <span>STOREPROOF</span>
          <span>Store</span>
          <span>
            <a href="/dashboard" style={{ color: "inherit" }}>
              &larr; Dashboard
            </a>
          </span>
        </div>
      </div>
      <section className="block">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Store</span>
            <h2 style={{ wordBreak: "break-all" }}>{store.url}</h2>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <RescanButton storeId={store.id} />
            {latest ? <StatementDownload statement={latest.statement ?? ""} /> : null}
          </div>

          {latest ? (
            <>
              <p className="micro" style={{ marginTop: "16px" }}>
                Latest: <strong>{BAND_LABEL[latest.band] ?? latest.band}</strong> ·{" "}
                {latest.total_violations} issues · {latest.serious_count} serious ·{" "}
                {latest.critical_count} critical · {new Date(latest.scanned_at).toLocaleString()}
              </p>

              <h3 className="eyebrow" style={{ marginTop: "28px" }}>
                Scan history
              </h3>
              <ul className="checklist">
                {scans.map((s) => (
                  <li key={s.id}>
                    <span className="mono">{new Date(s.scanned_at).toLocaleDateString()}</span> ·{" "}
                    {BAND_LABEL[s.band] ?? s.band} · {s.total_violations} issues
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="micro" style={{ marginTop: "16px" }}>
              No scans yet — hit Re-scan now.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
