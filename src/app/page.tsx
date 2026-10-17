import "./editorial.css";
import { ScanHero } from "./scan-hero";
import { EditorialReveal } from "./editorial-reveal";
import { PlanCheckout } from "./pricing/plan-checkout";

// Editorial homepage — the approved magazine direction. Full-bleed photography,
// masthead + issue motif, huge Fraunces display, gold + emerald on dark ink, and
// the product shown as a restrained proof ledger. The real scanner (ScanHero) and
// Stripe checkout (PlanCheckout) are wired into the design, nothing faked.

const CheckThin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l4 4 10-11" stroke="#7ec9a3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <div className="ed">
      {/* ── FRAME 1 — hero ───────────────────────────────────────── */}
      <section className="ed-frame">
        <div className="ed-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/arcade.jpg" alt="Shoppers walking through a grand retail arcade" fetchPriority="high" />
        </div>

        <header className="ed-mast">
          <a className="ed-logo" href="/">
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="29" stroke="#c9a24b" strokeWidth="2.6" />
              <path d="M22 32.5l7 7 14-15" stroke="#e3c67e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Store<b>Proof</b>
          </a>
          <nav aria-label="Primary">
            <a href="/how-it-works">How it works</a>
            <a href="/pricing">Pricing</a>
            <a href="/blog">Journal</a>
            <a href="/shopify-accessibility-checker">Guides</a>
            <a href="/login">Sign in</a>
          </nav>
          <div className="ed-issue">EU &middot; EAA &mdash; No.&nbsp;01</div>
        </header>

        <div className="ed-hero-in">
          <div>
            <div className="ed-kick"><span className="ed-ln" /> The European Accessibility Act is here</div>
            <h1>
              <span className="ed-l"><span>Let everyone</span></span>
              <span className="ed-l"><span><em>through the door.</em></span></span>
            </h1>
            <p className="ed-stand">
              Accessibility compliance for Shopify &mdash; <b>scanned, fixed at the source, and documented.</b>{" "}
              Not an overlay. Not a promise. A record.
            </p>
            <div className="ed-cta-row">
              <a className="ed-cta" href="#scan">Scan your store &rarr;</a>
              <a className="ed-cta2" href="/proof">See a sample evidence pack</a>
            </div>
          </div>
          <aside className="ed-ledger" aria-label="Example scan result">
            <div className="ed-lh">Latest scan &middot; yourstore.com</div>
            <div className="ed-row g"><span className="k">Issues found</span><span className="v">47</span></div>
            <div className="ed-row e"><span className="k">Auto-fixed at source</span><span className="v">31</span></div>
            <div className="ed-row"><span className="k">Flagged for a human</span><span className="v">16</span></div>
            <div className="ed-seal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12.5l4 4 10-11" stroke="#7ec9a3" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Signed &amp; timestamped &middot; PDF ready
            </div>
          </aside>
        </div>

        <footer className="ed-foot">
          <span>Honest, documented accessibility</span>
          <span>WCAG 2.2 AA &middot; EN 301 549</span>
        </footer>
      </section>

      {/* ── SCAN — the real scanner ──────────────────────────────── */}
      <section className="ed-scan" id="scan">
        <div className="ed-wrap">
          <div className="ed-grid2">
            <div>
              <div className="ed-idx"><span className="ed-ln" /> No. 01 &mdash; The scan</div>
              <h2 className="ed-sech">See where your store <em>stands.</em></h2>
              <p className="ed-lead">
                A real WCAG 2.2 AA scan of one page, in under a minute. You get your exposure band, a
                plain-English issue list, and a draft EAA accessibility statement on the spot. No card.
              </p>
              <ul className="ed-micro-list">
                <li><CheckThin /> A real automated scan &mdash; not a checklist you fill in yourself.</li>
                <li><CheckThin /> Your exposure band and the issues that drive it.</li>
                <li><CheckThin /> A draft accessibility statement you can download.</li>
              </ul>
            </div>
            <div>
              <ScanHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 2 — the fix ────────────────────────────────────── */}
      <section className="ed-frame2">
        <div className="ed-pic">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ed-rev" src="/img/packing.jpg" alt="A small-business owner packing an order at a table" loading="lazy" />
          <span className="ed-tag">Fig. 02 &mdash; fixes written to source</span>
        </div>
        <div className="ed-txt">
          <div className="ed-n"><span className="ed-ln" /> No. 02 &mdash; The fix</div>
          <h2 className="ed-rev">We go into the store and <em>repair it.</em></h2>
          <p className="ed-rev">
            Alt text written straight to your products. Controls given real names. The issues automation
            can honestly handle, handled &mdash; and the rest flagged for a person, never faked.
          </p>
          <div className="ed-rule ed-rev" />
          <div className="ed-mini ed-rev">
            <span><b>128</b>images captioned</span>
            <span><b>41</b>controls named</span>
            <span><b>16</b>human-flagged</span>
          </div>
        </div>
      </section>

      {/* ── FRAME 3 — the honest part ────────────────────────────── */}
      <section className="ed-f3">
        <div className="ed-wrap">
          <div>
            <div className="ed-idx"><span className="ed-ln" /> No. 03 &mdash; The honest part</div>
            <h2 className="ed-sech ed-rev">We mend what&rsquo;s real. We <em>mark</em> what isn&rsquo;t.</h2>
            <p className="ed-lead ed-rev">
              Overlay widgets sell one-click compliance. That&rsquo;s the lie that gets shops sued. Here is
              the truth about what automation can and can&rsquo;t do.
            </p>
          </div>
          <div className="ed-cols">
            <div className="ed-col mend ed-rev">
              <div className="ed-col-h">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" stroke="#7ec9a3" strokeWidth="1.5" />
                  <path d="M7 12.5l3 3 7-7.5" stroke="#7ec9a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Mended, automatically
              </div>
              <ul>
                <li><CheckThin /> Missing image alt text, written to your products</li>
                <li><CheckThin /> Buttons &amp; links with no accessible name</li>
                <li><CheckThin /> Common structural and labelling gaps</li>
              </ul>
              <div className="ed-note">Applied at the source &middot; logged &amp; dated</div>
            </div>
            <div className="ed-col mark ed-rev d1">
              <div className="ed-col-h">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" stroke="#e3c67e" strokeWidth="1.5" />
                  <path d="M12 7v6" stroke="#e3c67e" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.3" fill="#e3c67e" />
                </svg>
                Marked for a human
              </div>
              <ul>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v7" stroke="#e3c67e" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="1.4" fill="#e3c67e" />
                  </svg>
                  Judgement calls on colour contrast in your brand
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v7" stroke="#e3c67e" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="1.4" fill="#e3c67e" />
                  </svg>
                  Whether a complex flow truly works by keyboard
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v7" stroke="#e3c67e" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="1.4" fill="#e3c67e" />
                  </svg>
                  Anything that needs a real person to verify
                </li>
              </ul>
              <div className="ed-note">We tell you exactly what&rsquo;s left &middot; no false &ldquo;100% compliant&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 4 — the evidence ───────────────────────────────── */}
      <section className="ed-f4">
        <div className="ed-wrap">
          <div className="ed-grid">
            <div className="ed-rev">
              <div className="ed-idx"><span className="ed-ln" /> No. 04 &mdash; The evidence</div>
              <h2 className="ed-sech">If a letter comes, you&rsquo;ve <em>already answered it.</em></h2>
              <p className="ed-lead">
                Every fix logged. A signed accessibility statement. A dated record of exactly what was done
                and what&rsquo;s still watched &mdash; the difference between panicking and forwarding a PDF.
              </p>
              <div style={{ marginTop: "30px" }}>
                <a className="ed-cta" href="/proof">See a sample pack &rarr;</a>
              </div>
            </div>
            <div className="ed-exhibit ed-rev d1">
              <div className="ed-et">Accessibility statement</div>
              <div className="ed-ed">yourstore.com &middot; WCAG 2.2 AA &middot; sample record</div>
              <div className="ed-er">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5l4 4 10-11" stroke="#2f6b4e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span><b>128</b> product images &mdash; alt text applied</span>
              </div>
              <div className="ed-er">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5l4 4 10-11" stroke="#2f6b4e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span><b>41</b> controls &mdash; accessible names added</span>
              </div>
              <div className="ed-er">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 6v6" stroke="#c9a24b" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.3" fill="#c9a24b" />
                </svg>
                <span><b>16</b> items flagged for human review</span>
              </div>
              <div className="ed-er" style={{ color: "#2f6b4e", fontWeight: 600 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#2f6b4e" strokeWidth="1.6" />
                  <path d="M7.5 12l3 3 6-6.5" stroke="#2f6b4e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Signed &amp; timestamped &middot; PDF ready for your lawyer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 5 — pricing ────────────────────────────────────── */}
      <section className="ed-f5">
        <div className="ed-wrap">
          <div>
            <div className="ed-idx"><span className="ed-ln" /> No. 05 &mdash; Terms</div>
            <h2 className="ed-sech ed-rev">Start free. Pay when you&rsquo;re <em>ready.</em></h2>
          </div>
          <div className="ed-plans">
            <div className="ed-plan ed-rev">
              <div className="ed-pn"><small>The scan</small>The scan</div>
              <div className="ed-pd">A real WCAG 2.2 AA scan, your exposure band and issue list, and a draft accessibility statement.</div>
              <div className="ed-pp">Free</div>
              <a className="ed-pcta ghost" href="#scan">Scan free</a>
            </div>
            <div className="ed-plan ed-rev d1">
              <div className="ed-pn"><small>Most chosen</small>Fix &amp; Watch</div>
              <div className="ed-pd">Source-level fixes applied for you, the signed evidence pack, and continuous monthly monitoring.</div>
              <div className="ed-pp">&pound;49<small>/mo</small></div>
              <PlanCheckout tier="fix" label="Get Fix & Watch" />
            </div>
            <div className="ed-plan ed-rev d2">
              <div className="ed-pn"><small>Keep watch</small>Monitoring</div>
              <div className="ed-pd">A monthly re-scan, regression alerts the moment something slips, and your statement kept current.</div>
              <div className="ed-pp">&pound;29<small>/mo</small></div>
              <PlanCheckout tier="monitoring" label="Get Monitoring" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 6 — closing ────────────────────────────────────── */}
      <section className="ed-frame ed-f6">
        <div className="ed-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/storefront.jpg" alt="A small independent shop with an orange door and striped awning" loading="lazy" />
        </div>
        <div className="ed-in">
          <div className="ed-idx"><span className="ed-ln" /> Begin</div>
          <h2>See where your store <em>stands.</em></h2>
          <p>One page, a real scan, under a minute. No sales call, no card.</p>
          <a className="ed-cta" href="#scan">Scan your store &rarr;</a>
        </div>
      </section>

      {/* ── footer ───────────────────────────────────────────────── */}
      <footer className="ed-site-foot">
        <div className="ed-ftop">
          <div>
            <div className="ed-flogo">Store<b>Proof</b></div>
            <p style={{ marginTop: "10px", maxWidth: "30ch", color: "rgba(255,255,255,.45)" }}>
              Honest, documented accessibility for Shopify. Never an overlay.
            </p>
          </div>
          <div className="ed-cols2">
            <div>
              <div className="ed-fh">Product</div>
              <a href="/how-it-works">How it works</a>
              <a href="/pricing">Pricing</a>
              <a href="/shopify-accessibility-checker">Guides</a>
              <a href="#scan">Scan my store</a>
            </div>
            <div>
              <div className="ed-fh">Company</div>
              <a href="/blog">Journal</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a>
            </div>
          </div>
        </div>
        <div className="ed-base">
          <span>&copy; 2026 StoreProof &mdash; a VantagePoint Networks product</span>
          <span>We pass our own WCAG 2.2 AA test</span>
        </div>
        <div className="ed-cred">
          Photography by{" "}
          <a href="https://unsplash.com/@framesbyfin" target="_blank" rel="noopener noreferrer">Heidi Fin</a>,{" "}
          <a href="https://unsplash.com/@benchaccounting" target="_blank" rel="noopener noreferrer">Bench Accounting</a> &amp;{" "}
          <a href="https://unsplash.com/@smilevivo" target="_blank" rel="noopener noreferrer">Sang Kwak</a> on Unsplash.
        </div>
      </footer>

      <EditorialReveal />
    </div>
  );
}
