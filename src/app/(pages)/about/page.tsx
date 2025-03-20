import HeroSection from "./sections/HeroSection";
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
