import type { Metadata } from "next";
import HeroSection from "./sections/HeroSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Walker Lane, a Sydney financial planning firm built on personalised guidance, clarity and long-term relationships.",
  alternates: { canonical: "/about" },
};
import StorySection from "./sections/StorySection";
import ValuesSection from "./sections/ValuesSection";
import TeamSection from "./sections/TeamSection";
import { CTASection } from "./sections/CTASection";

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}
