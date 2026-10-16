import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { FinalCta } from "../final-cta";
import { getLandingPage, landingSlugs } from "@/lib/seo";

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
        <section className="block">
          <div className="w legal">
            <nav aria-label="Breadcrumb" className="crumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> {page.h1}
            </nav>
            <div className="head">
              <span className="eyebrow">{page.eyebrow}</span>
              <h1>{page.h1}</h1>
              <p className="lead">{page.lede}</p>
            </div>

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
