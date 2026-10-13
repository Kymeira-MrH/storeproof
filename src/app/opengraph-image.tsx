import { ImageResponse } from "next/og";

export const alt = "StoreProof — Shopify accessibility, done and documented";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ece3d0",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#1f6b4a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f1ece0",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 5, color: "#17120c", display: "flex" }}>
            STOREPROOF
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#17120c", lineHeight: 1.04, maxWidth: 940, display: "flex" }}>
            Accessibility, done and documented.
          </div>
          <div style={{ fontSize: 30, color: "#352f26", marginTop: 22, maxWidth: 860, display: "flex" }}>
            Automated WCAG 2.2 AA fixes and the evidence pack your lawyer needs. Not an overlay.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", background: "#a52a21", color: "#f6ecdc", fontSize: 20, fontWeight: 700, letterSpacing: 2, padding: "11px 18px" }}>
            EU · EAA READY
          </div>
          <div style={{ display: "flex", background: "#17120c", color: "#ece3d0", fontSize: 20, padding: "11px 18px" }}>
            storeproof.co.uk
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
