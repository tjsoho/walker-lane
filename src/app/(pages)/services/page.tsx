import { HeroSection } from "./sections/HeroSection";
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
