import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TipTapContent } from "@/components/blog/TipTapContent";
import { cache } from "react";
import type { Metadata } from "next";


interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  tags: string[];
  image_url: string;
  views: number;
  created_at: string;
}

// cache() dedupes the fetch between generateMetadata and the page render
const getBlogPost = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
});

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.subtitle,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url: `/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      ...(post.image_url ? { images: [{ url: post.image_url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
      ...(post.image_url ? { images: [post.image_url] } : {}),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Increment view count (moved out of the cached fetch so metadata
  // generation doesn't double-count)
  await supabase
    .from("blog_posts")
    .update({ views: (post.views || 0) + 1 })
    .eq("id", post.id);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.created_at,
    ...(post.image_url ? { image: post.image_url } : {}),
    author: { "@type": "Organization", name: "Walker Lane" },
    publisher: { "@type": "Organization", name: "Walker Lane" },
  };

  return (
    <article className="min-h-screen bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article Header */}
      <header className="pt-32 md:pt-40 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {post.tags.length > 0 && (
            <p className="text-xs tracking-[0.25em] uppercase text-brand-blue mb-5 font-inter text-center">
              {post.tags.join(" · ")}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-brown-dark text-center leading-tight mb-5">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg text-brand-brown-dark/80 text-center max-w-2xl mx-auto mb-6">
              {post.subtitle}
            </p>
          )}
          <p className="text-center">
            <time
              dateTime={post.created_at}
              className="text-sm text-brand-brown-dark/70"
            >
              {new Date(post.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
      </header>

      {/* Featured Image */}
      {post.image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative aspect-[2/1] rounded-lg overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <TipTapContent content={post.content} />

        <div className="mt-16 pt-8 border-t border-brand-brown-dark/15 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-brand-brown-dark text-brand-cream rounded-full text-sm hover:bg-brand-brown-dark/90 transition-colors"
          >
            Back to the Journal
          </Link>
        </div>
      </div>
    </article>
  );
}

// Add this for static generation optimization (optional)
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}
