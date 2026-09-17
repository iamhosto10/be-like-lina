import { Hero } from "@/components/sections/hero/Hero";
import { StoreSection } from "@/components/sections/StoreSection";
import { RecipesSection } from "@/components/sections/RecipesSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { planListSchema, productListSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoreSection />
      <RecipesSection />
      <PlansSection />
      <BlogSection />
      <JsonLd
        data={{ "@context": "https://schema.org", "@graph": [productListSchema, planListSchema] }}
      />
    </>
  );
}
