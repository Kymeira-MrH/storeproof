import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  // Ownership check via RLS before any privileged delete.
  const { data: store } = await supabase.from("stores").select("id").eq("id", id).single();
  if (!store) return NextResponse.json({ error: "Store not found." }, { status: 404 });

  const admin = createAdminClient();
  await admin.from("store_fixes").delete().eq("store_id", id);
  await admin.from("scans").delete().eq("store_id", id);
  await admin.from("store_connections").delete().eq("store_id", id);
  const { error } = await admin.from("stores").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete the store." }, { status: 500 });

  return NextResponse.json({ deleted: true });
}
