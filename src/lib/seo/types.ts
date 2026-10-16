// Data model for intent-targeted SEO landing pages. Each page is rendered by the
// shared template at src/app/[slug]/page.tsx, which also emits FAQPage +
// BreadcrumbList structured data. Keep copy honest: never promise "guaranteed
// compliance", always describe the automated share plus flag-the-rest.

export interface LandingSection {
  h2: string;
  /** Each string is a paragraph. */
  body: string[];
  bullets?: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface LandingPage {
  /** URL path segment, e.g. "shopify-accessibility-checker". */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** Small uppercase label above the H1. */
  eyebrow: string;
  h1: string;
  /** Lead paragraph under the H1. */
  lede: string;
  sections: LandingSection[];
  faqs: FaqItem[];
  ctaHeading: string;
  ctaSub: string;
  related: RelatedLink[];
  keywords?: string[];
}
