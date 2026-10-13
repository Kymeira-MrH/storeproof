import { resolve4, resolve6 } from "node:dns/promises";
import net from "node:net";
import ipaddr from "ipaddr.js";

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

// Anything that is not a normal public unicast address is treated as unsafe.
// ipaddr.js classifies loopback, private, link-local, CGNAT, multicast, reserved,
// and IPv4-mapped IPv6 (e.g. ::ffff:169.254.169.254) correctly — do not hand-roll this.
export function isPrivateIp(ip: string): boolean {
  let addr: ipaddr.IPv4 | ipaddr.IPv6;
  try {
    addr = ipaddr.parse(ip);
  } catch {
    return true; // unparseable → fail closed
  }
  if (addr.kind() === "ipv6") {
    const v6 = addr as ipaddr.IPv6;
    if (v6.isIPv4MappedAddress()) addr = v6.toIPv4Address();
  }
  return addr.range() !== "unicast";
}

// Resolve via c-ares (resolve4/6), NOT dns.lookup. dns.lookup uses libuv's thread
// pool, which flakes with EBUSY on serverless and appends resolv.conf search domains
// (mangling hostnames like "example.co.uk" -> "example.co.uk.co.uk"). c-ares queries
// DNS directly and does neither.
async function resolveHost(host: string): Promise<string[]> {
  try {
    const v4 = await resolve4(host);
    if (v4.length > 0) return v4;
  } catch {
    /* no A record */
  }
  try {
    return await resolve6(host);
  } catch {
    return [];
  }
}

// Validates the URL is a public http(s) target on a standard port and returns the
// resolved public IP so the caller can pin it at the browser layer (anti-rebinding).
export async function assertPublicUrl(value: string): Promise<string> {
  if (!isValidHttpUrl(value)) throw new Error("invalid-url");
  const u = new URL(value);
  const host = u.hostname.toLowerCase();
  const port = u.port ? Number(u.port) : u.protocol === "https:" ? 443 : 80;
  if (port !== 80 && port !== 443) throw new Error("blocked-port");
  if (BLOCKED_HOSTNAMES.has(host)) throw new Error("blocked-host");
  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw new Error("blocked-host");
    return host;
  }
  const addresses = await resolveHost(host);
  if (addresses.length === 0) throw new Error("dns-failed");
  for (const addr of addresses) {
    if (isPrivateIp(addr)) throw new Error("blocked-host");
  }
  return addresses[0];
}
