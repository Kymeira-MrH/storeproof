"use client";

import { useEffect, useRef, useState } from "react";

// Animates a number up from 0 when it scrolls into view. Respects reduced-motion.
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  durationMs = 1100,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
