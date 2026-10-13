// Monthly regression alert via Resend REST. Dormant without RESEND_API_KEY.
const FROM = process.env.EMAIL_FROM?.trim() || "StoreProof <reports@storeproof.co.uk>";
const REPLY_TO = process.env.EMAIL_REPLY_TO?.trim() || "info@vpnetworks.co.uk";

export interface Regression {
  url: string;
  from: string;
  to: string;
}

export async function sendRegressionAlert(to: string, items: Regression[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim().replace(/^['"]+|['"]+$/g, "");
  if (!key || items.length === 0) return false;

  const lines = items.map((i) => `  • ${i.url}: ${i.from.toUpperCase()} → ${i.to.toUpperCase()}`);
  const body = [
    `Heads up — your latest StoreProof monthly re-scan found accessibility exposure got worse:`,
    ``,
    ...lines,
    ``,
    `Sign in to see exactly what changed and re-run fixes:`,
    `https://storeproof.co.uk/dashboard`,
    ``,
    `An automated scan doesn't establish full compliance; human-review items are flagged, never faked.`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: REPLY_TO,
        subject: "StoreProof — accessibility regression detected",
        text: body,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
