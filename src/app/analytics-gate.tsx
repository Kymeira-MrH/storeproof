"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getConsent, CONSENT_EVENT } from "@/lib/consent";

// Only mounts Vercel Analytics once the visitor has accepted analytics cookies.
// Re-checks when the consent banner fires its change event, so acceptance takes
// effect immediately without a reload.
export function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getConsent() === "all");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return allowed ? <Analytics /> : null;
}
