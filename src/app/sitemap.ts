import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/siteUrl";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/advisors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Published blog posts
  let postPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("status", "published");

    postPages = (posts || []).map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at || now),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sitemap still serves the static pages if the database is unreachable
  }

  return [...staticPages, ...postPages];
}
