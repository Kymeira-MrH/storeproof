import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scanAndPersist } from "@/lib/scans/persist";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  // RLS limits this select to the user's own stores.
  const { data: store } = await supabase.from("stores").select("id, url").eq("id", id).single();
  if (!store) return NextResponse.json({ error: "Store not found." }, { status: 404 });

  try {
    const { band } = await scanAndPersist({
      accountId: user.id,
      storeId: store.id,
      url: store.url,
      contactEmail: user.email ?? "",
    });
    return NextResponse.json({ ok: true, band });
  } catch (err) {
    console.error("rescan failed", err);
    return NextResponse.json(
      { error: "Scan failed. The site may be unreachable or blocking automated access." },
      { status: 502 },
    );
  }
}
