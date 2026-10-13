"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RescanButton({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function rescan() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/stores/${storeId}/scan`, { method: "POST" });
      if (!res.ok) {
        const d = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(d?.error ?? "Scan failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Scan failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="btn" type="button" onClick={rescan} disabled={loading}>
        {loading ? "Scanning…" : "Re-scan now"}
      </button>
      {error ? (
        <span className="micro err" role="alert">
          {error}
        </span>
      ) : null}
    </>
  );
}
