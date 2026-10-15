import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";
import { EvidencePack } from "../evidence-pack";

export const metadata = {
  title: "The proof",
  description:
    "What you walk away with: an EN 301 549 EAA accessibility statement, a dated fix log, a flagged human-review list, a conformance declaration, and monthly re-scans.",
  alternates: { canonical: "/proof" },
};

export default function Page() {
  return (
    <>
      <MarketingNav active="proof" />
      <main>
        <section className="block">
          <div className="w">
            <div className="deliver">
              <div>
                <span className="eyebrow">What you walk away with</span>
                <h1 className="proof-h2">
                  The point is the paperwork. That is what makes a letter go away.
                </h1>
                <ul className="checklist">
                  <li>
                    <span className="tick">[✓]</span> EAA accessibility statement, written to EN
                    301 549, with your details, conformance level and remediation timeline.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A dated fix log showing every issue found
                    and how it was resolved in the code.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A flagged list of items that still need
                    human judgement, stated plainly.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> A conformance declaration you can hand
                    straight to a lawyer or a supervisory authority.
                  </li>
                  <li>
                    <span className="tick">[✓]</span> Monthly re-scan and a refreshed, timestamped
                    statement, so you stay defensible.
                  </li>
                </ul>
              </div>
              <EvidencePack />
            </div>
          </div>
        </section>
        <section className="block alt">
          <div className="w">
            <div className="prose2">
              <div>
                <h3>Why each document matters</h3>
                <p>
                  If a complaint reaches a lawyer or a supervisory authority, they do not want
                  marketing claims; they want evidence of a genuine, ongoing effort. The EN 301 549
                  accessibility statement is the document the EAA expects a trader to publish: it
                  states your conformance position plainly, including the parts still under review. A
                  dated fix log shows exactly what was changed and when, which demonstrates you acted
                  rather than ignored the problem.
                </p>
                <p>
                  The conformance declaration ties it together, setting out what has been verified
                  against the standard and what remains flagged for human work. Honest partial
                  conformance, backed by dates, reads far better to a regulator than a silent overlay
                  claiming a perfect pass it cannot support.
                </p>
              </div>
              <div>
                <h3>Kept current, not a one-off</h3>
                <p>
                  A single audit is accurate only on the day it runs. Shopify stores change
                  constantly: new products arrive without alt text, a theme update reorders
                  headings, a promotion adds a low-contrast banner. Within weeks, a one-off report
                  describes a store that no longer exists, and stale evidence is weak evidence.
                </p>
                <p>
                  StoreProof re-scans every month and alerts you when a regression appears, so new
                  issues are caught close to when they happen rather than discovered during a
                  complaint. Each pass refreshes the fix log and reissues the accessibility statement
                  with a current timestamp — a living record that reflects your store as it is today.
                </p>
              </div>
            </div>
          </div>
        </section>
        <FinalCta
          heading="Get your evidence pack started."
          sub="The free scan produces a draft statement on the spot — subscribe to keep it signed and current."
        />
      </main>
      <SiteFooter />
    </>
  );
}
