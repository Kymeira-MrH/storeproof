"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
import { SiteFooter } from "../site-footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // null = still verifying the reset link, false = no valid session, true = ready.
  const [ready, setReady] = useState<boolean | null>(null);

  // Establish the recovery session from whatever the email link delivered
  // (a PKCE `code` in the query, or tokens in the URL hash).
  useEffect(() => {
    const supabase = createClient();
    (async () => {
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
          window.history.replaceState({}, "", "/reset-password");
        }
      } catch {
        // fall through to the session check below
      }
      const { data } = await supabase.auth.getSession();
      setReady(Boolean(data.session));
    })();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
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
      <MarketingNav />
      <main>
        <PhotoHero
          image="/img/counter.jpg"
          alt="A shopkeeper at the counter of their store"
          kicker="Account"
          title={<>Choose a new <em>password.</em></>}
          lede="Set a new password for your StoreProof account."
        />
        <section className="block">
          <div className="w" style={{ maxWidth: "520px" }}>
            <div className="head">
              <span className="eyebrow">StoreProof account</span>
              <h2>Set a new password</h2>
            </div>

            {ready === null ? (
              <p className="micro">Verifying your reset link…</p>
            ) : ready === false ? (
              <p>
                This reset link has expired or already been used.{" "}
                <a href="/forgot-password" style={{ color: "var(--green-d)" }}>
                  Request a new one
                </a>
                .
              </p>
            ) : done ? (
              <p>Password updated. Taking you to your dashboard…</p>
            ) : (
              <form onSubmit={onSubmit}>
                <label
                  htmlFor="new-password"
                  style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}
                >
                  New password
                </label>
                <input
                  id="new-password"
                  className="gate-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  aria-label="New password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  style={{ marginTop: 0 }}
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
