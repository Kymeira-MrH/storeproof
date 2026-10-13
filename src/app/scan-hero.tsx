"use client";

import { useState, type FormEvent } from "react";
import { ReportView } from "./report-view";
import type { RiskScore } from "@/lib/scoring/risk-score";

export function ScanHero() {
  const [url, setUrl] = useState("https://your-store.com");
  const [score, setScore] = useState<RiskScore | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onScan(e: FormEvent) {
    e.preventDefault();
    setError("");
    setScore(null);
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json()) as { score?: RiskScore; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Scan failed.");
        return;
      }
      if (data.score) setScore(data.score);
    } catch {
      setError("Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="intake">
      <div className="stamp">Received</div>
      <span className="cap">Exhibit A — scan your store, free</span>
      <form className="field" onSubmit={onScan}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Your store URL"
          autoComplete="url"
          inputMode="url"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Scanning…" : "Scan"}
        </button>
      </form>
      <p className="micro">
        One page, a real WCAG 2.2 AA scan. A clean automated scan is not full compliance, and
        we will say so plainly.
      </p>
      {error ? (
        <p className="micro err" role="alert">
          {error}
        </p>
      ) : null}
      {score ? <ReportView url={url} score={score} /> : null}
    </div>
  );
}
