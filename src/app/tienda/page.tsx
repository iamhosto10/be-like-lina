import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { PlanCard } from "@/components/shared/PlanCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { plans } from "@/data/plans";
import { sortedProducts, storeGroups } from "@/data/products";
import { store } from "@/data/store";
import { shareImage } from "@/lib/legal";
import { site } from "@/data/site";
import { planListSchema, storePageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tienda",
  description: `${store.intro} Proteína, pre-entreno, antioxidante, stevia y guías digitales de ${site.name}.`,
  alternates: { canonical: "/tienda" },
  openGraph: {
    title: `Tienda · ${site.name}`,
    description: store.intro,
    url: "/tienda",
    images: [shareImage],
  },
};

/* Tonos alternos por grupo, para mantener el ritmo claro/oscuro del sitio. */
const groupTones = ["light", "wine", "light"] as const;

export default function StorePage() {
  return (
    <>
      <Section tone="dark" className="pt-28 pb-10 md:pt-36 md:pb-14">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: store.title }]} />
        <h1 className="mt-5 text-3xl md:text-5xl">{store.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{store.intro}</p>
      </Section>

      {storeGroups.map((group, i) => {
        const items = sortedProducts.filter((p) => group.categories.includes(p.category));
        if (items.length === 0) return null;

        return (
          <Section
            key={group.id}
            tone={groupTones[i % groupTones.length]}
            id={group.id}
            aria-labelledby={`${group.id}-titulo`}
            className="py-12 md:py-16"
          >
            <h2
              id={`${group.id}-titulo`}
              className="text-xl font-bold tracking-tight uppercase md:text-2xl"
            >
              {group.title}
            </h2>
            <p className="mt-1.5 mb-7 text-sm text-muted-foreground md:text-base">
              {group.description}
            </p>
            <ProductGrid products={items} label={group.title} eagerCount={i === 0 ? 2 : 0} />
          </Section>
        );
      })}

      {/* Servicios: los mismos dos planes del home, como sección adicional bajo los productos. */}
      <Section
        tone="wine"
        id="servicios"
        aria-labelledby="servicios-titulo"
        className="py-12 md:py-16"
      >
        <h2
          id="servicios-titulo"
          className="text-xl font-bold tracking-tight uppercase md:text-2xl"
        >
          Servicios
        </h2>
        <p className="mt-1.5 mb-7 text-sm text-muted-foreground md:text-base">
          Planes personalizados con Lina. Elige el que se adapta a tus objetivos.
        </p>
        <div className="grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-0">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Section>

      <Section tone="deep" className="py-10 md:py-12">
        <p className="text-xs text-muted-foreground">{store.disclaimer}</p>
      </Section>

      <JsonLd data={storePageSchema} />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [planListSchema] }} />
    </>
  );
}
