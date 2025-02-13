import { HeroSection } from "./sections/HeroSection";
import { FeaturedPostsSection } from "./sections/FeaturedPostsSection";
import { AllPostsSection } from "./sections/AllPostsSection";

export default function BlogPage() {
  return (
    <main>
      <HeroSection />
      <FeaturedPostsSection />
      <AllPostsSection />
    </main>
  );
} 