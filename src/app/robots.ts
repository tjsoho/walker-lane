import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// Admin routes are intentionally not listed here — listing them in
// robots.txt advertises their location. They are kept out of search
// results with X-Robots-Tag: noindex headers (see next.config.ts) and
// are behind the auth middleware.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
