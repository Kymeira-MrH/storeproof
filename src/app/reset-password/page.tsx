"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { AuthHeader } from "../auth-header";
import { SiteFooter } from "../site-footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(
          error.message.includes("session")
            ? "This reset link has expired. Request a new one from the forgot-password page."
            : error.message,
        );
      } else {
        setDone(true);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthHeader />
      <main>
        <section className="block">
          <div className="w" style={{ maxWidth: "520px" }}>
            <div className="head">
              <span className="eyebrow">StoreProof account</span>
              <h2>Set a new password</h2>
            </div>

            {done ? (
              <p>Password updated. Taking you to your dashboard…</p>
            ) : (
              <form onSubmit={onSubmit}>
                <input
                  className="gate-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  aria-label="New password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <div style={{ marginTop: "14px" }}>
                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Saving…" : "Save new password"}
                  </button>
                </div>
                {error ? (
                  <p className="micro err" role="alert">
                    {error}
                  </p>
                ) : null}
              </form>
            )}

            <p className="micro" style={{ marginTop: "18px" }}>
              <a href="/login">Back to sign in</a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
