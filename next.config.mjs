/** @type {import('next').NextConfig} */
const nextConfig = {
  // playwright + axe launch a real browser in the scan route's Node runtime;
  // keep them external so Next does not try to bundle the native binary.
  serverExternalPackages: ["playwright", "playwright-core", "@axe-core/playwright", "@sparticuz/chromium"],
  // playwright-core loads browsers.json (and @sparticuz ships the chromium binary)
  // at runtime, which Vercel's tracer misses. Force them into the scan function.
  outputFileTracingIncludes: {
    "/api/scan": [
      "node_modules/playwright-core/**",
      "node_modules/@sparticuz/chromium/**",
    ],
  },
};
export default nextConfig;
