import { createClient } from "@supabase/supabase-js";
import { JournalList, type BlogPost } from "@/components/blog/JournalList";
import { SITE_URL } from "@/lib/siteUrl";

// Server-rendered so the article list is in the HTML for search engines
export const revalidate = 600;

async function getPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, subtitle, slug, tags, image_url, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function JournalPage() {
  const posts = await getPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Walker Lane Journal",
    url: `${SITE_URL}/blog`,
    publisher: { "@type": "Organization", name: "Walker Lane" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/${post.slug}`,
      datePublished: post.created_at,
    })),
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Page Header */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-brand-blue mb-4 font-inter">
            Walker Lane
          </p>
          <h1 className="text-4xl md:text-5xl font-kiona text-brand-brown-dark mb-4">
            Our Journal
          </h1>
          <p className="text-brand-brown-dark/80 max-w-2xl mx-auto">
            Insights and ideas from our team on wealth, advice and the
            business of financial planning.
          </p>
        </div>
      </header>

      <JournalList posts={posts} />
    </div>
  );
}
