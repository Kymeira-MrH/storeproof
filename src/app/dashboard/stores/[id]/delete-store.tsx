"use client";

import { useState } from "react";

export function DeleteStore({ storeId, storeUrl }: { storeId: string; storeUrl: string }) {
  const [step, setStep] = useState(0); // 0 idle · 1 first confirm · 2 final confirm
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function doDelete() {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/stores/${storeId}`, { method: "DELETE" });
      if (!res.ok) {
        const d = (await res.json().catch(() => null)) as { error?: string } | null;
        setErr(d?.error ?? "Delete failed.");
        setBusy(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setErr("Delete failed.");
      setBusy(false);
    }
  }

  if (step === 0) {
    return (
      <button className="btn-danger" type="button" onClick={() => setStep(1)}>
        Delete this store
      </button>
    );
  }

  return (
    <div className="danger-zone">
      {step === 1 ? (
        <>
          <p className="danger-msg">
            Delete <b>{storeUrl}</b> and all of its scans, fixes and Shopify connection? This
            cannot be undone.
          </p>
          <div className="danger-actions">
            <button className="btn-ghost" type="button" onClick={() => setStep(0)}>
              Cancel
            </button>
            <button className="btn-danger" type="button" onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="danger-msg">
            <b>Final confirmation.</b> This permanently removes {storeUrl} and its address from your
            account. Are you absolutely sure?
          </p>
          <div className="danger-actions">
            <button className="btn-ghost" type="button" onClick={() => setStep(0)} disabled={busy}>
              Keep it
            </button>
            <button className="btn-danger" type="button" onClick={doDelete} disabled={busy}>
              {busy ? "Deleting…" : "Delete permanently"}
            </button>
          </div>
          {err ? (
            <p className="micro err" role="alert">
              {err}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
