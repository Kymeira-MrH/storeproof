"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/browser";
import { trackEvent } from "@/lib/consent";
import { AuthHeader } from "../auth-header";
import { SiteFooter } from "../site-footer";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // A chosen plan carried over from the pricing page. When present, the flow is
  // always: choose plan → create account → straight into Stripe checkout.
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get("plan");
    if (p === "fix" || p === "monitoring") setPlan(p);
    if (q.get("mode") === "signup") setMode("signup");
    if (q.get("error") === "auth") setError("That link has expired. Please sign in to continue.");
  }, []);

  // Where to send the visitor once they're authenticated.
  const afterAuth = () => (plan ? `/checkout/start?plan=${plan}` : "/dashboard");

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
        else window.location.href = afterAuth();
      } else {
        // Carry the plan into the confirmation link so the visitor lands back on
        // checkout after confirming, if email confirmation is required.
        const redirect = plan
          ? `${window.location.origin}/auth/callback?plan=${plan}`
          : `${window.location.origin}/auth/callback`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirect },
        });
        if (error) {
          setError(error.message);
        } else if (data.session) {
          // Email confirmation is off — we have a session already, go straight on.
          trackEvent("account_created", { plan: plan || "none" });
          window.location.href = afterAuth();
        } else if (plan) {
          trackEvent("account_created", { plan });
          setNotice(
            "Account created — check your inbox to confirm your email. The confirmation link brings you straight to checkout.",
          );
        } else {
          trackEvent("account_created", { plan: "none" });
          setNotice("Account created — check your inbox to confirm your email, then sign in.");
        }
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
            <h2>{mode === "signin" ? "Sign in" : "Create your account"}</h2>
            {plan ? (
              <p>
                You&rsquo;re signing up for{" "}
                <b>{plan === "fix" ? "Fix & Watch — £49/month" : "Monitoring — £29/month"}</b>. Create
                your account and we&rsquo;ll take you straight to secure checkout.
              </p>
            ) : null}
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

          {mode === "signin" ? (
            <p className="micro" style={{ marginTop: "6px" }}>
              <a href="/forgot-password">Forgot your password?</a>
            </p>
          ) : null}
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
