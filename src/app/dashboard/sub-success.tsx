"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/consent";

// Shows a brief confirmation banner when Stripe (or a plan change) redirects back
// to /dashboard?sub=… , fires the funnel event once, then cleans the query string
// so a refresh doesn't repeat it.
export function SubSuccess() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sub = params.get("sub");
    if (!sub) return;

    if (sub === "success") {
      trackEvent("subscription_active", { kind: sub });
      setMsg("You're all set — your subscription is active.");
    } else if (sub === "upgraded") {
      trackEvent("subscription_active", { kind: sub });
      setMsg("Upgraded to Fix & Watch. The difference was charged pro-rata and it's active now.");
    } else if (sub === "downgrade_scheduled") {
      const on = params.get("on");
      const when = on
        ? new Date(parseInt(on, 10) * 1000).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : null;
      setMsg(
        when
          ? `Done — you'll move to Monitoring on ${when}. You keep Fix & Watch until then, and you won't be charged the difference.`
          : "Done — you'll move to Monitoring at the end of your current billing period. You keep Fix & Watch until then.",
      );
    } else {
      return;
    }

    params.delete("sub");
    params.delete("on");
    const qs = params.toString();
    window.history.replaceState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, []);

  if (!msg) return null;

  return (
    <div className="sub-banner" role="status">
      <span>{msg}</span>
      <button type="button" aria-label="Dismiss" onClick={() => setMsg(null)}>
        ×
      </button>
    </div>
  );
}
