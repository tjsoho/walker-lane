import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Insights and ideas from the Walker Lane team on wealth, financial advice and the business of financial planning.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
