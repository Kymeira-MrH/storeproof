import { NextRequest, NextResponse } from "next/server";
import { createScanner } from "@/lib/scanner/factory";
import { runScan } from "@/lib/scan-service";
import { generateEaaStatement } from "@/lib/statement/eaa-statement";
import { parseSignup } from "@/lib/lead-input";
import { createLeadStore } from "@/lib/leads/factory";
import { createRateLimiter } from "@/lib/ratelimit/factory";
import { sendReportEmail } from "@/lib/email/send-report";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as unknown;
  const signup = parseSignup(body);
  if (!signup) {
    return NextResponse.json(
      { error: "A valid email and store URL are required to run a scan." },
      { status: 400 },
    );
  }

  // Rate limit the expensive part (a scan launches a headless browser). Keyed by IP.
  // Fail open: a rate-limiter outage or misconfig must never take down the scanner.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const limit = await createRateLimiter().check(ip);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "You've reached the scan limit for now. Please try again a little later." },
        { status: 429, headers: { "Retry-After": String(limit.resetSeconds) } },
      );
    }
  } catch (err) {
    console.error("rate limiter failed (allowing request)", err);
  }

  // The sign-up gate: capture the lead before scanning. Best-effort — a storage
  // hiccup must not cost the user their scan, but we log it so it is never silent.
  try {
    await createLeadStore().save({
      email: signup.email,
      storeUrl: signup.url,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("lead save failed", err);
  }

  try {
    const { result, score } = await runScan(createScanner(), signup.url);
    const preparedOn = new Date().toISOString().slice(0, 10);
    const statement = generateEaaStatement(
      {
        legalName: "[Your registered business name]",
        contactEmail: signup.email,
        storeUrl: signup.url,
      },
      result,
      score,
      preparedOn,
    );

    // Email the report (dormant until RESEND_API_KEY is set; never throws).
    const emailed = await sendReportEmail({
      to: signup.email,
      storeUrl: signup.url,
      band: score.band,
      totalViolations: score.totalViolations,
      statement,
    }).catch(() => false);

    return NextResponse.json({
      result,
      score,
      statement,
      emailed,
      storefrontLocked: result.storefrontLocked ?? false,
    });
  } catch (err) {
    console.error("scan failed", err);
    const message = err instanceof Error ? err.message : "unknown";
    if (message === "invalid-url" || message === "blocked-host" || message === "blocked-port") {
      return NextResponse.json(
        { error: "That URL is not a scannable public store address." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Scan failed. The site may be unreachable or blocking automated access." },
      { status: 502 },
    );
  }
}
