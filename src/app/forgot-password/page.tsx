"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { AuthHeader } from "../auth-header";
import { SiteFooter } from "../site-footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) setError(error.message);
      else setSent(true);
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
              <h2>Reset your password</h2>
            </div>

            {sent ? (
              <p>
                If an account exists for <b>{email}</b>, we&rsquo;ve sent a reset link. Check your
                inbox (and spam), then follow the link to set a new password.
              </p>
            ) : (
              <form onSubmit={onSubmit}>
                <input
                  className="gate-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@your-store.com"
                  aria-label="Email"
                  autoComplete="email"
                  required
                />
                <div style={{ marginTop: "14px" }}>
                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Send reset link"}
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
