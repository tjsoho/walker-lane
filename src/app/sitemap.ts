import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://walkerlane.com.au";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = ["", "/about", "/services", "/contact", "/advisors", "/blog"];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
