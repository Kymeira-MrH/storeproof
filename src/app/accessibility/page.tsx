import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { PhotoHero } from "../photo-hero";

export const metadata = {
  title: "Accessibility statement",
  description:
    "StoreProof's own accessibility statement. We target WCAG 2.2 Level AA, test our site with our own scanner, and tell you plainly where we stand.",
  alternates: { canonical: "/accessibility" },
};

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main>
        <PhotoHero
          image="/img/storefront.jpg"
          alt="An independent shopfront on a quiet street"
          kicker="StoreProof"
          title={<>Accessibility <em>statement</em></>}
          lede="We sell accessibility compliance, so we hold our own site to the same standard we hold yours. This statement is prepared in the spirit of EN 301 549 and the European Accessibility Act."
        />
        <section className="block">
          <div className="w legal">
            <p className="updated">Last updated 13 October 2026</p>

            <h2>Our commitment</h2>
            <p>
              StoreProof aims to meet <b>WCAG 2.2 Level AA</b>. We test storeproof.co.uk with the
              same automated engine we run on our customers&rsquo; stores, and we resolve issues at
              the source rather than hiding them behind a widget.
            </p>

            <h2>Conformance status</h2>
            <p>
              storeproof.co.uk is <b>substantially conformant</b> with WCAG 2.2 Level AA: it meets
              the standard with a small number of exceptions still being addressed. We will not
              claim full conformance we cannot evidence &mdash; the same honesty we promise you.
            </p>

            <h2>What we check</h2>
            <ul>
              <li>Keyboard operability and visible focus on every interactive control.</li>
              <li>Text and interface contrast against WCAG 2.2 AA thresholds.</li>
              <li>Semantic structure: one page heading, logical heading order, landmarks.</li>
              <li>Meaningful text alternatives and correctly labelled form fields.</li>
              <li>Reduced-motion support for visitors who prefer it.</li>
            </ul>

            <h2>Known limitations</h2>
            <p>
              An automated scan reliably catches roughly a third of accessibility barriers. Items
              that need human judgement &mdash; such as whether a description is genuinely useful to
              a screen-reader user &mdash; are reviewed manually. If you find something we have
              missed, please tell us; we treat it as a priority fix.
            </p>

            <h2>Feedback and contact</h2>
            <p>
              If you encounter any accessibility barrier on this site, email{" "}
              <a href="mailto:info@vpnetworks.co.uk">info@vpnetworks.co.uk</a>. We aim to respond
              within five working days.
            </p>

            <h2>Enforcement</h2>
            <p>
              If you are in the EU and are not satisfied with our response, you may contact the
              accessibility supervisory authority in your member state. In the UK, the Equality and
              Human Rights Commission is the relevant body.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
