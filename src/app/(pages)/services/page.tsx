import type { Metadata } from "next";
import { HeroSection } from "./sections/HeroSection";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Financial planning, wealth management, superannuation and investment advice from Walker Lane's Sydney-based team of advisers.",
  alternates: { canonical: "/services" },
};
import { ContentSection } from "./sections/ContentSection";
import { OurWorkSection } from "./sections/OurWorkSection";
import { CTASection } from "./sections/CTASection";

export default function ServicesPage() {
  return (
    <main>
      <HeroSection />
      <ContentSection />

      <OurWorkSection />

      <CTASection />
    </main>
  );
}
