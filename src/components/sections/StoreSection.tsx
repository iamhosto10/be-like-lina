import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "@/components/shared/ProductCard";
import { featuredProducts } from "@/data/products";

const DISCLAIMER =
  "Estos productos no son medicamentos. No superan las recomendaciones de consumo diario. Consulta a tu médico.";

export function StoreSection() {
  return (
    <Section tone="light" id="tienda" aria-labelledby="tienda-titulo">
      <SectionHeader
        number={1}
        title="Tienda"
        titleId="tienda-titulo"
        action={{ label: "Ver toda la tienda", href: "/tienda" }}
      />

      {/*
        Móvil: carrusel horizontal con scroll-snap (sin JS).
        Tablet: rejilla de 3. Escritorio: rejilla de 6, como el mockup.
      */}
      <ul
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Productos destacados"
      >
        {featuredProducts.map((product) => (
          <li key={product.slug} className="w-[68%] shrink-0 snap-start sm:w-auto">
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 68vw"
              className="h-full"
            />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-muted-foreground md:mt-10">{DISCLAIMER}</p>
    </Section>
  );
}
