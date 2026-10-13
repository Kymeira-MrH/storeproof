export function FinalCta({ heading, sub }: { heading?: string; sub?: string }) {
  return (
    <section className="final">
      <div className="w">
        <h2>{heading ?? "Stop guessing whether you're a target."}</h2>
        <p>{sub ?? "Scan your store free in under a minute. See the exposure, then decide from facts — not fear."}</p>
        <a className="cta" href="/#scan">
          Scan my store — it&rsquo;s free
        </a>
      </div>
    </section>
  );
}
