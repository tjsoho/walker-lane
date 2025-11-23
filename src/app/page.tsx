
import { HeroSection } from "./(pages)/home/sections/Section1-Hero";
import { PromiseSection } from "./(pages)/home/sections/Section2-Promise";
import { TargetMarket } from "./(pages)/home/sections/Section5-WhoWeHelp";
import { TestimonialsSection } from "./(pages)/home/sections/Section6-Testimonials";
import { WhatWeDo } from "./(pages)/home/sections/Section4-WhatWeDo";
import Section3a from "./(pages)/home/sections/Section3a";
import { SupportSection } from "./(pages)/home/sections/Section3-Clarity-Confidence-Freedom";
import { QuoteSection } from "./(pages)/home/sections/Section7-Quote";
import { AboutMe } from "./(pages)/home/sections/Section8-AboutUs";
import { CTASection } from "./(pages)/about/sections/CTASection";

export default function Page() {
  
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
  {/* <DownloadSection /> */}
  <CTASection />
  </main>
  );
}
