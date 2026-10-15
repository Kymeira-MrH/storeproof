import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ShopifyAdmin } from "@/lib/shopify/client";
import { generateAltText } from "@/lib/alt-text/generate";
import { createFixRateLimiter } from "@/lib/ratelimit/factory";
import { decryptToken } from "@/lib/crypto/token-cipher";

// How many images we remediate per run. Keeps a single request bounded; the
// merchant re-runs to continue through a large catalogue.
const BATCH = 20;

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const { data: store } = await supabase.from("stores").select("id").eq("id", id).single();
  if (!store) return NextResponse.json({ error: "Store not found." }, { status: 404 });

  // Fix runs call Claude + Shopify per image, so cap them per user. Fail open.
  try {
    const rl = await createFixRateLimiter().check(`fix:${user.id}`);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many fix runs. Try again in about ${Math.ceil(rl.resetSeconds / 60)} min.` },
        { status: 429 },
      );
    }
  } catch {
    // limiter unavailable — don't block the user
  }

  const { data: sub } = await supabase.from("subscriptions").select("status").maybeSingle();
  const active = sub?.status === "active" || sub?.status === "trialing";
  if (!active)
    return NextResponse.json(
      { error: "Automated fixes are part of a paid plan." },
      { status: 402 },
    );

  if (!process.env.ANTHROPIC_API_KEY)
    return NextResponse.json(
      { error: "The alt-text engine isn't configured yet (ANTHROPIC_API_KEY)." },
      { status: 503 },
    );

  const admin = createAdminClient();
  const { data: conn } = await admin
    .from("store_connections")
    .select("shop_domain, access_token")
    .eq("store_id", id)
    .maybeSingle();
  if (!conn)
    return NextResponse.json({ error: "Connect your Shopify store first." }, { status: 400 });

  const client = new ShopifyAdmin(
    conn.shop_domain as string,
    decryptToken(conn.access_token as string),
  );

  let images;
  try {
    images = await client.listProductImages(100);
  } catch {
    return NextResponse.json({ error: "Couldn't read your store products." }, { status: 502 });
  }

  const missing = images.filter((i) => !i.alt);
  const batch = missing.slice(0, BATCH);
  let fixed = 0;
  let failed = 0;

  for (const img of batch) {
    try {
      const alt = await generateAltText(img.src, img.productTitle);
      if (!alt) {
        failed++;
        continue;
      }
      await client.updateImageAlt(img.productId, img.imageId, alt);
      await admin.from("store_fixes").insert({
        store_id: id,
        account_id: user.id,
        kind: "image-alt",
        target: `${img.productTitle} — image ${img.imageId}`,
        detail: alt,
      });
      fixed++;
    } catch {
      failed++;
    }
  }

  const remaining = Math.max(0, missing.length - fixed);
  await admin
    .from("store_connections")
    .update({ images_missing_alt: remaining, last_checked_at: new Date().toISOString() })
    .eq("store_id", id);

  return NextResponse.json({ fixed, failed, remaining });
}
