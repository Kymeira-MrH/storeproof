import { chromium, type Browser, type LaunchOptions } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import type { Scanner, ScanResult, Violation, Impact } from "./types";
import { assertPublicUrl } from "./url-guard";

function isImpact(value: string | null | undefined): value is Impact {
  return value === "minor" || value === "moderate" || value === "serious" || value === "critical";
}

export class AxeScanner implements Scanner {
  async scan(url: string, pinnedIp?: string): Promise<ScanResult> {
    const args = ["--no-sandbox", "--disable-dev-shm-usage"];
    // Pin the entry host to its already-validated public IP (anti-DNS-rebinding).
    if (pinnedIp) args.push(`--host-resolver-rules=MAP ${new URL(url).hostname} ${pinnedIp}`);

    const launch: LaunchOptions = { args };
    // On Vercel serverless, @sparticuz/chromium sets PLAYWRIGHT_EXECUTABLE_PATH at deploy time.
    if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) launch.executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;

    const browser: Browser = await chromium.launch(launch);
    try {
      // axe-core/playwright requires a page from an explicit context, not browser.newPage().
      const context = await browser.newContext();
      const page = await context.newPage();

      // Re-validate every main-frame navigation so a 3xx redirect cannot send the
      // browser to an internal/private address after the initial check passed.
      await page.route("**/*", async (route) => {
        const req = route.request();
        if (req.isNavigationRequest() && req.frame() === page.mainFrame()) {
          try {
            await assertPublicUrl(req.url());
          } catch {
            await route.abort("blockedbyclient");
            return;
          }
        }
        await route.continue();
      });

      await page.goto(url, { waitUntil: "load", timeout: 30_000 });
      // Let JS-heavy Shopify themes settle so axe sees the hydrated DOM (best-effort).
      await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});

      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();

      const violations: Violation[] = axe.violations.map((v) => ({
        id: v.id,
        impact: isImpact(v.impact) ? v.impact : "moderate",
        wcagCriteria: v.tags.filter((t) => t.startsWith("wcag")),
        nodes: v.nodes.length,
        help: v.help,
        helpUrl: v.helpUrl,
      }));
      return {
        url,
        scannedAt: new Date().toISOString(),
        violations,
        passes: axe.passes.length,
        incomplete: axe.incomplete.length,
      };
    } finally {
      await browser.close();
    }
  }
}
