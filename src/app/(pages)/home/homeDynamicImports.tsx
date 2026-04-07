import dynamic from "next/dynamic";

/** Code-split below-the-fold home sections to reduce initial JS (TBT) while keeping SSR. */
export const SupportSection = dynamic(() =>
  import("./sections/Section3-Clarity-Confidence-Freedom").then((m) => ({
    default: m.SupportSection,
  }))
);

export const Section3a = dynamic(() => import("./sections/Section3a"));

export const WhatWeDo = dynamic(() =>
  import("./sections/Section4-WhatWeDo").then((m) => ({ default: m.WhatWeDo }))
);

export const TargetMarket = dynamic(() =>
  import("./sections/Section5-WhoWeHelp").then((m) => ({ default: m.TargetMarket }))
);

export const TestimonialsSection = dynamic(() =>
  import("./sections/Section6-Testimonials").then((m) => ({
    default: m.TestimonialsSection,
  }))
);

export const QuoteSection = dynamic(() =>
  import("./sections/Section7-Quote").then((m) => ({ default: m.QuoteSection }))
);

export const AboutMe = dynamic(() =>
  import("./sections/Section8-AboutUs").then((m) => ({ default: m.AboutMe }))
);

export const CTASection = dynamic(() =>
  import("../about/sections/CTASection").then((m) => ({ default: m.CTASection }))
);
