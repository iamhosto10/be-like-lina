import { Section } from "@/components/shared/Section";
import { Hero } from "@/components/sections/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section tone="light" id="tienda">
        <p className="text-sm text-muted-foreground">Tienda · paso 6</p>
      </Section>
      <Section tone="wine" id="recetas">
        <p className="text-sm text-muted-foreground">Recetas · paso 7</p>
      </Section>
      <Section tone="light" id="planes">
        <p className="text-sm text-muted-foreground">Planes · paso 8</p>
      </Section>
      <Section tone="dark" id="blog">
        <p className="text-sm text-muted-foreground">Blog · paso 9</p>
      </Section>
    </>
  );
}
