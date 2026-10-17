"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
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
      // Always show the same neutral confirmation — never surface rate limits or
      // reveal whether an account exists. Only a network failure is an error.
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setSent(true);
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
          image="/img/boutique.jpg"
          alt="Inside an independent boutique"
          kicker="Account"
          title={<>Reset your <em>password.</em></>}
          lede="Enter your email and we&rsquo;ll send a secure link to set a new password."
        />
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
                <label
                  htmlFor="reset-email"
                  style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}
                >
                  Your account email
                </label>
                <input
                  id="reset-email"
                  className="gate-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Your account email"
                  autoComplete="email"
                  required
                  style={{ marginTop: 0 }}
                />
                <p className="micro">
                  Enter the email you signed up with and we&rsquo;ll send you a reset link.
                </p>
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
