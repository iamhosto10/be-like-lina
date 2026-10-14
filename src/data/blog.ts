import type { PostCategoryKey } from "@/types";

/**
 * Las cuatro categorías del blog. La clave es el valor que guarda el Studio; el ícono de cada
 * una vive en `components/shared/PostCard.tsx`. Agregar una categoría = añadirla aquí, en la
 * lista de `studio/schemaTypes/post.ts` y en el mapa de íconos.
 */
export const postCategories: Record<PostCategoryKey, { label: string; description: string }> = {
  nutricion: {
    label: "Nutrición",
    description: "Qué comer y cómo organizarte, sin complicaciones.",
  },
  entrenamiento: {
    label: "Entrenamiento",
    description: "Rutinas, técnica y constancia para ver resultados.",
  },
  recetas: { label: "Recetas", description: "Ideas prácticas y deliciosas para tu día a día." },
  mentalidad: { label: "Mentalidad", description: "El primer paso de tu transformación." },
};

export const blogMeta = {
  title: "Blog",
  description:
    "Consejos de nutrición, entrenamiento, recetas y mentalidad para mujeres, por Lina Fuentes.",
  intro: "Consejos, recetas y motivación para tu transformación.",
} as const;
