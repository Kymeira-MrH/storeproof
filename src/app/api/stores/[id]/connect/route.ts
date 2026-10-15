import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ShopifyAdmin } from "@/lib/shopify/client";
import { normalizeShopDomain } from "@/lib/shopify/domain";
import { encryptToken } from "@/lib/crypto/token-cipher";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const { data: store } = await supabase.from("stores").select("id").eq("id", id).single();
  if (!store) return NextResponse.json({ error: "Store not found." }, { status: 404 });

  const body = (await req.json().catch(() => null)) as
    | { shopDomain?: string; accessToken?: string }
    | null;
  const shop = normalizeShopDomain(body?.shopDomain ?? "");
  const token = (body?.accessToken ?? "").trim();
  if (!shop)
    return NextResponse.json(
      { error: "Enter a valid domain like your-store.myshopify.com." },
      { status: 400 },
    );
  if (!token)
    return NextResponse.json({ error: "Enter your Admin API access token." }, { status: 400 });

  let shopName: string;
  let imagesTotal: number;
  let imagesMissingAlt: number;
  try {
    const admin = new ShopifyAdmin(shop, token);
    const info = await admin.getShop();
    shopName = info.name;
    const images = await admin.listProductImages(100);
    imagesTotal = images.length;
    imagesMissingAlt = images.filter((i) => !i.alt).length;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg === "shopify-unauthorized")
      return NextResponse.json(
        {
          error:
            "Shopify rejected that token. Check it has read_products and write_products scope.",
        },
        { status: 400 },
      );
    return NextResponse.json(
      { error: "Couldn't reach that store. Check the domain and token." },
      { status: 502 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("store_connections").upsert({
    store_id: id,
    account_id: user.id,
    shop_domain: shop,
    access_token: encryptToken(token),
    scopes: "read_products,write_products",
    images_total: imagesTotal,
    images_missing_alt: imagesMissingAlt,
    last_checked_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: "Could not save the connection." }, { status: 500 });

  return NextResponse.json({ connected: true, shop: shopName, imagesTotal, imagesMissingAlt });
}
