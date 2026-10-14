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
  badge: "Gratis",
  title: "Recibe gratis las recetas de Lina",
  text: "Déjanos tu correo y te las enviamos de una vez. Es un solo envío, sin suscripción.",
  buttonLabel: "Quiero las recetas gratis",
  /** Texto de la portada ilustrada mientras no exista un mockup real. */
  coverTitle: "Recetas de Lina",
} as const;
