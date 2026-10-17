import type { ReactElement } from "react";

// Shared StoreProof app mark for favicons, Apple touch icons and PWA icons,
// rendered to PNG by next/og (Satori). Built from Satori-safe primitives only
// (divs + borders + rotate) — no SVG/img data-URIs, which Satori renders
// unreliably. Gold ring + gold check on dark ink.
export function iconMark(size: number, maskable = false): ReactElement {
  const radius = maskable ? 0 : Math.round(size * 0.22);
  const ring = Math.round(size * (maskable ? 0.52 : 0.64));
  const ringBorder = Math.max(2, Math.round(size * 0.05));
  const checkW = Math.round(ring * 0.3);
  const checkH = Math.round(ring * 0.52);
  const checkStroke = Math.max(2, Math.round(size * 0.058));
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
      <div
        style={{
          width: ring,
          height: ring,
          borderRadius: ring,
          border: `${ringBorder}px solid #c9a24b`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* checkmark: an L drawn with two borders, rotated 45° */}
        <div
          style={{
            width: checkW,
            height: checkH,
            borderRight: `${checkStroke}px solid #e3c67e`,
            borderBottom: `${checkStroke}px solid #e3c67e`,
            transform: "rotate(45deg)",
            marginTop: `-${Math.round(ring * 0.08)}px`,
          }}
        />
      </div>
    </div>
  );
}
