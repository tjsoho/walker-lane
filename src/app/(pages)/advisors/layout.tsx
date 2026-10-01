import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Advisors",
  description:
    "Meet Walker Lane's financial advisers — experienced Sydney-based professionals helping clients build wealth with confidence.",
  alternates: { canonical: "/advisors" },
};

export default function AdvisorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
