import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { recipes } from "@/data/recipes";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recetas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  return { title: recipe?.title ?? "Receta", robots: { index: false, follow: true } };
}

export default async function RecipePage({ params }: PageProps<"/recetas/[slug]">) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  return (
    <ComingSoon
      eyebrow="Receta"
      title={recipe.title}
      backHref="/#recetas"
      backLabel="Volver a recetas"
    />
  );
}
