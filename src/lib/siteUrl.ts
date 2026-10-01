// Canonical production origin. VERCEL_URL is deliberately NOT used as a
// fallback — it is the per-deployment *.vercel.app hostname, which leaked
// into robots.txt, the sitemap and og:url when NEXT_PUBLIC_SITE_URL was
// unset in production.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.walkerlane.com.au"
).replace(/\/$/, "");
