import { NavAuthLink } from "./nav-auth-link";

const LINKS: Array<{ key: string; label: string; href: string }> = [
  { key: "overlays", label: "The overlay trap", href: "/overlays" },
  { key: "how", label: "How it works", href: "/how-it-works" },
  { key: "proof", label: "The proof", href: "/proof" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  { key: "blog", label: "Blog", href: "/blog" },
];

// Intent landing pages surfaced in the nav "Guides" menu (comparison pages stay
// footer/SEO-only to keep the menu focused).
const GUIDES: Array<{ label: string; href: string }> = [
  { label: "Free accessibility checker", href: "/shopify-accessibility-checker" },
  { label: "Accessibility audit", href: "/shopify-accessibility-audit" },
  { label: "WCAG 2.2 compliance", href: "/wcag-compliance-shopify" },
  { label: "EAA & your Shopify store", href: "/european-accessibility-act-shopify" },
  { label: "Accessibility statement", href: "/accessibility-statement-generator" },
  { label: "Got a demand letter?", href: "/accessibility-demand-letter" },
  { label: "Overlay alternative", href: "/accessibility-overlay-alternative" },
];

export function MarketingNav({ active }: { active?: string }) {
  return (
    <>
      <div className="mast">
        <div className="w">
          <span>STOREPROOF</span>
          <span>Case EAA-2026-0417 · Re: Accessibility Demand</span>
          <span>EU · EAA Ready</span>
        </div>
      </div>

      <nav>
        <div className="w">
          <a className="brand" href="/">
            STOREPROOF
          </a>
          <ul>
            {LINKS.map((l) => (
              <li key={l.key}>
                <a className={active === l.key ? "active" : undefined} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <details className="navdrop">
                <summary className={active === "guides" ? "active" : undefined}>
                  Guides <span aria-hidden="true">▾</span>
                </summary>
                <div className="navdrop-panel">
                  {GUIDES.map((g) => (
                    <a key={g.href} href={g.href}>
                      {g.label}
                    </a>
                  ))}
                </div>
              </details>
            </li>
            <li>
              <NavAuthLink />
            </li>
          </ul>
          <div className="nav-right">
            <a className="navcta" href="/#scan">
              Scan my store
            </a>
            <details className="navmenu">
              <summary aria-label="Open menu">
                <span aria-hidden="true">☰</span>
              </summary>
              <div className="menu">
                {LINKS.map((l) => (
                  <a key={l.key} className={active === l.key ? "active" : undefined} href={l.href}>
                    {l.label}
                  </a>
                ))}
                <span className="menu-label">Guides</span>
                {GUIDES.map((g) => (
                  <a key={g.href} href={g.href}>
                    {g.label}
                  </a>
                ))}
                <NavAuthLink />
              </div>
            </details>
          </div>
        </div>
      </nav>
    </>
  );
}
