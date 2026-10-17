const FAMILY: Array<{ name: string; href: string }> = [
  { name: "Susan", href: "https://susan.vpnetworks.co.uk" },
  { name: "Arbiter", href: "https://arbiter.vpnetworks.co.uk" },
  { name: "Agent Audit", href: "https://agentaudit.co.uk" },
  { name: "VantageData", href: "https://vantagedata.co.uk" },
  { name: "LeaseScan", href: "https://leasescan.io" },
  { name: "AI In Your Pocket", href: "https://pocketai.vpnetworks.co.uk" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="w footer-grid">
        <div>
          <div className="footer-brand">Store<b>Proof</b></div>
          <p className="footer-tag">
            Honest, automated accessibility compliance for Shopify stores. Source-level fixes,
            evidence packs and monitoring — never an overlay.
          </p>
        </div>

        <div>
          <div className="footer-h">Product</div>
          <ul className="footer-links">
            <li>
              <a href="/how-it-works">How it works</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
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
          <div className="footer-h">Guides</div>
          <ul className="footer-links">
            <li>
              <a href="/shopify-accessibility-checker">Accessibility checker</a>
            </li>
            <li>
              <a href="/european-accessibility-act-shopify">EAA &amp; Shopify</a>
            </li>
            <li>
              <a href="/accessibility-statement-generator">Statement generator</a>
            </li>
            <li>
              <a href="/accessibility-overlay-alternative">Overlay alternative</a>
            </li>
            <li>
              <a href="/accessibility-demand-letter">Demand letter help</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-h">Company</div>
          <ul className="footer-links">
            <li>
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a>
            </li>
            <li>
              <a href="/accessibility">Accessibility statement</a>
            </li>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
            <li>
              <a href="/terms">Terms</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-h">The VantagePoint family</div>
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
        <span>
          © 2026 StoreProof — a{" "}
          <a
            href="https://vpnetworks.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d4d7db", textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            VantagePoint Networks
          </a>{" "}
          product.
        </span>
        <span>We pass our own WCAG 2.2 AA test.</span>
      </div>
      <div className="w footer-credit">
        Photography via{" "}
        <a href="https://unsplash.com/?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
        {" — "}
        <a href="https://unsplash.com/@framesbyfin?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Heidi Fin</a>,{" "}
        <a href="https://unsplash.com/@benchaccounting?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Bench Accounting</a>,{" "}
        <a href="https://unsplash.com/@smilevivo?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Sang Kwak</a>,{" "}
        <a href="https://unsplash.com/@brookecagle?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Brooke Cagle</a>,{" "}
        <a href="https://unsplash.com/@mercantile?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Clark Street Mercantile</a>,{" "}
        <a href="https://unsplash.com/@silverkblack?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Vitaly Gariev</a>
        {" & "}
        <a href="https://unsplash.com/@__matthoffman__?utm_source=storeproof&utm_medium=referral" target="_blank" rel="noopener noreferrer">Matt Hoffman</a>.
      </div>
    </footer>
  );
}
