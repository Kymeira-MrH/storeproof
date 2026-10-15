import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  try {
    const admin = createAdminClient();
    // FK-safe order: children first, then parents, finally the auth user.
    await admin.from("store_fixes").delete().eq("account_id", user.id);
    await admin.from("scans").delete().eq("account_id", user.id);
    await admin.from("store_connections").delete().eq("account_id", user.id);
    await admin.from("subscriptions").delete().eq("account_id", user.id);
    await admin.from("stores").delete().eq("account_id", user.id);
    if (user.email) await admin.from("leads").delete().eq("email", user.email);
    await admin.auth.admin.deleteUser(user.id);

    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json({ error: "Could not delete your account." }, { status: 500 });
  }
}
