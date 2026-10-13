import { lookup } from "node:dns/promises";
import net from "node:net";

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "169.254.169.254",
  "metadata.google.internal",
]);

export function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }
  const low = ip.toLowerCase();
  return low === "::1" || low.startsWith("fc") || low.startsWith("fd") || low.startsWith("fe80");
}

export async function assertPublicUrl(value: string): Promise<void> {
  if (!isValidHttpUrl(value)) throw new Error("invalid-url");
  const host = new URL(value).hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host)) throw new Error("blocked-host");
  if (net.isIP(host) && isPrivateIp(host)) throw new Error("blocked-host");
  const { address } = await lookup(host);
  if (isPrivateIp(address)) throw new Error("blocked-host");
}
