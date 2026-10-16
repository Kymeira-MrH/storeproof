import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "accessibility-demand-letter",
  metaTitle: "Received an Accessibility Demand Letter? What to Do",
  metaDescription:
    "Got an ADA accessibility demand letter about your Shopify store? Don't panic and don't buy an overlay. Document your current state, fix at the source, keep dated evidence. How StoreProof builds a defensible, timestamped record. General information, not legal advice.",
  eyebrow: "Accessibility demand letter",
  h1: "You've received an accessibility demand letter. Here's what to do.",
  lede: "An ADA or accessibility demand letter is alarming, but the worst moves are the panicked ones — rushing to buy an overlay, or quietly changing things with no record. Slow down, document where you stand today, remediate at the source, and keep dated evidence. This page explains the steps and how StoreProof helps build a defensible, timestamped record. It is general information, not legal advice.",
  sections: [
    {
      h2: "First: don't panic, and don't buy an overlay",
      body: [
        "A demand letter typically asserts that your store isn't accessible to disabled users and asks you to remediate — sometimes alongside a settlement demand. It is serious, but it is not a verdict. How you respond in the first days matters more than the letter itself.",
        "The reflex many merchants have is to install an accessibility overlay widget that promises instant compliance. Resist it. Overlays bolt a script onto your site to patch things in the browser, and they have faced sustained legal and regulatory criticism. Businesses running overlays have still received demand letters and still been sued — in some cases the overlay itself became part of the complaint. An overlay does not make a demand letter go away and does not guarantee a defence.",
      ],
      bullets: [
        "Don't ignore it — unanswered letters can escalate",
        "Don't buy an overlay in a panic; it can make things worse, not better",
        "Don't make silent, undocumented changes you can't later evidence",
        "Don't admit or deny specifics before you understand your actual state",
      ],
    },
    {
      h2: "Document your current state before you change anything",
      body: [
        "Before you touch the store, capture where it stands today. If you remediate first and record nothing, you lose the ability to show what you found and what you did about it — which is exactly the evidence that demonstrates good faith.",
        "Run a WCAG 2.2 AA scan and keep the dated results: the issues present, the exposure band, the pages checked. This becomes your baseline — a timestamped snapshot of your starting position. Pair it with an honest accessibility statement that reflects reality rather than one that overclaims, because an overclaim can be turned against you.",
      ],
    },
    {
      h2: "Remediate at the source, then keep dated evidence",
      body: [
        "Fix the real issues in the real code, not with a browser-side patch. StoreProof writes the safe, source-level corrections back to your store — proper alt text on product images and the fixes automation can handle reliably — then flags what needs human judgement. Be clear-eyed that automated tooling catches only around a third to a half of WCAG issues; the remainder needs a person, and a credible response accounts for both.",
        "Then keep the record. Every scan, fix and re-scan is timestamped, so you can show a dated trail: this was the state when the letter arrived, these are the source-level fixes we made, these are the issues flagged for human review, and here is the monitoring that catches regressions. That defensible, evidenced history — paired with proper legal advice — is far stronger than a widget that claims a fix it can't prove.",
      ],
      bullets: [
        "Source-level fixes, applied to the store itself — not an overlay",
        "A plain-English list of what was fixed and what was flagged",
        "Timestamped before-and-after scans as dated evidence",
        "Ongoing monitoring so a theme or product change can't quietly reopen a barrier",
      ],
    },
  ],
  faqs: [
    {
      q: "Will StoreProof make an accessibility demand letter go away?",
      a: "No, and be wary of anyone who says they can. No tool makes a letter disappear or guarantees a legal outcome. What StoreProof does is help you respond properly: document your current state, fix the automatable issues at the source, flag what needs a person, and keep dated evidence of all of it. Take that record to a qualified lawyer — this page is general information, not legal advice.",
    },
    {
      q: "Should I install an accessibility overlay to respond quickly?",
      a: "We'd strongly caution against it. Overlays have faced legal and regulatory criticism, businesses using them have still been sued, and the overlay has sometimes become part of the complaint. It does not guarantee a defence. Fixing issues at the source and keeping dated evidence is a far more defensible response.",
    },
    {
      q: "Does a clean automated scan prove I'm compliant?",
      a: "No. Automated scanning reliably catches only about a third to a half of WCAG issues — the machine-detectable ones. Full conformance also needs human testing. A clean scan is useful evidence of the automatable share, but it is not proof of compliance, and an honest response says so.",
    },
    {
      q: "Why does keeping timestamped evidence matter?",
      a: "Because it demonstrates what you knew and when, and what you did about it. A dated trail — baseline scan when the letter arrived, the source-level fixes made, the issues flagged for review, and ongoing monitoring — shows good-faith, active remediation rather than a last-minute patch. Your lawyer can use a clear, dated record far more readily than vague assurances.",
    },
    {
      q: "Is any of this legal advice?",
      a: "No. Everything here is general information to help you respond sensibly and avoid common mistakes. It is not legal advice and does not create a lawyer–client relationship. If you've received a demand letter, consult a qualified lawyer in the relevant jurisdiction about your specific situation.",
    },
  ],
  ctaHeading: "Build a dated, defensible record of your accessibility",
  ctaSub: "Start with a free WCAG 2.2 AA scan to capture your baseline, then fix at the source and keep the timestamped evidence. General information, not legal advice.",
  related: [
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/accessibility-overlay-alternative", label: "An honest alternative to overlays" },
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/proof", label: "The evidence StoreProof keeps" },
  ],
  keywords: [
    "accessibility demand letter",
    "ADA demand letter",
    "ADA demand letter Shopify",
    "accessibility lawsuit letter",
    "website accessibility demand letter",
  ],
};
