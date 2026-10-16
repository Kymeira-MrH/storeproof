"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

// First-visit cookie choice. Non-blocking (not a focus trap), keyboard
// accessible, and honest: essential cookies are always on, analytics is opt-in.
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setShow(true);
  }, []);

  function choose(choice: "all" | "essential") {
    setConsent(choice);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="consent" role="dialog" aria-label="Cookie choices" aria-live="polite">
      <div className="consent-in">
        <p className="consent-copy">
          We use essential cookies to keep you signed in, and privacy-friendly analytics only if you
          allow it. No ad trackers, ever.{" "}
          <a href="/privacy#cookies">How we use cookies</a>.
        </p>
        <div className="consent-btns">
          <button type="button" className="consent-ok" onClick={() => choose("all")}>
            Accept all
          </button>
          <button type="button" className="consent-min" onClick={() => choose("essential")}>
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
