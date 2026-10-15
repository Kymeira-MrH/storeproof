import type { ExposureBand, RiskScore } from "@/lib/scoring/risk-score";

const ORDER: ExposureBand[] = ["low", "elevated", "high", "severe"];
const CLASS: Record<ExposureBand, string> = { low: "low", elevated: "ele", high: "hi", severe: "sev" };
const LABEL: Record<ExposureBand, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};

export function ReportView({
  url,
  score,
  locked,
  needsReview,
}: {
  url: string;
  score: RiskScore;
  locked?: boolean;
  needsReview?: number;
}) {
  return (
    <div className="result show" aria-live="polite">
      {locked ? (
        <div className="notice" style={{ marginTop: 0, marginBottom: "14px" }}>
          <span aria-hidden="true">🔒</span>
          <div>
            <b>This store looks password-protected.</b> We reached a Shopify lock screen, not your
            storefront — so these results aren&rsquo;t your real store. A live public store scans
            fine; for a locked store, turn password protection off and scan again.
          </div>
        </div>
      ) : null}
      <div className="r-head">
        <span className="mono">Exposure for {url}</span>
        <b>{score.band.toUpperCase()}</b>
      </div>
      <div className="bandbar" role="img" aria-label={`Exposure band: ${LABEL[score.band]}`}>
        {ORDER.map((b) => (
          <span key={b} className={b === score.band ? `on ${CLASS[b]}` : ""}>
            {LABEL[b]}
          </span>
        ))}
      </div>
      <p className="r-list mono">
        {score.totalViolations} automated issues · {score.criticalCount} critical ·{" "}
        {score.seriousCount} serious · {score.affectedElements} elements
      </p>
      {needsReview && needsReview > 0 ? (
        <p className="micro">
          {needsReview} item{needsReview === 1 ? "" : "s"} also need{needsReview === 1 ? "s" : ""}{" "}
          manual review — we surface these with guidance, never auto-pass them.
        </p>
      ) : null}
      <p className="micro">
        An automated scan does not establish full WCAG conformance. Issues needing human
        judgement are flagged during remediation, never faked.
      </p>
    </div>
  );
}
