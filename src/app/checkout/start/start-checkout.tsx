"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function StartCheckout() {
  const params = useSearchParams();
  const tier = params.get("plan") === "fix" ? "fix" : "monitoring";
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = `/login?plan=${tier}&mode=signup`;
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
        setError(data?.error ?? "We couldn't open checkout. Please try again from your dashboard.");
      } catch {
        setError("We couldn't reach checkout. Please try again from your dashboard.");
      }
    })();
  }, [tier]);

  const planLabel = tier === "fix" ? "Fix & Watch — £49/month" : "Monitoring — £29/month";

  if (error) {
    return (
      <div className="head">
        <span className="eyebrow">Almost there</span>
        <h2>We couldn&rsquo;t open checkout</h2>
        <p className="micro err" role="alert">
          {error}
        </p>
        <p style={{ marginTop: "14px" }}>
          <a className="btn" href="/dashboard">
            Go to your dashboard
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="head">
      <span className="eyebrow">StoreProof</span>
      <h2>Opening secure checkout…</h2>
      <p>
        Taking you to Stripe to start <b>{planLabel}</b>. This only takes a moment.
      </p>
    </div>
  );
}
