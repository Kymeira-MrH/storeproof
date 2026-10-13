"use client";

import { useState } from "react";

export function Billing({ status }: { status: string }) {
  const active = status === "active" || status === "trialing";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go(path: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(path, { method: "POST" });
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError(data?.error ?? "Billing is unavailable right now.");
    } catch {
      setError("Billing is unavailable right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
      {active ? (
        <>
          <span className="chip">Monitoring active</span>
          <button className="btn" type="button" onClick={() => go("/api/stripe/portal")} disabled={loading}>
            Manage billing
          </button>
        </>
      ) : (
        <button className="btn" type="button" onClick={() => go("/api/stripe/checkout")} disabled={loading}>
          {loading ? "Opening…" : "Subscribe — £29/mo monitoring"}
        </button>
      )}
      {error ? (
        <span className="micro err" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
