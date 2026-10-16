import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "shopify-accessibility-audit",
  metaTitle: "Shopify Accessibility Audit — WCAG 2.2 AA, Honestly Done",
  metaDescription:
    "What a proper Shopify accessibility audit actually covers: automated scanning plus human judgement, an exposure report, a prioritised issue list, a signed accessibility statement and an evidence pack — then ongoing monitoring.",
  eyebrow: "Shopify accessibility audit",
  h1: "What a proper Shopify accessibility audit covers",
  lede: "A real accessibility audit is more than a one-click scan. It combines automated testing with human judgement, tells you exactly where you're exposed, and leaves you with documentation you can actually stand behind — not a widget that hides the problem.",
  sections: [
    {
      h2: "Automated scanning, then human judgement",
      body: [
        "An honest Shopify accessibility audit starts with an automated scan of your storefront against the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA — the standard the European Accessibility Act and EN 301 549 point to. That scan reliably catches the machine-detectable issues: missing alt text, unlabelled form fields, buttons with no accessible name, colour contrast that fails AA, broken heading structure.",
        "But automated testing only reaches so far. Tools like this reliably detect roughly a third to a half of WCAG issues — the rest need a person. Can a keyboard user complete checkout? Does the focus order make sense? Is link text meaningful out of context? Does your alt text actually describe the product rather than just existing? A proper audit pairs the scan with human review so you see the whole picture, not just the half a machine can measure.",
      ],
      bullets: [
        "Automated pass across your key templates: home, collection, product, cart, checkout",
        "Human review of keyboard navigation and focus order",
        "A judgement call on whether alt text and link text are genuinely useful",
        "Form, error-handling and interactive-component checks a scanner can't fully verify",
      ],
    },
    {
      h2: "What you actually get: the deliverables",
      body: [
        "An audit should leave you with more than a score. StoreProof produces a set of deliverables you and your lawyer can use — covering what was fixed, what still needs attention, and the evidence behind both.",
      ],
      bullets: [
        "An exposure report: your risk band in plain English, with the issues that matter most first",
        "A prioritised issue list: every finding, where it is, and whether automation can fix it or a person must",
        "A signed accessibility statement that reflects your real conformance position — not a boilerplate claim",
        "An evidence pack documenting what was tested, what was changed and what remains, dated and defensible",
        "Ongoing monitoring that re-scans your store so a theme change or new product doesn't quietly reopen a problem",
      ],
    },
    {
      h2: "Fix at the source, flag the rest, document both",
      body: [
        "This is where StoreProof differs from an accessibility overlay. Overlays bolt a script onto your storefront that tries to patch things in the browser — courts have found they don't deliver conformance, and merchants using them have still been sued. We don't do that.",
        "We fix the automatable share properly, at the source: correct alt text written onto your product images, labels and names put right in your theme, the corrections automation can handle reliably. For everything that needs human judgement, we flag it clearly with guidance so it can be addressed — and we document both halves. You end up with a store that is genuinely more accessible and a paper trail that shows exactly what was done.",
      ],
    },
    {
      h2: "An audit is a moment; conformance is ongoing",
      body: [
        "A one-off audit captures your position on the day it runs. But Shopify stores change constantly — new products, theme updates, a swapped app, a seasonal homepage. Any of those can reintroduce the issues you just cleared.",
        "That's why the audit doesn't stop at the report. Monthly monitoring re-scans your store and alerts you when something regresses, so your accessibility statement keeps reflecting reality and your exposure doesn't creep back up without you noticing.",
      ],
    },
  ],
  faqs: [
    {
      q: "What's the difference between an accessibility scan and an accessibility audit?",
      a: "A scan is automated and catches the machine-detectable share of WCAG issues — a useful starting point but only a third to a half of the picture. An audit adds human judgement: keyboard testing, focus order, whether alt and link text are genuinely meaningful, and the interactive behaviour a scanner can't fully verify. A proper audit combines both.",
    },
    {
      q: "Does an audit make my Shopify store compliant?",
      a: "No single audit makes a store 'compliant' in a guaranteed sense, and anyone promising that is overselling. An audit fixes what can be fixed properly, flags what needs a person, and documents both so you have a defensible position. Conformance is also something you maintain over time, which is why monitoring is part of the picture.",
    },
    {
      q: "What documents do I get from the audit?",
      a: "An exposure report with your risk band, a prioritised issue list, a signed accessibility statement reflecting your real conformance position, and an evidence pack recording what was tested, changed and flagged. Ongoing monitoring keeps those accurate as your store changes.",
    },
    {
      q: "Is this an accessibility overlay?",
      a: "No — overlays are the thing we're better than. An overlay tries to patch problems in the browser with a script and leaves the underlying issues in place. We fix the automatable issues at the source, flag the rest for human attention, and document everything.",
    },
    {
      q: "How long does a Shopify accessibility audit take?",
      a: "The automated pass runs in minutes and shows your exposure band straight away. The human-reviewed findings and the full evidence pack follow, and source-level fixes are applied once you connect your store and ask for them. Monitoring then runs continuously in the background.",
    },
  ],
  ctaHeading: "See where your Shopify store really stands",
  ctaSub: "Start with a free WCAG 2.2 AA scan and exposure band. No sales call, no card.",
  related: [
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/how-it-works", label: "How StoreProof works" },
    { href: "/accessibility-overlay-alternative", label: "The honest alternative to overlays" },
    { href: "/proof", label: "The evidence pack explained" },
  ],
  keywords: [
    "Shopify accessibility audit",
    "Shopify WCAG audit",
    "Shopify accessibility assessment",
    "Shopify accessibility review",
    "WCAG 2.2 AA audit Shopify",
  ],
};
