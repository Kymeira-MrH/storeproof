// Transactional email via Resend's REST API (no SDK dependency).
// Dormant until RESEND_API_KEY is set — returns false and never throws, so a
// missing key or email outage can never break a scan.

const FROM = process.env.EMAIL_FROM?.trim() || "StoreProof <reports@storeproof.co.uk>";
const REPLY_TO = process.env.EMAIL_REPLY_TO?.trim() || "info@vpnetworks.co.uk";
const NOTIFY = process.env.EMAIL_NOTIFY?.trim() || "info@vpnetworks.co.uk";

export interface ReportEmail {
  to: string;
  storeUrl: string;
  band: string;
  totalViolations: number;
  statement: string;
}

async function send(key: string, payload: Record<string, unknown>): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error("resend email failed", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function sendReportEmail(report: ReportEmail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim().replace(/^['"]+|['"]+$/g, "");
  if (!key) return false;
  try {
    const body = [
      `Your automated accessibility scan of ${report.storeUrl} is ready.`,
      ``,
      `Exposure band: ${report.band.toUpperCase()}`,
      `Automated issues found: ${report.totalViolations}`,
      ``,
      `An automated scan does not establish full WCAG conformance — items needing`,
      `human judgement are flagged, never faked. Draft accessibility statement below.`,
      ``,
      `----------------------------------------`,
      report.statement,
    ].join("\n");

    const ok = await send(key, {
      from: FROM,
      to: [report.to],
      reply_to: REPLY_TO,
      subject: `Your StoreProof accessibility report — ${report.storeUrl}`,
      text: body,
    });
    if (!ok) return false;

    // Best-effort operator alert — never blocks the merchant email result.
    await send(key, {
      from: FROM,
      to: [NOTIFY],
      subject: `New StoreProof scan — ${report.to} (${report.band})`,
      text: `${report.to} scanned ${report.storeUrl}. Band: ${report.band}, ${report.totalViolations} automated issues.`,
    }).catch(() => false);

    return true;
  } catch (err) {
    console.error("sendReportEmail error", err);
    return false;
  }
}
