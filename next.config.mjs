/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // playwright + axe launch a real browser in the scan route's Node runtime;
  // keep them external so Next does not try to bundle the native binary.
  serverExternalPackages: ["playwright", "playwright-core", "@axe-core/playwright", "@sparticuz/chromium"],
};
export default nextConfig;
