import { AxeBuilder } from "@axe-core/playwright";
import type { Browser } from "playwright-core";
import type { Scanner, ScanResult, Violation, Impact } from "./types";
import { assertPublicUrl } from "./url-guard";

const IMPACTS: readonly string[] = ["minor", "moderate", "serious", "critical"];
function isImpact(value: string | null | undefined): value is Impact {
  return IMPACTS.includes(value ?? "");
}

function isServerless(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

// Serverless (Vercel): @sparticuz/chromium + playwright-core. Local: the full
// playwright package, which ships its own browser.
async function launchBrowser(url: string, pinnedIp?: string): Promise<Browser> {
  const pin = pinnedIp ? [`--host-resolver-rules=MAP ${new URL(url).hostname} ${pinnedIp}`] : [];
  if (isServerless()) {
    const sparticuz = (await import("@sparticuz/chromium")).default;
    const { chromium } = await import("playwright-core");
    return chromium.launch({
      args: [...sparticuz.args, ...pin],
      executablePath: await sparticuz.executablePath(),
      headless: true,
    });
  }
  const { chromium } = await import("playwright");
  const args = ["--no-sandbox", "--disable-dev-shm-usage", ...pin];
  const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  return (executablePath
    ? chromium.launch({ args, executablePath })
    : chromium.launch({ args })) as unknown as Browser;
}

export class AxeScanner implements Scanner {
  async scan(url: string, pinnedIp?: string): Promise<ScanResult> {
    const browser = await launchBrowser(url, pinnedIp);
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
      await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});

      // A password-protected / "coming soon" Shopify store redirects to /password,
      // so anything we scan is the lock screen, not the real storefront.
      const finalPath = (() => {
        try {
          return new URL(page.url()).pathname.replace(/\/+$/, "");
        } catch {
          return "";
        }
      })();
      const storefrontLocked = finalPath === "/password" || finalPath.endsWith("/password");

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
        storefrontLocked,
      };
    } finally {
      await browser.close();
    }
  }
}
