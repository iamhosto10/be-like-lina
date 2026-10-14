/**
 * Sección «Recetas saludables» del home.
 *
 * Las dos tarjetas son productos digitales reales de la tienda (sus datos, foto y
 * precio salen de `products.ts`); aquí solo se elige cuáles y qué etiqueta llevan.
 */
export const recipeProducts = [
  { slug: "guia-alimentacion-saludable", label: "Guía digital" },
  { slug: "recetario-batidos", label: "Recetario digital" },
] as const;

/** Bloque «GRATIS» de la sección (imán de captación): un solo envío, sin suscripción. */
export const freeRecipes = {
  badge: "Gratis · Regalo de Lina",
  title: "Cocina sano sin complicarte",
  text: "Recibe gratis las recetas favoritas de Lina en tu correo. Un solo envío, sin suscripción.",
  buttonLabel: "¡Las quiero gratis!",
  /** Texto de la portada ilustrada mientras no exista un mockup real. */
  coverTitle: "Las recetas favoritas de Lina",
} as const;
