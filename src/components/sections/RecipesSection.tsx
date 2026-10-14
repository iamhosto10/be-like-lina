import { Salad } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RecipeProductCard } from "@/components/shared/RecipeProductCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { getProduct } from "@/data/products";
import { freeRecipes, recipeProducts } from "@/data/recipes";

/** Portada de libro en CSS mientras no exista el mockup real de las recetas. */
function BookCoverPlaceholder({ title }: { title: string }) {
  return (
    <div
      aria-hidden
      className="relative flex aspect-[3/4] w-44 rotate-[6deg] flex-col rounded-l-sm rounded-r-xl bg-brand-ice px-5 py-6 text-brand-plum shadow-2xl shadow-black/40 md:w-48"
    >
      <span className="absolute inset-y-0 left-0 w-2 rounded-l-sm bg-brand-plum/20" />
      <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Gratis</p>
      <p className="mt-2 text-xl leading-tight font-extrabold tracking-tight">{title}</p>
      <span className="mt-4 h-0.5 w-10 rounded-full bg-brand-pink-deep" />
      <div className="mt-auto flex items-end justify-between">
        <span className="font-script text-2xl leading-none text-brand-pink-deep">Lina</span>
        <Salad className="size-7 text-brand-plum/70" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function RecipesSection() {
  const { badge, title, text, buttonLabel, coverTitle } = freeRecipes;

  return (
    <Section tone="wine" id="recetas" aria-labelledby="recetas-titulo">
      <SectionHeader
        number={2}
        title="Recetas saludables"
        subtitle="Ideas prácticas para tu día a día."
        titleId="recetas-titulo"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        {/* Productos digitales de recetas: cada tarjeta lleva a su página de compra */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Guías y recetarios">
          {recipeProducts.map(({ slug, label }) => {
            const product = getProduct(slug);
            if (!product) return null;
            return (
              <li key={slug}>
                <RecipeProductCard product={product} label={label} className="h-full" />
              </li>
            );
          })}
        </ul>

        {/* Imán: recetas gratis, un solo envío */}
        <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
          {/* Líneas decorativas */}
          <span
            aria-hidden
            className="absolute top-6 right-8 h-0.5 w-8 rotate-[-30deg] rounded-full bg-primary"
          />
          <span
            aria-hidden
            className="absolute top-11 right-6 h-0.5 w-6 rotate-[-30deg] rounded-full bg-primary"
          />

          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-8">
            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-primary uppercase">{badge}</p>
              <h3 className="mt-2 text-2xl leading-tight font-bold tracking-tight md:text-[1.75rem]">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{text}</p>
              <NewsletterForm
                source="recetas"
                layout="stacked"
                size="lg"
                buttonLabel={buttonLabel}
                inputClassName="bg-brand-white text-brand-night placeholder:text-brand-text-on-light-muted border-transparent"
                className="mt-5 max-w-sm"
              />
            </div>

            <div className="flex justify-center md:justify-end">
              <BookCoverPlaceholder title={coverTitle} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
