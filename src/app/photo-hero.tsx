// Editorial photo hero for content pages — full-bleed licensed photography with
// an overlaid kicker, big Fraunces title and lede. Same language as the homepage
// hero, so every page inherits the landing-page look. One image per page.
export function PhotoHero({
  image,
  alt,
  kicker,
  title,
  lede,
  issue = "EU · EAA — No. 01",
}: {
  image: string;
  alt: string;
  kicker: string;
  title: React.ReactNode;
  lede?: string;
  issue?: string;
}) {
  return (
    <section className="photo-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo-hero-bg" src={image} alt={alt} fetchPriority="high" />
      <div className="photo-hero-in w">
        <span className="photo-kicker">
          <span className="ln" aria-hidden="true" />
          {kicker}
        </span>
        <h1>{title}</h1>
        {lede ? <p className="photo-lede">{lede}</p> : null}
      </div>
      <div className="photo-hero-foot w">
        <span>StoreProof</span>
        <span>{issue}</span>
      </div>
    </section>
  );
}
