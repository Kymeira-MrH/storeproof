"use client";

import { useEffect } from "react";

// Fades/slides elements marked `.reveal` into view as they're scrolled to.
// No-JS and reduced-motion both fall back to fully visible (content is never
// hidden without JS — the hiding only applies once body gets `js-reveal`).
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (els.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    document.body.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
