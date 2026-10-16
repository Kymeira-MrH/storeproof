import type { LandingPage } from "./types";
import { page as shopifyAccessibilityChecker } from "./pages/shopify-accessibility-checker";
import { page as shopifyAccessibilityAudit } from "./pages/shopify-accessibility-audit";
import { page as wcagComplianceShopify } from "./pages/wcag-compliance-shopify";
import { page as europeanAccessibilityActShopify } from "./pages/european-accessibility-act-shopify";
import { page as adaComplianceShopify } from "./pages/ada-compliance-shopify";
import { page as accessibilityStatementGenerator } from "./pages/accessibility-statement-generator";
import { page as accessibilityDemandLetter } from "./pages/accessibility-demand-letter";
import { page as accessibilityOverlayAlternative } from "./pages/accessibility-overlay-alternative";
import { page as accessibeAlternative } from "./pages/accessibe-alternative";
import { page as userwayAlternative } from "./pages/userway-alternative";
import { page as audioeyeAlternative } from "./pages/audioeye-alternative";

// Every intent landing page, in sitemap/priority order. Add new pages here.
export const LANDING_PAGES: LandingPage[] = [
  shopifyAccessibilityChecker,
  shopifyAccessibilityAudit,
  wcagComplianceShopify,
  europeanAccessibilityActShopify,
  adaComplianceShopify,
  accessibilityStatementGenerator,
  accessibilityDemandLetter,
  accessibilityOverlayAlternative,
  accessibeAlternative,
  userwayAlternative,
  audioeyeAlternative,
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function landingSlugs(): string[] {
  return LANDING_PAGES.map((p) => p.slug);
}
