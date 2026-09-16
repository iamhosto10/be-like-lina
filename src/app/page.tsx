import { Section } from "@/components/shared/Section";
import { Hero } from "@/components/sections/hero/Hero";
import { StoreSection } from "@/components/sections/StoreSection";
import { RecipesSection } from "@/components/sections/RecipesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoreSection />
      <RecipesSection />
      <Section tone="light" id="planes">
        <p className="text-sm text-muted-foreground">Planes · paso 8</p>
      </Section>
      <Section tone="dark" id="blog">
        <p className="text-sm text-muted-foreground">Blog · paso 9</p>
      </Section>
    </>
  );
}
