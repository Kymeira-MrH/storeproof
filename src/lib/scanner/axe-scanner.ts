import { chromium, type Browser, type LaunchOptions } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import type { Scanner, ScanResult, Violation, Impact } from "./types";

const IMPACTS: readonly string[] = ["minor", "moderate", "serious", "critical"];
function normaliseImpact(impact: string | null | undefined): Impact {
  return IMPACTS.includes(impact ?? "") ? (impact as Impact) : "moderate";
}

export class AxeScanner implements Scanner {
  async scan(url: string): Promise<ScanResult> {
    const launch: LaunchOptions = { args: ["--no-sandbox", "--disable-dev-shm-usage"] };
    // On Vercel serverless, @sparticuz/chromium sets PLAYWRIGHT_EXECUTABLE_PATH at deploy time.
    if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
      launch.executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
    }
    const browser: Browser = await chromium.launch(launch);
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 30_000 });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const violations: Violation[] = axe.violations.map((v) => ({
        id: v.id,
        impact: normaliseImpact(v.impact),
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
