"use client";

import { useEffect } from "react";

// Scroll-reveal for editorial frames: adds .in to .ed-rev elements as they enter
// the viewport. Hero animations are pure CSS on load; this only drives the lower
// frames. Respects prefers-reduced-motion via the CSS fallback.
export function EditorialReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ed-rev"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18 },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);

  return null;
}
