import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";

export const metadata = {
  title: "FAQ — StoreProof",
  description:
    "Straight answers: does Shopify make you compliant, is a free scan enough, do overlays protect you, and does this apply if you only sell in the UK?",
};

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="block faq">
          <div className="w" style={{ maxWidth: "860px" }}>
            <div className="head">
              <span className="eyebrow">Straight answers</span>
              <h1>The questions every merchant asks.</h1>
            </div>
            <details open>
              <summary>Doesn&rsquo;t Shopify make my store compliant?</summary>
              <p>
                No. Shopify&rsquo;s platform is accessible, but the finished store is your legal
                responsibility. Shopify themes cover only about a fifth of the WCAG criteria, and
                &ldquo;I used Shopify&rdquo; has never been a successful defence.
              </p>
            </details>
            <details>
              <summary>Isn&rsquo;t a free scan enough on its own?</summary>
              <p>
                No, and we will not pretend otherwise. An automated scan reliably catches around
                a third of accessibility issues. The rest, like whether a screen reader can
                complete your checkout, needs human judgement. We flag those items plainly.
              </p>
            </details>
            <details>
              <summary>Will an overlay widget protect me instead?</summary>
              <p>
                No. Overlays were fined by the FTC, are rejected by courts, and sit on more than
                800 sued businesses. They cannot change the code a claim is built on.
              </p>
            </details>
            <details>
              <summary>I only sell in the UK. Does this still apply?</summary>
              <p>
                Yes. The UK Equality Act already requires accessible services, and if you sell to
                anyone in the EU the European Accessibility Act applies regardless of where you
                are based.
              </p>
            </details>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
