import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RescanButton } from "./rescan-button";
import { StatementDownload } from "./statement-download";
import { ShopifyPanel } from "./shopify-panel";
import { DeleteStore } from "./delete-store";
import { isAutoFixable, fixAction } from "@/lib/remediation/auto-fixable";
import { fixGuidance } from "@/lib/remediation/fix-guidance";

export const dynamic = "force-dynamic";

const BAND_LABEL: Record<string, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};
const BAND_CLASS: Record<string, string> = { low: "low", elevated: "ele", high: "hi", severe: "sev" };
const ORDER = ["low", "elevated", "high", "severe"] as const;
const IMPACT_ORDER: Record<string, number> = { critical: 0, serious: 1, moderate: 2, minor: 3 };

interface Violation {
  id: string;
  impact: string;
  wcagCriteria: string[];
  nodes: number;
  help: string;
  helpUrl: string;
}
interface ScanRow {
  id: string;
  band: string;
  score: number;
  total_violations: number;
  critical_count: number;
  serious_count: number;
  affected_elements: number;
  statement: string | null;
  violations: Violation[] | null;
  scanned_at: string;
}

export default async function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: store } = await supabase.from("stores").select("id, url").eq("id", id).single();
  if (!store) notFound();

  const { data: scansData } = await supabase
    .from("scans")
    .select(
      "id, band, score, total_violations, critical_count, serious_count, affected_elements, statement, violations, scanned_at",
    )
    .eq("store_id", id)
    .order("scanned_at", { ascending: false })
    .limit(24);
  const scans = (scansData ?? []) as ScanRow[];
  const latest = scans[0];
  const violations = [...((latest?.violations ?? []) as Violation[])].sort(
    (a, b) => (IMPACT_ORDER[a.impact] ?? 9) - (IMPACT_ORDER[b.impact] ?? 9),
  );
  const autoFix = violations.filter((v) => isAutoFixable(v.id));
  const review = violations.filter((v) => !isAutoFixable(v.id));

  const { data: conn } = await supabase
    .from("store_connections")
    .select("shop_domain, images_total, images_missing_alt")
    .eq("store_id", id)
    .maybeSingle();
  const { data: fixesData } = await supabase
    .from("store_fixes")
    .select("kind, target, detail, created_at")
    .eq("store_id", id)
    .order("created_at", { ascending: false })
    .limit(20);
  const fixes = (fixesData ?? []) as Array<{
    kind: string;
    target: string;
    detail: string | null;
    created_at: string;
  }>;

  return (
    <>
      <p className="crumb">
        <a href="/dashboard">&larr; Stores</a>
      </p>
      <h1 className="dash-h1" style={{ wordBreak: "break-all" }}>
        {store.url}
      </h1>

      {latest ? (
        <div style={{ marginTop: "14px" }}>
          <span className={`band-pill ${BAND_CLASS[latest.band] ?? ""}`}>
            {BAND_LABEL[latest.band] ?? latest.band} exposure
          </span>
        </div>
      ) : null}

      <div style={{ display: "flex", gap: "12px", marginTop: "18px", flexWrap: "wrap", alignItems: "center" }}>
        <RescanButton storeId={store.id} />
        {latest ? <StatementDownload statement={latest.statement ?? ""} /> : null}
      </div>

      {latest ? (
        <>
          <div className="bandbar big" role="img" aria-label={`Exposure: ${latest.band}`} style={{ marginTop: "22px" }}>
            {ORDER.map((b) => (
              <span key={b} className={b === latest.band ? `on ${BAND_CLASS[b]}` : ""}>
                {BAND_LABEL[b]}
              </span>
            ))}
          </div>

          <div className="statrow">
            <div className="stat">
              <div className="n">{latest.total_violations}</div>
              <div className="l">Automated issues</div>
            </div>
            <div className="stat">
              <div className="n">{latest.critical_count}</div>
              <div className="l">Critical</div>
            </div>
            <div className="stat">
              <div className="n">{latest.serious_count}</div>
              <div className="l">Serious</div>
            </div>
            <div className="stat">
              <div className="n">{latest.affected_elements}</div>
              <div className="l">Elements</div>
            </div>
          </div>

          <p className="micro" style={{ marginTop: "14px" }}>
            An automated scan does not establish full WCAG conformance. Issues needing human
            judgement are assessed during remediation, never faked. Last scan{" "}
            {new Date(latest.scanned_at).toLocaleString()}.
          </p>

          {violations.length > 0 ? (
            <>
              <p className="remsum">
                Of <b>{violations.length}</b> automated finding{violations.length === 1 ? "" : "s"},
                we fix <b>{autoFix.length}</b> for you automatically and flag <b>{review.length}</b>{" "}
                for human review.
              </p>

              {autoFix.length > 0 ? (
                <>
                  <div className="section-label" style={{ color: "#1f8a52" }}>
                    We fix these for you
                  </div>
                  <p className="remnote">
                    Handled automatically on the Fix &amp; Watch plan — written to your product data
                    and theme at the source. Nothing is marked done until it&rsquo;s actually done.
                  </p>
                  <ul className="issues fix">
                    {autoFix.map((v, i) => (
                      <li key={`f-${v.id}-${i}`}>
                        <span className="imp">auto-fix</span>
                        <div>
                          <div className="issue-help">{v.help}</div>
                          <div className="fixaction">↳ {fixAction(v.id)}</div>
                          <div className="issue-meta">
                            {v.nodes} element{v.nodes === 1 ? "" : "s"}
                            {v.wcagCriteria?.length ? ` · ${v.wcagCriteria.join(", ")}` : ""}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {review.length > 0 ? (
                <>
                  <div className="section-label">Flagged for human review — never faked</div>
                  <p className="remnote">
                    These need judgement a machine can&rsquo;t safely make. We surface them plainly
                    instead of pretending they&rsquo;re solved.
                  </p>
                  <ul className="issues review">
                    {review.map((v, i) => {
                      const g = fixGuidance(v.id);
                      return (
                        <li key={`r-${v.id}-${i}`}>
                          <span className={`imp imp-${v.impact}`}>{v.impact}</span>
                          <div>
                            <div className="issue-help">{v.help}</div>
                            <div className="issue-meta">
                              {v.nodes} element{v.nodes === 1 ? "" : "s"}
                              {v.wcagCriteria?.length ? ` · ${v.wcagCriteria.join(", ")}` : ""}
                            </div>
                            <details className="howfix">
                              <summary>How to fix</summary>
                              <p>{g.text}</p>
                              {g.bad || g.good ? (
                                <div className="ex">
                                  {g.bad ? (
                                    <div className="bad">
                                      <div className="lbl">✗ Before</div>
                                      <pre>{g.bad}</pre>
                                    </div>
                                  ) : null}
                                  {g.good ? (
                                    <div className="good">
                                      <div className="lbl">✓ After</div>
                                      <pre>{g.good}</pre>
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </details>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
            </>
          ) : (
            <p className="micro" style={{ marginTop: "14px" }}>
              No automated violations in the latest scan.
            </p>
          )}

          <div className="section-label">Scan history</div>
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
        <p className="dash-sub" style={{ marginTop: "16px" }}>
          No scans yet — hit Re-scan now.
        </p>
      )}

      <div className="section-label">Automated fixes</div>
      <p className="remnote">
        Connect your Shopify store and we write proper alt text to your product images at the
        source — generated by Claude vision, logged below, and easy to review. This is the Fix
        &amp; Watch work, done for real.
      </p>
      <ShopifyPanel
        storeId={store.id}
        connection={
          conn
            ? {
                shopDomain: conn.shop_domain as string,
                imagesTotal: conn.images_total as number | null,
                imagesMissingAlt: conn.images_missing_alt as number | null,
              }
            : null
        }
      />

      {fixes.length > 0 ? (
        <>
          <div className="section-label">Fix log</div>
          <ul className="issues fix">
            {fixes.map((f, i) => (
              <li key={`fx-${i}`}>
                <span className="imp">{f.kind}</span>
                <div>
                  <div className="issue-help">{f.detail}</div>
                  <div className="issue-meta">
                    {f.target} · {new Date(f.created_at).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="section-label" style={{ color: "var(--red)" }}>
        Danger zone
      </div>
      <p className="remnote">Permanently remove this store and everything we&rsquo;ve recorded for it.</p>
      <div style={{ marginTop: "12px" }}>
        <DeleteStore storeId={store.id} storeUrl={store.url} />
      </div>
    </>
  );
}
