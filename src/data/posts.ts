import type { Post } from "@/types";

/**
 * Artículos del blog en el home.
 * PENDIENTE: escribir el contenido (los títulos son los aprobados en el mockup).
 * Los enlaces apuntan a /blog/[slug]; mientras no haya contenido, esa ruta muestra «próximamente».
 */
export const posts: Post[] = [
  {
    slug: "5-comidas-saludables-y-faciles-para-tu-semana",
    title: "5 comidas saludables y fáciles para tu semana",
    category: "Nutrición",
    image: null,
    href: "/blog/5-comidas-saludables-y-faciles-para-tu-semana",
  },
  {
    slug: "como-mantener-la-constancia",
    title: "Cómo mantener la constancia y ver resultados reales",
    category: "Entrenamiento",
    image: null,
    href: "/blog/como-mantener-la-constancia",
  },
  {
    slug: "batido-post-entreno",
    title: "Batido post-entreno para recuperar y crecer",
    category: "Recetas",
    image: null,
    href: "/blog/batido-post-entreno",
  },
  {
    slug: "mentalidad-el-primer-paso",
    title: "Mentalidad: el primer paso de tu transformación",
    category: "Mentalidad",
    image: null,
    href: "/blog/mentalidad-el-primer-paso",
  },
];
