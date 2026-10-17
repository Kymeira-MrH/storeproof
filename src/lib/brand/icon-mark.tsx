import type { ReactElement } from "react";

// Shared StoreProof app mark, rendered to PNG by next/og for favicons, Apple
// touch icons and PWA manifest icons. Editorial identity: gold ring + check on
// dark ink. The maskable variant is full-bleed with the mark inside Android's
// safe zone so it can be masked into any shape.
export function iconMark(size: number, maskable = false): ReactElement {
  const radius = maskable ? 0 : Math.round(size * 0.22);
  const markScale = maskable ? 0.52 : 0.64;
  const mark = Math.round(size * markScale);
  const svg =
    `data:image/svg+xml,` +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>` +
        `<circle cx='32' cy='32' r='29' stroke='%23c9a24b' stroke-width='2.6'/>` +
        `<path d='M22 32.5l7 7 14-15' stroke='%23e3c67e' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/>` +
        `</svg>`,
    );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#141210",
        borderRadius: radius,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svg} width={mark} height={mark} alt="" style={{ display: "flex" }} />
    </div>
  );
}
