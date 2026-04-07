import { HeroSection } from "./(pages)/home/sections/Section1-Hero";
import { PromiseSection } from "./(pages)/home/sections/Section2-Promise";
import {
  AboutMe,
  CTASection,
  QuoteSection,
  Section3a,
  SupportSection,
  TestimonialsSection,
  WhatWeDo,
} from "./(pages)/home/homeDynamicImports";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <PromiseSection />
      <SupportSection />
      <Section3a />
      <WhatWeDo />
      <TestimonialsSection />
      <QuoteSection />
      <AboutMe />
      <CTASection />
    </main>
  );
}
