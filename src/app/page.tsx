import { Section } from "@/components/shared/Section";

/* Provisional: el hero real llega en el paso 5. Sirve para ver el header sobre fondo oscuro. */
export default function HomePage() {
  return (
    <>
      <Section tone="dark" flush className="flex min-h-[70vh] items-center pt-24 pb-16">
        <div className="container-site">
          <p className="text-sm text-muted-foreground">Hero · paso 5</p>
        </div>
      </Section>
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
