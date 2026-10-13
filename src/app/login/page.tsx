"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { SiteFooter } from "../site-footer";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else window.location.href = "/dashboard";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) setError(error.message);
        else setNotice("Account created — check your inbox to confirm your email, then sign in.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="dash-top">
        <div className="dash-top-inner">
          <a href="/" className="dash-brand">
            STOREPROOF
          </a>
          <nav className="dash-nav">
            <a href="/#how">How it works</a>
            <a href="/#pricing">Pricing</a>
          </nav>
          <div className="dash-account">
            <a className="dash-signout" href="/#scan">
              Scan my store
            </a>
          </div>
        </div>
      </header>
      <main>
      <section className="block">
        <div className="w" style={{ maxWidth: "520px" }}>
          <div className="head">
            <span className="eyebrow">StoreProof account</span>
            <h2>{mode === "signin" ? "Sign in" : "Create your account"}</h2>
          </div>

          {notice ? <p>{notice}</p> : null}

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
            <input
              className="gate-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
            <div style={{ marginTop: "14px" }}>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </div>
            {error ? (
              <p className="micro err" role="alert">
                {error}
              </p>
            ) : null}
          </form>

          <p className="micro" style={{ marginTop: "18px" }}>
            {mode === "signin" ? (
              <>
                No account yet?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signup");
                    setError("");
                    setNotice("");
                  }}
                >
                  Create one
                </a>{" "}
                — we&rsquo;ll email a confirmation link once.
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signin");
                    setError("");
                    setNotice("");
                  }}
                >
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
