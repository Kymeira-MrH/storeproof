"use client";

import { useState, type FormEvent } from "react";
import { ReportView } from "./report-view";
import type { ExposureBand, RiskScore } from "@/lib/scoring/risk-score";

const BANDS: ExposureBand[] = ["low", "elevated", "high", "severe"];

function isRiskScore(x: unknown): x is RiskScore {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  return (
    typeof s.band === "string" &&
    (BANDS as string[]).includes(s.band) &&
    Number.isFinite(s.score) &&
    Number.isFinite(s.totalViolations) &&
    Number.isFinite(s.criticalCount) &&
    Number.isFinite(s.seriousCount) &&
    Number.isFinite(s.affectedElements)
  );
}

export function ScanHero() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [score, setScore] = useState<RiskScore | null>(null);
  const [scannedUrl, setScannedUrl] = useState("");
  const [statement, setStatement] = useState("");
  const [emailed, setEmailed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [needsReview, setNeedsReview] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onScan(e: FormEvent) {
    e.preventDefault();
    setError("");
    setScore(null);
    setStatement("");
    setEmailed(false);
    setLocked(false);
    setNeedsReview(0);
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, url }),
      });
      const data = (await res.json().catch(() => null)) as
        | {
            score?: unknown;
            statement?: unknown;
            emailed?: unknown;
            error?: unknown;
            storefrontLocked?: unknown;
            incomplete?: unknown;
          }
        | null;
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "Scan failed.");
        return;
      }
      if (data && isRiskScore(data.score)) {
        setScore(data.score);
        setScannedUrl(url);
        setEmailed(data.emailed === true);
        setLocked(data.storefrontLocked === true);
        setNeedsReview(typeof data.incomplete === "number" ? data.incomplete : 0);
        if (typeof data.statement === "string") setStatement(data.statement);
      } else {
        setError("Unexpected response from the scanner. Please try again.");
      }
    } catch {
      setError("Scan failed. Please check the details and try again.");
    } finally {
      setLoading(false);
    }
  }

  function downloadStatement() {
    const blob = new Blob([statement], { type: "text/markdown" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "accessibility-statement.md";
    a.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="intake">
      <div className="stamp">Received</div>
      <span className="cap">Exhibit A — sign up, then scan free</span>
      <form onSubmit={onScan}>
        <input
          className="gate-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@your-store.com"
          aria-label="Your work email"
          autoComplete="email"
          required
        />
        <div className="field">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-store.com"
            aria-label="Your store URL"
            autoComplete="url"
            inputMode="url"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Scanning…" : "Scan"}
          </button>
        </div>
      </form>
      <p className="micro">
        One page, a real WCAG 2.2 AA scan. A clean automated scan is not full compliance, and we
        will say so plainly.
      </p>
      {error ? (
        <p className="micro err" role="alert">
          {error}
        </p>
      ) : null}
      {score ? (
        <ReportView url={scannedUrl} score={score} locked={locked} needsReview={needsReview} />
      ) : null}
      {emailed ? <p className="micro">A copy has been emailed to {email}.</p> : null}
      {statement ? (
        <details className="stmt">
          <summary>Draft EAA accessibility statement</summary>
          <pre>{statement}</pre>
          <button type="button" className="dl" onClick={downloadStatement}>
            Download draft (.md)
          </button>
        </details>
      ) : null}
    </div>
  );
}
