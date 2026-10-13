export function AuthHeader() {
  return (
    <header className="dash-top">
      <div className="dash-top-inner">
        <a href="/" className="dash-brand">
          STOREPROOF
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
