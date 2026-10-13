import { describe, it, expect } from "vitest";
import { isValidHttpUrl, isPrivateIp } from "@/lib/scanner/url-guard";

describe("isValidHttpUrl", () => {
  it("accepts http and https", () => {
    expect(isValidHttpUrl("https://shop.example")).toBe(true);
    expect(isValidHttpUrl("http://shop.example")).toBe(true);
  });
  it("rejects non-http schemes and garbage", () => {
    expect(isValidHttpUrl("file:///etc/passwd")).toBe(false);
    expect(isValidHttpUrl("ftp://x")).toBe(false);
    expect(isValidHttpUrl("not a url")).toBe(false);
  });
});

describe("isPrivateIp", () => {
  it("flags loopback, private and link-local ranges", () => {
    expect(isPrivateIp("127.0.0.1")).toBe(true);
    expect(isPrivateIp("10.1.2.3")).toBe(true);
    expect(isPrivateIp("172.16.0.1")).toBe(true);
    expect(isPrivateIp("192.168.0.5")).toBe(true);
    expect(isPrivateIp("169.254.169.254")).toBe(true);
    expect(isPrivateIp("::1")).toBe(true);
  });
  it("allows public addresses", () => {
    expect(isPrivateIp("8.8.8.8")).toBe(false);
    expect(isPrivateIp("93.184.216.34")).toBe(false);
  });
  it("blocks IPv4-mapped IPv6 pointing at private/metadata (SSRF regression)", () => {
    expect(isPrivateIp("::ffff:169.254.169.254")).toBe(true);
    expect(isPrivateIp("::ffff:127.0.0.1")).toBe(true);
    expect(isPrivateIp("::ffff:10.0.0.1")).toBe(true);
  });
  it("blocks CGNAT and wider link-local ranges", () => {
    expect(isPrivateIp("100.64.0.1")).toBe(true);
    expect(isPrivateIp("fe9d::1")).toBe(true);
  });
  it("allows a public IPv4-mapped address", () => {
    expect(isPrivateIp("::ffff:8.8.8.8")).toBe(false);
  });
});
