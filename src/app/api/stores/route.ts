import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { normalizeUrl } from "@/lib/lead-input";
import { isValidHttpUrl } from "@/lib/scanner/url-guard";
import { scanAndPersist } from "@/lib/scans/persist";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  if (typeof body?.url !== "string") {
    return NextResponse.json({ error: "A store URL is required." }, { status: 400 });
  }
  const url = normalizeUrl(body.url);
  if (!isValidHttpUrl(url)) {
    return NextResponse.json({ error: "That is not a valid store URL." }, { status: 400 });
  }

  // RLS ensures the store is owned by this user.
  const { data: store, error } = await supabase
    .from("stores")
    .insert({ account_id: user.id, url })
    .select("id")
    .single();
  if (error || !store) {
    return NextResponse.json({ error: "Could not add the store." }, { status: 500 });
  }

  try {
    await scanAndPersist({ accountId: user.id, storeId: store.id, url, contactEmail: user.email ?? "" });
    return NextResponse.json({ ok: true, storeId: store.id });
  } catch (err) {
    console.error("initial store scan failed", err);
    // Store is added; the first scan can be retried from the dashboard.
    return NextResponse.json({ ok: true, storeId: store.id, scanError: true });
  }
}
