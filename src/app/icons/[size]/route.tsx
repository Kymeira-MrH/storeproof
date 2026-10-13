import { ImageResponse } from "next/og";
import { iconMark } from "@/lib/brand/icon-mark";

const ALLOWED = new Set([180, 192, 256, 384, 512]);

export async function GET(req: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size: raw } = await params;
  const n = Number(raw);
  const size = ALLOWED.has(n) ? n : 512;
  const maskable = new URL(req.url).searchParams.get("p") === "maskable";
  return new ImageResponse(iconMark(size, maskable), { width: size, height: size });
}
