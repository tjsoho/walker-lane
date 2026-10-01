import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Financial insights, guides and news from the Walker Lane team — practical advice on wealth, superannuation and financial planning.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
