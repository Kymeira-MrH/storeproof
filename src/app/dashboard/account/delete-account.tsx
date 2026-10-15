"use client";

import { useState } from "react";

export function DeleteAccount() {
  const [step, setStep] = useState(0); // 0 idle · 1 first confirm · 2 final confirm
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function doDelete() {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (!res.ok) {
        const d = (await res.json().catch(() => null)) as { error?: string } | null;
        setErr(d?.error ?? "Delete failed.");
        setBusy(false);
        return;
      }
      window.location.href = "/";
    } catch {
      setErr("Delete failed.");
      setBusy(false);
    }
  }

  if (step === 0) {
    return (
      <button className="btn-danger" type="button" onClick={() => setStep(1)}>
        Delete my account
      </button>
    );
  }

  return (
    <div className="danger-zone">
      {step === 1 ? (
        <>
          <p className="danger-msg">
            This permanently deletes your account and every store, scan and fix we hold, and cannot
            be undone.
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
            <b>Final confirmation.</b> This permanently deletes your account and every store, scan
            and fix we hold, and cannot be undone. Are you absolutely sure?
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
