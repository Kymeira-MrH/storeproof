import { NextRequest, NextResponse } from "next/server";
import { scannerFromEnv } from "@/lib/scanner/factory";
import { runScan } from "@/lib/scan-service";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  const url = body?.url;
  if (typeof url !== "string") {
    return NextResponse.json({ error: "A store URL is required." }, { status: 400 });
  }
  try {
    const out = await runScan(scannerFromEnv(), url);
    return NextResponse.json(out);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    if (message === "invalid-url" || message === "blocked-host") {
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
