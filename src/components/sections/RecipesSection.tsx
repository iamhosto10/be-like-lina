import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { recipes, freeRecipeBook } from "@/data/recipes";

/** Portada de libro en CSS mientras no exista el mockup real del recetario. */
function BookCoverPlaceholder({ title }: { title: string }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[3/4] w-40 rotate-[6deg] rounded-l-sm rounded-r-xl bg-brand-ice px-5 py-6 text-brand-plum shadow-2xl shadow-black/40 md:w-44"
    >
      <span className="absolute inset-y-0 left-0 w-2 rounded-l-sm bg-brand-plum/20" />
      <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Recetario</p>
      <p className="mt-2 text-xl leading-tight font-extrabold tracking-tight">{title}</p>
    </div>
  );
}

export function RecipesSection() {
  const { badge, title, text, buttonLabel, image } = freeRecipeBook;

  return (
    <Section tone="wine" id="recetas" aria-labelledby="recetas-titulo">
      <SectionHeader
        number={2}
        title="Recetas saludables"
        subtitle="Ideas prácticas para tu día a día."
        titleId="recetas-titulo"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        {/* Recetas gratis */}
        <ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          aria-label="Recetas"
        >
          {recipes.map((recipe) => (
            <li key={recipe.slug}>
              <RecipeCard recipe={recipe} className="h-full" />
            </li>
          ))}
        </ul>

        {/* Imán: recetario semanal gratis */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
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
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 12rem, 10rem"
                  className="w-40 rotate-[6deg] drop-shadow-2xl md:w-48"
                />
              ) : (
                <BookCoverPlaceholder title={title} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
