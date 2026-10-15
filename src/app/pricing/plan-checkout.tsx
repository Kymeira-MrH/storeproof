"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

// Pricing CTA: if signed in, start Stripe checkout for the tier; if not, send to
// the free scan (the sign-up entry point) rather than a dead jump to the top.
export function PlanCheckout({ tier, label }: { tier: "fix" | "monitoring"; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // No account yet — send them to create one (account-first), carrying the
        // chosen plan so we can drop them back onto it.
        window.location.href = `/login?plan=${tier}`;
        return;
      }
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError(data?.error ?? "Couldn't start checkout. Please try again.");
    } catch {
      setError("Couldn't reach checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="go" type="button" onClick={go} disabled={loading}>
        {loading ? "Opening…" : label}
      </button>
      {error ? (
        <p className="micro err" role="alert" style={{ marginTop: "8px" }}>
          {error}
        </p>
      ) : null}
    </>
  );
}
