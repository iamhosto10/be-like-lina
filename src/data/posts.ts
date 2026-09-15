import type { Post } from "@/types";

/**
 * Artículos del blog en el home.
 * PENDIENTE: escribir el contenido (los títulos son los aprobados en el mockup).
 * Los enlaces apuntan a la sección hasta que exista /blog.
 */
export const posts: Post[] = [
  {
    slug: "5-comidas-saludables-y-faciles-para-tu-semana",
    title: "5 comidas saludables y fáciles para tu semana",
    category: "Nutrición",
    image: null,
    href: "/#blog",
  },
  {
    slug: "como-mantener-la-constancia",
    title: "Cómo mantener la constancia y ver resultados reales",
    category: "Entrenamiento",
    image: null,
    href: "/#blog",
  },
  {
    slug: "batido-post-entreno",
    title: "Batido post-entreno para recuperar y crecer",
    category: "Recetas",
    image: null,
    href: "/#blog",
  },
  {
    slug: "mentalidad-el-primer-paso",
    title: "Mentalidad: el primer paso de tu transformación",
    category: "Mentalidad",
    image: null,
    href: "/#blog",
  },
];
