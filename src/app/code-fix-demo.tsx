"use client";

import { useEffect, useRef, useState } from "react";

type Line = { code?: string; flag?: boolean; bad?: string; good?: string };

const LINES: Line[] = [
  { code: '<section class="product-card">' },
  { flag: true, bad: "  <img src=\"beanie.jpg\">", good: '  <img src="beanie.jpg" alt="Charcoal wool beanie">' },
  { code: "  <h3>Wool Beanie</h3>" },
  { flag: true, bad: '  <button class="add"></button>', good: '  <button class="add" aria-label="Add to cart">' },
  { flag: true, bad: '  <a href="/care"></a>', good: '  <a href="/care">Care guide</a>' },
  { code: "</section>" },
];

export function CodeFixDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [fixed, setFixed] = useState<Record<number, boolean>>({});
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allFixed = () => {
      const f: Record<number, boolean> = {};
      LINES.forEach((l, i) => {
        if (l.flag) f[i] = true;
      });
      setFixed(f);
    };
    if (reduce || !("IntersectionObserver" in window)) {
      allFixed();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started.current) {
            started.current = true;
            setRun(true);
            const flagged = LINES.map((l, i) => (l.flag ? i : -1)).filter((i) => i >= 0);
            flagged.forEach((idx, k) => {
              setTimeout(() => setFixed((f) => ({ ...f, [idx]: true })), 1000 + k * 720);
            });
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`codefix reveal${run ? " run" : ""}`} ref={ref}>
      <div className="codefix-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>product.liquid</em>
      </div>
      <pre aria-label="StoreProof rewriting a product page's source code to fix accessibility issues">
        {LINES.map((l, i) => {
          if (!l.flag) {
            return (
              <span className="cln" key={i}>
                {l.code}
                {"\n"}
              </span>
            );
          }
          const isFixed = Boolean(fixed[i]);
          return (
            <span className={`cln flag${isFixed ? " fixed" : ""}`} key={i}>
              {isFixed ? l.good : l.bad}
              {"\n"}
            </span>
          );
        })}
      </pre>
      <div className="scanline" aria-hidden="true" />
    </div>
  );
}
