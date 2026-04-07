import { HeroSection } from "./sections/Section1-Hero";
import { PromiseSection } from "./sections/Section2-Promise";
import {
  AboutMe,
  CTASection,
  QuoteSection,
  Section3a,
  SupportSection,
  TargetMarket,
  TestimonialsSection,
  WhatWeDo,
} from "./homeDynamicImports";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PromiseSection />
      <SupportSection />
      <Section3a />
      <WhatWeDo />
      <TargetMarket />
      <TestimonialsSection />
      <QuoteSection />
      <AboutMe />
      <CTASection />
    </main>
  );
}
