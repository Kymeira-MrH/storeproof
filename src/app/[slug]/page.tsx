import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingNav } from "../marketing-nav";
import { PhotoHero } from "../photo-hero";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";
import { getLandingPage, landingSlugs } from "@/lib/seo";

// Deterministic, varied photography per landing page (different from the homepage set).
// Excludes coffee.jpg (owned by /how-it-works) so adjacent pages differ.
const LANDING_IMAGES = [
  "/img/shoppers.jpg",
  "/img/boutique.jpg",
  "/img/counter.jpg",
  "/img/arcade.jpg",
  "/img/packing.jpg",
  "/img/storefront.jpg",
];
function pickImage(slug: string): string {
  let n = 0;
  for (const ch of slug) n = (n + ch.charCodeAt(0)) % LANDING_IMAGES.length;
  return LANDING_IMAGES[n];
}

export function generateStaticParams() {
  return landingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "article",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://storeproof.co.uk/${page.slug}`,
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function LandingPageView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const base = "https://storeproof.co.uk";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          { "@type": "ListItem", position: 2, name: page.h1, item: `${base}/${page.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <MarketingNav active="guides" />
      <main>
        <PhotoHero
          image={pickImage(page.slug)}
          alt="An independent retail store"
          kicker={page.eyebrow}
          title={page.h1}
          lede={page.lede}
        />
        <section className="block">
          <div className="w legal">
            <p className="crumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> {page.h1}
            </p>

            {page.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <h2>Frequently asked questions</h2>
            {page.faqs.map((f) => (
              <details className="stmt" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}

            {page.related.length ? (
              <section>
                <h2>Related</h2>
                <ul>
                  {page.related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href}>{r.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </section>
        <FinalCta heading={page.ctaHeading} sub={page.ctaSub} />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
