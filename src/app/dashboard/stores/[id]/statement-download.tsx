"use client";

import { useState } from "react";

export function StatementDownload({ statement }: { statement: string }) {
  const [busy, setBusy] = useState(false);
  if (!statement) return null;

  async function download() {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 56;
      const maxW = pageW - margin * 2;
      let y = margin;

      const OXBLOOD: [number, number, number] = [165, 42, 33];
      const INK: [number, number, number] = [23, 18, 12];
      const ensure = (h: number) => {
        if (y + h > pageH - margin - 20) {
          doc.addPage();
          y = margin;
        }
      };

      // Letterhead
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...OXBLOOD);
      doc.text("STOREPROOF", margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text("Evidence pack — not an overlay, fixed at source", pageW - margin, y, {
        align: "right",
      });
      y += 10;
      doc.setDrawColor(...OXBLOOD);
      doc.setLineWidth(1.5);
      doc.line(margin, y, pageW - margin, y);
      y += 28;

      // Body — parse the Markdown statement
      const lines = statement.replace(/\r/g, "").split("\n");
      for (const raw of lines) {
        const line = raw.trimEnd();
        if (line === "") {
          y += 8;
          continue;
        }
        if (line.startsWith("# ")) {
          doc.setFont("times", "bold");
          doc.setFontSize(22);
          doc.setTextColor(...INK);
          const wrapped = doc.splitTextToSize(line.slice(2), maxW);
          ensure(wrapped.length * 26 + 10);
          doc.text(wrapped, margin, y);
          y += wrapped.length * 26 + 12;
        } else if (line.startsWith("## ")) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10.5);
          doc.setTextColor(...OXBLOOD);
          ensure(24);
          y += 8;
          doc.text(line.slice(3).toUpperCase(), margin, y);
          y += 16;
        } else if (line.startsWith("- ")) {
          doc.setFont("times", "normal");
          doc.setFontSize(11);
          doc.setTextColor(...INK);
          const wrapped = doc.splitTextToSize(line.slice(2), maxW - 16);
          ensure(wrapped.length * 15 + 2);
          doc.text("•", margin, y);
          doc.text(wrapped, margin + 16, y);
          y += wrapped.length * 15 + 3;
        } else {
          doc.setFont("times", "normal");
          doc.setFontSize(11);
          doc.setTextColor(...INK);
          const wrapped = doc.splitTextToSize(line, maxW);
          ensure(wrapped.length * 15 + 2);
          doc.text(wrapped, margin, y);
          y += wrapped.length * 15 + 4;
        }
      }

      // Footer on every page
      const pages = doc.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(140, 140, 140);
        doc.text(
          `StoreProof — a VantagePoint Networks product · page ${i} of ${pages}`,
          margin,
          pageH - 30,
        );
        doc.text("storeproof.co.uk", pageW - margin, pageH - 30, { align: "right" });
      }

      doc.save("accessibility-statement.pdf");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="btn" type="button" onClick={download} disabled={busy}>
      {busy ? "Preparing…" : "Download statement (PDF)"}
    </button>
  );
}
