import { describe, it, expect, afterEach } from "vitest";
import { sendReportEmail } from "@/lib/email/send-report";

describe("sendReportEmail", () => {
  afterEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  it("is a no-op (returns false) when RESEND_API_KEY is not set", async () => {
    delete process.env.RESEND_API_KEY;
    const sent = await sendReportEmail({
      to: "a@b.co",
      storeUrl: "https://a.test",
      band: "low",
      totalViolations: 0,
      statement: "x",
    });
    expect(sent).toBe(false);
  });
});
