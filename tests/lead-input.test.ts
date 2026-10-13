import { describe, it, expect } from "vitest";
import { isValidEmail, parseSignup } from "@/lib/lead-input";

describe("isValidEmail", () => {
  it("accepts a normal address and rejects junk", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("nope")).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});

describe("parseSignup (the scan gate)", () => {
  it("accepts a valid email + url", () => {
    expect(parseSignup({ email: "a@b.co", url: "https://a.test" })).toEqual({
      email: "a@b.co",
      url: "https://a.test",
    });
  });
  it("rejects a missing or invalid email", () => {
    expect(parseSignup({ url: "https://a.test" })).toBeNull();
    expect(parseSignup({ email: "nope", url: "https://a.test" })).toBeNull();
  });
  it("rejects a missing or blank url", () => {
    expect(parseSignup({ email: "a@b.co" })).toBeNull();
    expect(parseSignup({ email: "a@b.co", url: "   " })).toBeNull();
  });
  it("rejects non-object bodies", () => {
    expect(parseSignup(null)).toBeNull();
    expect(parseSignup("x")).toBeNull();
  });
});
