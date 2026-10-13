const LINKS: Array<{ key: string; label: string; href: string }> = [
  { key: "overlays", label: "The overlay trap", href: "/overlays" },
  { key: "how", label: "How it works", href: "/how-it-works" },
  { key: "proof", label: "The proof", href: "/proof" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
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
              <a href="/login">Log in</a>
            </li>
          </ul>
          <a className="navcta" href="/#scan">
            Scan my store
          </a>
        </div>
      </nav>
    </>
  );
}
