"use client";

import { useEffect, useRef, useState } from "react";

const ALT = "Leafy green houseplant in a terracotta pot, viewed from the front.";

export function AltTextDemo() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function run() {
    if (timer.current) clearInterval(timer.current);
    setDone(false);
    setTyped("");
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setTyped(ALT.slice(0, i));
      if (i >= ALT.length) {
        if (timer.current) clearInterval(timer.current);
        setDone(true);
      }
    }, 26);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setTyped(ALT);
      setDone(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !started.current) {
            started.current = true;
            run();
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="altdemo reveal" ref={ref}>
      <div className="altdemo-media">
        <svg viewBox="0 0 160 160" role="img" aria-label="Illustration of a leafy houseplant in a terracotta pot">
          <path d="M52 98 L108 98 L100 142 L60 142 Z" fill="#c97a4a" />
          <path d="M46 88 L114 88 L108 102 L52 102 Z" fill="#b5632f" />
          <line x1="80" y1="100" x2="80" y2="60" stroke="#0a5a3a" strokeWidth="2.5" />
          <path d="M80 96 C62 74 54 54 72 40 C84 60 88 80 80 96 Z" fill="#1f8a52" />
          <path d="M80 96 C98 72 110 54 92 40 C80 60 74 80 80 96 Z" fill="#008060" />
          <path d="M80 98 C70 80 60 68 74 58 C84 72 86 86 80 98 Z" fill="#2fa368" />
        </svg>
      </div>
      <div className="altdemo-panel">
        <div className="altdemo-row bad">
          <span className="altdemo-tag">Before</span>
          <code>alt=&quot;&quot;</code>
          <span className="altdemo-hear">A blind shopper hears: &ldquo;image&rdquo; — nothing useful.</span>
        </div>
        <div className="altdemo-row good">
          <span className="altdemo-tag">StoreProof writes</span>
          <code>
            alt=&quot;{typed}
            {!done ? <span className="caret">▏</span> : null}&quot;
          </code>
          <span className="altdemo-hear">Now they hear exactly what&rsquo;s on the page.</span>
        </div>
        {done ? (
          <button type="button" className="dl" onClick={run} style={{ justifySelf: "start" }}>
            Watch it again
          </button>
        ) : null}
      </div>
    </div>
  );
}
