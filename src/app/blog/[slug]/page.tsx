import { notFound } from "next/navigation";
import { MarketingNav } from "../../marketing-nav";
import { SiteFooter } from "../../site-footer";
import { FinalCta } from "../../final-cta";
import { PhotoHero } from "../../photo-hero";
import { POSTS, getPost } from "@/lib/blog/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: `https://storeproof.co.uk/blog/${post.slug}`,
    author: { "@type": "Organization", name: "StoreProof" },
    publisher: {
      "@type": "Organization",
      name: "StoreProof",
      url: "https://storeproof.co.uk",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <MarketingNav active="blog" />
      <main>
        <PhotoHero
          image="/img/storefront.jpg"
          alt="An independent shopfront"
          kicker="Journal"
          title={post.title}
          lede={post.description}
        />
        <section className="block">
          <div className="w legal">
            <p className="crumb">
              <a href="/blog">&larr; Journal</a>
            </p>
            <div className="head">
              <span className="eyebrow">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {post.readMins} min read
              </span>
            </div>

            {post.blocks.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </section>
        <FinalCta
          heading="See where your store stands."
          sub="A free scan takes under a minute — the exposure band and issue list land on the spot."
        />
      </main>
      <SiteFooter />
    </>
  );
}
