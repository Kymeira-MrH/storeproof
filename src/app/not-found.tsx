import { MarketingNav } from "./marketing-nav";
import { SiteFooter } from "./site-footer";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="block">
          <div className="w" style={{ maxWidth: "640px", textAlign: "center" }}>
            <span className="eyebrow">Error 404</span>
            <h1 className="dash-h1" style={{ marginTop: "10px" }}>
              We couldn&rsquo;t find that page.
            </h1>
            <p className="dash-sub" style={{ margin: "14px auto 0" }}>
              It may have moved or never existed. Here&rsquo;s the way back.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "26px",
              }}
            >
              <a className="navcta" href="/">
                Back to home
              </a>
              <a className="navcta" href="/#scan" style={{ background: "var(--ink)" }}>
                Scan my store
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
