interface Section {
  id: string;
  name: string;
}

const HOME_SECTIONS: Section[] = [
  { id: "Section1-Hero", name: "Hero Section" },
  { id: "Section2-Promise", name: "Promise Section" },
  { id: "Section3-Clarity-Confidence-Freedom", name: "Support Section" },
  { id: "Section4-WhatWeDo", name: "What We Do" },
  { id: "Section5-WhoWeHelp", name: "Target Market" },
  { id: "Section6-Testimonials", name: "Testimonials" },
  { id: "Section7-Quote", name: "Quote Section" },
  { id: "Section8-AboutUs", name: "About Me" },
  { id: "Section9-Download", name: "Download Section" }
];

const PAGES = {
  home: HOME_SECTIONS,
  // Add other pages here as needed
};

export function getPageSections(pageId: string): Section[] {
  return PAGES[pageId as keyof typeof PAGES] || [];
}

// Explicit loader map so webpack only bundles section files into the
// editor, not every .tsx under (pages) (a template-string import() pulls
// the whole directory into the client bundle).
export const sectionLoaders: Record<
  string,
  () => Promise<Record<string, unknown>>
> = {
  "home/Section1-Hero": () =>
    import("@/app/(pages)/home/sections/Section1-Hero"),
  "home/Section2-Promise": () =>
    import("@/app/(pages)/home/sections/Section2-Promise"),
  "home/Section3-Clarity-Confidence-Freedom": () =>
    import("@/app/(pages)/home/sections/Section3-Clarity-Confidence-Freedom"),
  "home/Section4-WhatWeDo": () =>
    import("@/app/(pages)/home/sections/Section4-WhatWeDo"),
  "home/Section5-WhoWeHelp": () =>
    import("@/app/(pages)/home/sections/Section5-WhoWeHelp"),
  "home/Section6-Testimonials": () =>
    import("@/app/(pages)/home/sections/Section6-Testimonials"),
  "home/Section7-Quote": () =>
    import("@/app/(pages)/home/sections/Section7-Quote"),
  "home/Section8-AboutUs": () =>
    import("@/app/(pages)/home/sections/Section8-AboutUs"),
  "home/Section9-Download": () =>
    import("@/app/(pages)/home/sections/Section9-Download"),
}; 