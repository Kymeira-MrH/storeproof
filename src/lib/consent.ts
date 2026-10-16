"use client";

import { track } from "@vercel/analytics";

// Cookie/consent model. Essential cookies (Supabase auth) are always on because
// the app can't log you in without them — GDPR treats those as strictly
// necessary, no consent required. Everything else (privacy-friendly analytics)
// only runs after the visitor opts in.

export type Consent = "all" | "essential";

const KEY = "sp-consent";
export const CONSENT_EVENT = "sp-consent-change";

// Null = the visitor hasn't chosen yet (show the banner). On the server there's
// no localStorage, so we always return null and let the client decide.
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "all" || v === "essential" ? v : null;
}

export function setConsent(choice: Consent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, choice);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

// Fire a funnel event — but only if the visitor accepted analytics. This keeps
// us honest: no analytics event leaves the browser without consent.
export function trackEvent(name: string, props?: Record<string, string | number | boolean>): void {
  if (getConsent() !== "all") return;
  try {
    track(name, props);
  } catch {
    // Analytics must never break a user flow.
  }
}
