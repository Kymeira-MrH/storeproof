import { NextRequest, NextResponse } from "next/server";
import { createScanner } from "@/lib/scanner/factory";
import { runScan } from "@/lib/scan-service";
import { generateEaaStatement } from "@/lib/statement/eaa-statement";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  const url = body?.url;
  if (typeof url !== "string") {
    return NextResponse.json({ error: "A store URL is required." }, { status: 400 });
  }
  try {
    const { result, score } = await runScan(createScanner(), url);
    const preparedOn = new Date().toISOString().slice(0, 10);
    const statement = generateEaaStatement(
      {
        legalName: "[Your registered business name]",
        contactEmail: "[your contact email]",
        storeUrl: url,
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
