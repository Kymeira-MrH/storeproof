const FAMILY: Array<{ name: string; href: string }> = [
  { name: "VantagePoint Networks", href: "https://vpnetworks.co.uk" },
  { name: "VP Audit", href: "https://audit.vpnetworks.co.uk" },
  { name: "VantageData", href: "https://vantagedata.co.uk" },
  { name: "LeaseScan", href: "https://leasescan.io" },
  { name: "AI In Your Pocket", href: "https://pocketai.vpnetworks.co.uk" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="w footer-grid">
        <div>
          <div className="footer-brand">STOREPROOF</div>
          <p className="footer-tag">
            Honest, automated accessibility compliance for Shopify stores. Source-level fixes,
            evidence packs and monitoring — never an overlay.
          </p>
        </div>

        <div>
          <div className="footer-h">Product</div>
          <ul className="footer-links">
            <li>
              <a href="/#how">How it works</a>
            </li>
            <li>
              <a href="/#pricing">Pricing</a>
            </li>
            <li>
              <a href="/#scan">Scan my store</a>
            </li>
            <li>
              <a href="/login">Sign in</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-h">Contact</div>
          <ul className="footer-links">
            <li>
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a>
            </li>
            <li>
              <a href="/#">Accessibility statement</a>
            </li>
            <li>
              <a href="/#">Privacy</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-h">More from VantagePoint</div>
          <ul className="footer-links">
            {FAMILY.map((f) => (
              <li key={f.href}>
                <a href={f.href} target="_blank" rel="noopener noreferrer">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w footer-bottom">
        <span>© 2026 StoreProof — a VantagePoint Networks product.</span>
        <span>We pass our own WCAG 2.2 AA test.</span>
      </div>
    </footer>
  );
}
