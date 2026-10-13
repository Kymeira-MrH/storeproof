import { normalizeShopDomain } from "./domain";

const API_VERSION = "2024-10";

export interface ShopifyImage {
  productId: string;
  productTitle: string;
  imageId: string;
  src: string;
  alt: string | null;
}

export class ShopifyAdmin {
  private readonly shop: string;

  constructor(shop: string, private readonly token: string) {
    const s = normalizeShopDomain(shop);
    if (!s) throw new Error("invalid-shop-domain");
    this.shop = s;
  }

  private url(path: string): string {
    return `https://${this.shop}/admin/api/${API_VERSION}/${path}`;
  }

  private headers(): Record<string, string> {
    return {
      "X-Shopify-Access-Token": this.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async getShop(): Promise<{ name: string; domain: string }> {
    const res = await fetch(this.url("shop.json"), { headers: this.headers() });
    if (res.status === 401 || res.status === 403) throw new Error("shopify-unauthorized");
    if (!res.ok) throw new Error(`shopify-error-${res.status}`);
    const d = (await res.json()) as { shop?: { name?: string; domain?: string } };
    return { name: d.shop?.name ?? this.shop, domain: d.shop?.domain ?? this.shop };
  }

  async listProductImages(limit = 100): Promise<ShopifyImage[]> {
    const res = await fetch(this.url(`products.json?limit=${limit}&fields=id,title,images`), {
      headers: this.headers(),
    });
    if (res.status === 401 || res.status === 403) throw new Error("shopify-unauthorized");
    if (!res.ok) throw new Error(`shopify-error-${res.status}`);
    const d = (await res.json()) as {
      products?: Array<{
        id: number;
        title: string;
        images?: Array<{ id: number; src: string; alt: string | null }>;
      }>;
    };
    const out: ShopifyImage[] = [];
    for (const p of d.products ?? []) {
      for (const img of p.images ?? []) {
        out.push({
          productId: String(p.id),
          productTitle: p.title,
          imageId: String(img.id),
          src: img.src,
          alt: img.alt && img.alt.trim() ? img.alt : null,
        });
      }
    }
    return out;
  }

  async updateImageAlt(productId: string, imageId: string, alt: string): Promise<void> {
    const res = await fetch(this.url(`products/${productId}/images/${imageId}.json`), {
      method: "PUT",
      headers: this.headers(),
      body: JSON.stringify({ image: { id: Number(imageId), alt } }),
    });
    if (!res.ok) throw new Error(`shopify-update-${res.status}`);
  }
}
