// Generates concise, accurate alt text for a product image using Claude vision.
// Returns null when the engine isn't configured (no ANTHROPIC_API_KEY) so callers
// can degrade honestly rather than writing placeholder text.
const MODEL = process.env.ALT_TEXT_MODEL || "claude-haiku-4-5-20251001";

export async function generateAltText(imageUrl: string, productTitle: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "url", url: imageUrl } },
            {
              type: "text",
              text:
                `Write concise, accurate alt text (max ~125 characters) for this product image on an e-commerce store. ` +
                `Product name: "${productTitle}". Describe what is visually shown so a screen-reader user understands it. ` +
                `Do not start with "image of" or "photo of". Return only the alt text, nothing else.`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`anthropic-${res.status}`);
  const d = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
  const text = d.content?.find((c) => c.type === "text")?.text?.trim();
  if (!text) return null;
  return text.replace(/^["']|["']$/g, "").slice(0, 160);
}
