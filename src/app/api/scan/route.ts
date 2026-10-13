import { NextRequest, NextResponse } from "next/server";
import { createScanner } from "@/lib/scanner/factory";
import { runScan } from "@/lib/scan-service";
import { generateEaaStatement } from "@/lib/statement/eaa-statement";
import { parseSignup } from "@/lib/lead-input";
import { createLeadStore } from "@/lib/leads/factory";

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
    return NextResponse.json({ result, score, statement });
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
