import { Hero } from "@/components/sections/hero/Hero";
import { StoreSection } from "@/components/sections/StoreSection";
import { RecipesSection } from "@/components/sections/RecipesSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoreSection />
      <RecipesSection />
      <PlansSection />
      <BlogSection />
    </>
  );
}
