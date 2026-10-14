import type { PostSummary } from "@/types";

/**
 * Artículos de relleno: se muestran SOLO mientras Sanity no está configurado o no tiene
 * ningún artículo publicado (ver `lib/blog.ts`). Sus títulos son los aprobados en el mockup;
 * sus páginas muestran «próximamente». Al publicar contenido real en Sanity dejan de usarse.
 */
export const placeholderPosts: PostSummary[] = [
  {
    slug: "5-comidas-saludables-y-faciles-para-tu-semana",
    title: "5 comidas saludables y fáciles para tu semana",
    category: "nutricion",
  },
  {
    slug: "como-mantener-la-constancia",
    title: "Cómo mantener la constancia y ver resultados reales",
    category: "entrenamiento",
  },
  {
    slug: "batido-post-entreno",
    title: "Batido post-entreno para recuperar y crecer",
    category: "recetas",
  },
  {
    slug: "mentalidad-el-primer-paso",
    title: "Mentalidad: el primer paso de tu transformación",
    category: "mentalidad",
  },
].map((post) => ({
  ...post,
  excerpt: null,
  publishedAt: null,
  cover: null,
  placeholder: true,
  category: post.category as PostSummary["category"],
}));
