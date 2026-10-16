import type { LandingPage } from "../types";

export const page: LandingPage = {
  slug: "ada-compliance-shopify",
  metaTitle: "ADA Compliance for Shopify — Web Accessibility & Demand Letters",
  metaDescription:
    "What ADA compliance means for a Shopify store: Title III and the web, the serial demand-letter climate for e-commerce, WCAG 2.1 / 2.2 AA as the de-facto benchmark, and how to build a documented, defensible position. General information, not legal advice.",
  eyebrow: "ADA & web accessibility",
  h1: "ADA compliance for your Shopify store",
  lede: "US web-accessibility claims against online shops have become routine, and Shopify stores are squarely in the firing line. Here's a measured look at how the Americans with Disabilities Act applies to the web, why the demand-letter climate matters, the standard courts keep coming back to, and how to build a documented, defensible position. This is general information, not legal advice.",
  sections: [
    {
      h2: "ADA Title III and the web",
      body: [
        "The Americans with Disabilities Act (ADA) Title III prohibits discrimination on the basis of disability by 'places of public accommodation'. It predates the modern web, and it doesn't contain a tidy technical checklist for websites. That gap is exactly why web accessibility under the ADA has been shaped largely by litigation rather than by a single, explicit rulebook.",
        "US courts have widely treated consumer-facing websites — including online stores — as falling within Title III's reach, particularly where the site is the storefront through which customers browse and buy. For a Shopify merchant selling to US customers, the practical takeaway is that your storefront can be held to accessibility expectations even without a bright-line regulation spelling out every requirement.",
        "Because the statute itself is open-textured, the real-world benchmark has come from the standard that plaintiffs, defendants and courts repeatedly reference — which brings us to WCAG.",
      ],
    },
    {
      h2: "The serial demand-letter climate for e-commerce",
      body: [
        "A large share of web-accessibility activity never reaches a courtroom. Instead, merchants receive demand letters: a law firm asserts that a store is inaccessible and invites a settlement. For e-commerce specifically, this has become a high-volume pattern, with some firms and plaintiffs sending many letters targeting online shops.",
        "The uncomfortable part for store owners is that these letters often arrive without warning, cite real or alleged accessibility barriers, and are cheaper to settle than to fight — which is precisely what makes the tactic sustainable at volume. An overlay widget doesn't insulate you from this; stores running overlays have still received letters and still been sued, because an overlay typically patches symptoms in the browser rather than fixing the underlying barriers.",
        "The sensible response isn't panic, and it isn't a magic widget. It's to reduce the genuine barriers on your store and to be able to show, in writing, what you've done and when — so that if a letter arrives, you're responding from a position of documented good faith rather than a standing start.",
      ],
    },
    {
      h2: "WCAG 2.1 / 2.2 AA — the de-facto benchmark",
      body: [
        "Although the ADA doesn't name a technical standard, the Web Content Accessibility Guidelines (WCAG) at Level AA have become the de-facto benchmark that courts, settlements and consent decrees point to. WCAG 2.1 / 2.2 AA is, in practice, the yardstick against which a store's accessibility is measured.",
        "That's genuinely helpful, because WCAG is concrete and testable. It turns an abstract legal duty into specific, checkable things: images with meaningful alt text, buttons and links with accessible names, properly labelled form fields, colour contrast that meets AA thresholds, and content that works for keyboard and screen-reader users.",
        "Meeting WCAG 2.1 / 2.2 AA won't give you a certificate that makes you immune — no such certificate exists — but it directly addresses the barriers these claims are built on, and it gives you a recognised standard to point to when you describe your efforts.",
      ],
      bullets: [
        "Images carrying meaningful alternative text",
        "Buttons and links with clear accessible names",
        "Form fields with proper, programmatic labels",
        "Colour contrast that meets AA thresholds",
        "Full keyboard operability and sensible structure for screen readers",
      ],
    },
    {
      h2: "Building a defensible, documented position",
      body: [
        "A defensible position rests on two things: genuinely reducing barriers, and being able to evidence it. StoreProof scans your store against WCAG 2.1 / 2.2 AA, fixes the automatable share at the source — proper alt text and the corrections automation can handle reliably — flags what needs human judgement, and produces an accessibility statement plus an evidence pack that records what was changed and when.",
        "Be clear-eyed about scope, because we are. Automated tools reliably catch only about a third to a half of WCAG issues; the rest require a person. We never claim a scan or a one-click fix makes you compliant, and we are not an accessibility overlay. What we do is fix what can be fixed properly, document it honestly, and keep monitoring so a theme update or new product doesn't quietly reintroduce problems — which is exactly the kind of ongoing, written good-faith effort that stands up far better than a widget. This is general information, not legal advice; for your specific exposure, talk to a qualified attorney.",
      ],
      bullets: [
        "Fix the automatable WCAG issues at the source, not with an overlay",
        "Flag the issues that genuinely need human review rather than hiding them",
        "Publish an honest accessibility statement and keep a dated evidence pack",
        "Monitor continuously so your position doesn't decay over time",
      ],
    },
  ],
  faqs: [
    {
      q: "Does the ADA actually apply to my Shopify store?",
      a: "ADA Title III covers places of public accommodation, and US courts have widely treated consumer-facing websites — including online stores — as within its reach. If you sell to US customers, you should assume your storefront can be held to accessibility expectations. This is general information, not legal advice.",
    },
    {
      q: "What standard should I aim for if the ADA doesn't name one?",
      a: "The ADA doesn't specify a technical standard, but WCAG 2.1 / 2.2 at Level AA has become the de-facto benchmark that courts, settlements and consent decrees point to. Building your store to WCAG 2.1 / 2.2 AA directly addresses the barriers these claims are built on.",
    },
    {
      q: "Will an accessibility overlay protect me from demand letters?",
      a: "No. Stores running overlays have still received demand letters and still been sued. Overlays typically patch things in the browser rather than fixing the underlying barriers, so they don't deliver the documented, source-level improvements that actually reduce your exposure. StoreProof is not an overlay.",
    },
    {
      q: "Can StoreProof guarantee I won't get a demand letter?",
      a: "No honest provider can guarantee that, and we won't pretend to. Automated tools reliably catch only about a third to a half of WCAG issues; the rest need human judgement. We fix the automatable share at the source, flag the rest, and document everything — which puts you in a defensible, good-faith position rather than promising immunity.",
    },
    {
      q: "Is meeting WCAG the same as being ADA compliant?",
      a: "Meeting WCAG 2.1 / 2.2 AA is the recognised, testable way to address the accessibility barriers ADA web claims are built on, but there is no official certificate that makes a store permanently 'ADA compliant'. The goal is a genuinely accessible store backed by documented evidence of your efforts. Speak to a qualified attorney about your specific situation.",
    },
  ],
  ctaHeading: "See your Shopify store's accessibility exposure",
  ctaSub: "Run a free WCAG 2.1 / 2.2 AA scan, get your exposure band and a draft accessibility statement. No sales call, no card.",
  related: [
    { href: "/shopify-accessibility-checker", label: "Free Shopify accessibility checker" },
    { href: "/accessibility-demand-letter", label: "Received an accessibility demand letter?" },
    { href: "/overlays", label: "Why overlays get you sued" },
    { href: "/proof", label: "The evidence pack, explained" },
  ],
  keywords: [
    "ADA compliance Shopify",
    "Shopify ADA",
    "ADA web accessibility",
    "ADA Title III ecommerce",
    "WCAG ADA Shopify",
    "accessibility demand letter Shopify",
  ],
};
