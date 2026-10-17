import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";
import { PhotoHero } from "../photo-hero";

export const metadata = {
  title: "FAQ",
  description:
    "Straight answers: does Shopify make you compliant, is a free scan enough, do overlays protect you, and does this apply if you only sell in the UK?",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Doesn't Shopify make my store compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Shopify's platform is accessible, but the finished store is your legal responsibility. Shopify themes cover only about a fifth of the WCAG criteria, and 'I used Shopify' has never been a successful defence.",
        },
      },
      {
        "@type": "Question",
        name: "Isn't a free scan enough on its own?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. An automated scan reliably catches around a third of accessibility issues. The rest, like whether a screen reader can complete your checkout, needs human judgement. We flag those items plainly.",
        },
      },
      {
        "@type": "Question",
        name: "Will an overlay widget protect me instead?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Overlays were fined by the FTC, are rejected by courts, and sit on more than 800 sued businesses. They cannot change the code a claim is built on.",
        },
      },
      {
        "@type": "Question",
        name: "I only sell in the UK. Does this still apply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The UK Equality Act already requires accessible services, and if you sell to anyone in the EU the European Accessibility Act applies regardless of where you are based.",
        },
      },
      {
        "@type": "Question",
        name: "Do I definitely need this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maybe not, and we'll say so. The EAA exempts microenterprises providing services (under 10 staff and under €2M turnover), and enforcement is still early-stage. But the law is in force, US web-accessibility lawsuits rose to 3,117 in 2025, and overlays don't protect you. The free scan shows exactly where you stand before you spend anything.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <MarketingNav />
      <main>
        <PhotoHero
          image="/img/boutique.jpg"
          alt="Inside an independent boutique"
          kicker="Straight answers"
          title={<>The questions <em>every merchant asks.</em></>}
        />
        <section className="block faq">
          <div className="w" style={{ maxWidth: "860px" }}>
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
            <details>
              <summary>Do I definitely need this? (the honest answer)</summary>
              <p>
                Maybe not — and we&rsquo;ll say so rather than scare you. The EAA exempts
                microenterprises providing services (under 10 staff and under &euro;2M turnover),
                and enforcement is still early-stage. But the law is in force, US web-accessibility
                lawsuits rose to 3,117 in 2025, and an overlay won&rsquo;t protect you. Run the free
                scan first — it shows exactly where you stand before you spend a penny.
              </p>
            </details>
            <details>
              <summary>Can I use StoreProof on my phone?</summary>
              <p>
                Yes — StoreProof runs in any mobile browser, and you can add it to your home screen
                so it opens full-screen like an app. On an <b>iPhone or iPad</b>: open StoreProof in
                Safari, tap the <b>Share</b> button, then <b>Add to Home Screen</b>. On{" "}
                <b>Android</b>: open it in Chrome, tap the <b>⋮</b> menu, then <b>Install app</b> (or{" "}
                <b>Add to Home Screen</b>). The scanner, your dashboard and the evidence packs all
                work on mobile.
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
