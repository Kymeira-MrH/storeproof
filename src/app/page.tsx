import { ScanHero } from "./scan-hero";
import { MarketingNav } from "./marketing-nav";
import { SiteFooter } from "./site-footer";
import { FinalCta } from "./final-cta";
import { CountUp } from "./count-up";
import { RevealObserver } from "./reveal";
import { AltTextDemo } from "./alt-text-demo";

export default function Page() {
  return (
    <>
      <MarketingNav active="home" />

      <main>
      <header className="hero" id="scan">
        <div className="lines" aria-hidden="true" />
        <div className="w">
          <div className="grid">
            <div>
              <span className="retag">Re: the letter on your desk</span>
              <h1>
                You got a demand letter.
                <br />
                Let&rsquo;s make it <em>go away</em>, properly.
              </h1>
              <p className="lede">
                Accessibility overlays got 800+ stores sued anyway and cost one vendor a $1M
                FTC fine. We scan your Shopify store, fix what can be fixed at the source, and
                give you the <b>evidence pack your lawyer actually needs</b>.
              </p>
              <span className="chip">Not an overlay · we fix the code</span>
            </div>
            <div className="hero-side">
              <ScanHero />
              <ul className="hero-points">
                <li>A real WCAG 2.2 AA scan of your store — in under a minute.</li>
                <li>Plain-English issue list and your exposure band.</li>
                <li>A draft EAA accessibility statement on the spot.</li>
              </ul>
            </div>
          </div>
          <div className="ledger" style={{ marginTop: "48px" }}>
            <div><div className="n"><CountUp to={3117} /></div><div className="l">US web suits, 2025</div></div>
            <div><div className="n"><CountUp to={250} prefix="€" suffix="k" /></div><div className="l">Max fine · France</div></div>
            <div><div className="n">Jun 2025</div><div className="l">EAA in force</div></div>
            <div><div className="n"><CountUp to={1} prefix="$" suffix="M" /></div><div className="l">FTC overlay fine</div></div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="w">
          The European Accessibility Act has applied to online stores <b>since June 2025</b>. US
          web-accessibility lawsuits hit <b>3,117 in 2025</b> — up <b>27%</b>, roughly a dozen every
          business day.
        </div>
      </div>

      <section className="block reveal">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Overlay vs source-fix</span>
            <h2>Two ways to answer a demand letter. Only one holds up.</h2>
            <p>
              The cheap widget is the most-sued fix there is. We do the opposite — fix the code and
              keep the receipts.
            </p>
          </div>
          <div className="compare">
            <div className="compare-col bad">
              <div className="compare-h">An accessibility overlay</div>
              <ul>
                <li>Runs after the page loads — screen readers never see it.</li>
                <li>Can&rsquo;t touch form labels, keyboard traps or heading structure.</li>
                <li>FTC-fined $1M; 800+ overlay users were sued anyway.</li>
                <li>In court, it reads as an admission you knew and took a shortcut.</li>
              </ul>
            </div>
            <div className="compare-col good">
              <div className="compare-h">StoreProof</div>
              <ul>
                <li>Fixes the source — real alt text written to your products.</li>
                <li>Flags what needs human judgement plainly, never faked.</li>
                <li>Gives you an EN 301 549 statement and a dated evidence pack.</li>
                <li>Keeps it current with monthly re-scans and regression alerts.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="statband reveal">
        <div className="w">
          <div className="cell">
            <div className="big"><CountUp to={1} prefix="$" suffix="M" /></div>
            <div className="lab">FTC fine on an overlay vendor</div>
            <div className="src">FTC, 2025</div>
          </div>
          <div className="cell">
            <div className="big">~30–40%</div>
            <div className="lab">of WCAG issues automation can fix</div>
            <div className="src">Deque / AFB, 2025</div>
          </div>
          <div className="cell">
            <div className="big"><CountUp to={3117} /></div>
            <div className="lab">US web-accessibility lawsuits, 2025</div>
            <div className="src">Seyfarth Shaw, 2025</div>
          </div>
          <div className="cell">
            <div className="big">Jun 2025</div>
            <div className="lab">EAA in force for EU online stores</div>
            <div className="src">Directive 2019/882</div>
          </div>
        </div>
      </section>

      <section className="block reveal">
        <div className="w">
          <div className="head">
            <span className="eyebrow">See it, don&rsquo;t just read it</span>
            <h2>This is what a screen reader hears.</h2>
            <p>
              Empty alt text means a blind shopper hears nothing at all. StoreProof writes a real
              description to every product image — watch it happen:
            </p>
          </div>
          <AltTextDemo />
        </div>
      </section>

      <section className="block alt reveal">
        <div className="w">
          <div className="head">
            <span className="eyebrow">The short version</span>
            <h2>No wall of text. Just the bits that matter.</h2>
            <p>Pick what you need — and the free scanner is always one click away.</p>
          </div>
          <div className="navcards">
            <a className="navcard" href="/overlays">
              <span className="kick">The trap</span>
              <h3>Why overlays backfire</h3>
              <p>The $1M FTC fine, 800+ stores sued anyway, and why a widget can&rsquo;t save you.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/how-it-works">
              <span className="kick">The method</span>
              <h3>How it works</h3>
              <p>Scan, fix at the source, document — hands-off, one fixed monthly price.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/proof">
              <span className="kick">The paperwork</span>
              <h3>What you walk away with</h3>
              <p>The EAA statement and evidence pack that actually make a letter go away.</p>
              <span className="arrow">Read →</span>
            </a>
            <a className="navcard" href="/pricing">
              <span className="kick">The price</span>
              <h3>Simple pricing</h3>
              <p>Start free. Subscribe when you&rsquo;re ready. No retainer, no games.</p>
              <span className="arrow">Read →</span>
            </a>
          </div>
        </div>
      </section>

      <section className="block alt reveal">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Why StoreProof</span>
            <h2>Everything a demand letter needs — handled by StoreProof.</h2>
            <p>
              Not a widget. StoreProof fixes your store at the source, documents every change, and
              keeps you defensible as the store grows.
            </p>
          </div>
          <div className="benefits">
            <div className="benefit">
              <div className="b-ico">Not an overlay</div>
              <h3>Real fixes, in your code</h3>
              <p>
                StoreProof writes proper alt text into your products and corrects your theme at the
                source — the opposite of a widget bolted on top.
              </p>
            </div>
            <div className="benefit">
              <div className="b-ico">The paperwork</div>
              <h3>The evidence pack lawyers ask for</h3>
              <p>
                An EN 301 549 accessibility statement, a dated fix log and a conformance declaration
                you can hand straight to a lawyer or regulator.
              </p>
            </div>
            <div className="benefit">
              <div className="b-ico">Honest by design</div>
              <h3>We never fake a fix</h3>
              <p>
                StoreProof fixes what can be safely automated and flags the rest for human review,
                plainly — none of the &ldquo;guaranteed compliance&rdquo; theatre that got overlays
                fined.
              </p>
            </div>
            <div className="benefit">
              <div className="b-ico">Hands-off</div>
              <h3>Set up once, it runs itself</h3>
              <p>
                Connect your store and StoreProof handles the scanning, fixing and documenting. One
                fixed monthly price, no retainer, no sales calls.
              </p>
            </div>
            <div className="benefit">
              <div className="b-ico">Stay defensible</div>
              <h3>Monitored every month</h3>
              <p>
                Stores change weekly. StoreProof re-scans monthly and alerts you the moment your
                accessibility exposure slips back.
              </p>
            </div>
            <div className="benefit">
              <div className="b-ico">Who&rsquo;s behind it</div>
              <h3>Built by VantagePoint Networks</h3>
              <p>
                A UK security and data company. Your accessibility is handled by people who do
                compliance and evidence for a living.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block reveal">
        <div className="w">
          <div className="head">
            <span className="eyebrow">Honest by design</span>
            <h2>What we fix for you, and what we flag.</h2>
            <p>
              Automated tools reliably fix only about a third of accessibility issues. So we fix
              that part properly — and tell you plainly about the rest, instead of pretending a
              scan equals full compliance.
            </p>
          </div>
          <div className="compare">
            <div className="compare-col good">
              <div className="compare-h">We fix these automatically</div>
              <ul>
                <li>Alt text written into your product images, generated by Claude vision.</li>
                <li>Page language, title and viewport set correctly in your theme.</li>
                <li>Duplicate element IDs and missing frame titles, corrected at the source.</li>
                <li>Every change logged and reversible, shown to you in a fix log.</li>
              </ul>
            </div>
            <div className="compare-col flag">
              <div className="compare-h">We flag these for human review</div>
              <ul>
                <li>Colour contrast, and whether text is genuinely readable in context.</li>
                <li>Keyboard operation and focus order all the way through checkout.</li>
                <li>Meaningful link and button names, heading order, and ARIA.</li>
                <li>Surfaced with plain-English guidance and examples — never faked.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
      </main>
      <RevealObserver />
      <SiteFooter />
    </>
  );
}
