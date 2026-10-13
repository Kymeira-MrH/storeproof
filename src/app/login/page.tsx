"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
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
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setError(error.message);
      else setSent(true);
    } catch {
      setError("Sign-in is not available yet. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="block">
        <div className="w" style={{ maxWidth: "520px" }}>
          <div className="head">
            <span className="eyebrow">StoreProof account</span>
            <h2>Sign in</h2>
          </div>
          {sent ? (
            <p>Check your inbox — we&rsquo;ve emailed you a secure sign-in link.</p>
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
                  {loading ? "Sending…" : "Email me a sign-in link"}
                </button>
              </div>
              {error ? (
                <p className="micro err" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
