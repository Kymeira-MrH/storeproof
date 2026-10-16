"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/consent";

// Fires the subscription_active funnel event once when Stripe redirects back to
// /dashboard?sub=success (new sub) or ?sub=upgraded (plan change), then cleans
// the query string so a refresh doesn't double-count.
export function SubSuccess() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const params = new URLSearchParams(window.location.search);
    const sub = params.get("sub");
    if (sub === "success" || sub === "upgraded") {
      done.current = true;
      trackEvent("subscription_active", { kind: sub });
      params.delete("sub");
      const qs = params.toString();
      window.history.replaceState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));
    }
  }, []);

  return null;
}
