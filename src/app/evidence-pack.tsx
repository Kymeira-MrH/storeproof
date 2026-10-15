"use client";

import { useEffect, useRef, useState } from "react";
import { IconSeal } from "./icons";

const ITEMS = [
  "Accessibility statement — EN 301 549",
  "Conformance declaration — WCAG 2.2 AA",
  "Remediation log — dated",
  "Items needing human review — flagged",
  "Re-scan schedule — monthly",
];

export function EvidencePack() {
  const ref = useRef<HTMLDivElement>(null);
  const [passed, setPassed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setPassed(ITEMS.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started.current) {
            started.current = true;
            ITEMS.forEach((_, k) => {
              setTimeout(() => setPassed((p) => Math.max(p, k + 1)), 450 + k * 420);
            });
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="evpack reveal" ref={ref}>
      <div className="evpack-head">
        <div>
          <div className="evpack-kick">Evidence pack</div>
          <div className="evpack-title">Accessibility Statement</div>
        </div>
        <div className="evpack-seal" aria-hidden="true">
          <IconSeal />
        </div>
      </div>
      <div className="evpack-meta">RE: your-store.com · EN 301 549 · prepared &amp; timestamped</div>
      <ul className="evpack-list">
        {ITEMS.map((it, i) => (
          <li key={i} className={i < passed ? "pass" : ""}>
            <span className="evpack-check" aria-hidden="true">
              {i < passed ? "✓" : "·"}
            </span>
            <span>{it}</span>
            <span className="evpack-status">{i < passed ? "PASS" : "—"}</span>
          </li>
        ))}
      </ul>
      <div className="evpack-foot">Prepared by StoreProof · not an overlay · fixed at source</div>
    </div>
  );
}
