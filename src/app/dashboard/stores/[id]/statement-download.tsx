"use client";

export function StatementDownload({ statement }: { statement: string }) {
  if (!statement) return null;

  function download() {
    const blob = new Blob([statement], { type: "text/markdown" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "accessibility-statement.md";
    a.click();
    URL.revokeObjectURL(href);
  }

  return (
    <button className="btn" type="button" onClick={download}>
      Download statement
    </button>
  );
}
