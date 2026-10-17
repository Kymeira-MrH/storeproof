import { MarketingNav } from "../marketing-nav";
import { SiteFooter } from "../site-footer";
import { PhotoHero } from "../photo-hero";
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
        <PhotoHero
          image="/img/arcade.jpg"
          alt="Shoppers in a grand retail arcade"
          kicker="StoreProof journal"
          title={<>Accessibility, in <em>plain English.</em></>}
          lede="Straight guides to the European Accessibility Act, overlays, and what actually makes a demand letter go away."
        />
        <section className="block">
          <div className="w">
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
