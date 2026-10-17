export function AuthHeader() {
  return (
    <header className="dash-top">
      <div className="dash-top-inner">
        <a href="/" className="dash-brand" aria-label="StoreProof home">
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="29" stroke="#c9a24b" strokeWidth="2.6" />
            <path d="M22 32.5l7 7 14-15" stroke="#e3c67e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Store<b>Proof</b>
        </a>
        <nav className="dash-nav">
          <a href="/how-it-works">How it works</a>
          <a href="/pricing">Pricing</a>
        </nav>
        <div className="dash-account">
          <a className="dash-signout" href="/#scan">
            Scan my store
          </a>
        </div>
      </div>
    </header>
  );
}
