"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  tags: string[];
  image_url: string;
  created_at: string;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function JournalList({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !(post.tags || []).includes(activeTag)) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.subtitle || "").toLowerCase().includes(q) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [posts, activeTag, query]);

  const isFiltering = activeTag !== null || query.trim() !== "";
  const featured = !isFiltering ? filtered[0] : null;
  const gridPosts = featured ? filtered.slice(1) : filtered;

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 pb-24 text-center text-brand-brown-dark/80">
        <p>New articles are on their way. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Search + Tag Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
        <div className="relative md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown-dark/60" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-brand-brown-dark placeholder:text-brand-brown-dark/50 border border-brand-brown-dark/15 focus:outline-none focus:border-brand-brown-dark/40 transition-colors"
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTag === null
                  ? "bg-brand-brown-dark text-brand-cream"
                  : "bg-white text-brand-brown-dark border border-brand-brown-dark/15 hover:border-brand-brown-dark/40"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeTag === tag
                    ? "bg-brand-brown-dark text-brand-cream"
                    : "bg-white text-brand-brown-dark border border-brand-brown-dark/15 hover:border-brand-brown-dark/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Latest Post */}
      {featured && (
        <Link
          href={`/${featured.slug}`}
          className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-16"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 aspect-[3/2] md:aspect-auto md:min-h-[320px]">
              {featured.image_url ? (
                <Image
                  src={featured.image_url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-brand-brown-light/30" />
              )}
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs tracking-[0.25em] uppercase text-brand-blue mb-4 font-inter">
                Latest Article
              </p>
              <h2 className="text-2xl md:text-3xl font-kiona text-brand-brown-dark mb-4 group-hover:text-brand-brown transition-colors">
                {featured.title}
              </h2>
              <p className="text-brand-brown-dark/80 mb-6 line-clamp-3">
                {featured.subtitle}
              </p>
              <div className="flex items-center gap-4">
                <span className="inline-block px-5 py-2.5 bg-brand-brown-dark text-brand-cream rounded-full text-sm group-hover:bg-brand-brown-dark/90 transition-colors">
                  Read Article
                </span>
                <time
                  dateTime={featured.created_at}
                  className="text-sm text-brand-brown-dark/70"
                >
                  {formatDate(featured.created_at)}
                </time>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Posts Grid */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/2]">
                {post.image_url ? (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-brown-light/30" />
                )}
              </div>
              <div className="p-6">
                {(post.tags || []).length > 0 && (
                  <p className="text-xs tracking-[0.2em] uppercase text-brand-blue mb-3 font-inter">
                    {post.tags[0]}
                  </p>
                )}
                <h3 className="text-lg font-kiona text-brand-brown-dark mb-2 group-hover:text-brand-brown transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-brand-brown-dark/80 line-clamp-2 mb-4">
                  {post.subtitle}
                </p>
                <time
                  dateTime={post.created_at}
                  className="text-sm text-brand-brown-dark/70"
                >
                  {formatDate(post.created_at)}
                </time>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !featured && (
          <p className="text-center text-brand-brown-dark/80 py-12">
            No articles match your search.
          </p>
        )
      )}
    </div>
  );
}
