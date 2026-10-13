import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { POSTS } from "@/lib/blog/posts";

export const metadata = {
  title: "Blog",
  description:
    "Plain-English guides on EAA compliance, Shopify accessibility, why overlays backfire, and what belongs in an accessibility evidence pack.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return (
    <>
      <MarketingNav active="blog" />
      <main>
        <section className="block">
          <div className="w">
            <div className="head">
              <span className="eyebrow">StoreProof journal</span>
              <h1>Accessibility, in plain English.</h1>
              <p>
                Straight guides to the European Accessibility Act, overlays, and what actually makes
                a demand letter go away.
              </p>
            </div>
            <div className="navcards">
              {POSTS.map((p) => (
                <a className="navcard" href={`/blog/${p.slug}`} key={p.slug}>
                  <span className="kick">
                    {new Date(p.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {p.readMins} min
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="arrow">Read →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
