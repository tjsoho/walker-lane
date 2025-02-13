import { HeroSection } from "./sections/HeroSection";
import { PromiseSection } from "./sections/PromiseSection";
import { SupportSection } from "./sections/SupportSection";
import { WhatWeDo } from "./sections/WhatWeDo";
import { TargetMarket } from "./sections/TargetMarket";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { QuoteSection } from "./sections/QuoteSection";
import { AboutMe } from "./sections/AboutMe";
import { DownloadSection } from "./sections/DownloadSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PromiseSection />
      <SupportSection />
      <WhatWeDo />
      <TargetMarket />
      <TestimonialsSection />
      <QuoteSection />
      <AboutMe />
      <DownloadSection />
    </main>
  );
}
