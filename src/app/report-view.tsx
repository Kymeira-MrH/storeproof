import type { ExposureBand, RiskScore } from "@/lib/scoring/risk-score";

const ORDER: ExposureBand[] = ["low", "elevated", "high", "severe"];
const CLASS: Record<ExposureBand, string> = { low: "low", elevated: "ele", high: "hi", severe: "sev" };
const LABEL: Record<ExposureBand, string> = {
  low: "Low",
  elevated: "Elevated",
  high: "High",
  severe: "Severe",
};

export function ReportView({ url, score }: { url: string; score: RiskScore }) {
  return (
    <div className="result show" aria-live="polite">
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
      <p className="micro">
        An automated scan does not establish full WCAG conformance. Issues needing human
        judgement are flagged during remediation, never faked.
      </p>
    </div>
  );
}
