import type { ReactElement } from "react";

// Shared StoreProof app mark, rendered to PNG by next/og for favicons, Apple
// touch icons and PWA manifest icons. Green-forward and modern; maskable variant
// is full-bleed so Android can mask it into any shape.
export function iconMark(size: number, maskable = false): ReactElement {
  const radius = maskable ? 0 : Math.round(size * 0.22);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1f6b4a",
        borderRadius: radius,
      }}
    >
      <div
        style={{
          fontSize: Math.round(size * 0.62),
          fontWeight: 800,
          color: "#f1ece0",
          fontFamily: "sans-serif",
          letterSpacing: Math.round(size * -0.02),
          display: "flex",
        }}
      >
        S
      </div>
    </div>
  );
}
