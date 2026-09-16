import type { Recipe } from "@/types";

/**
 * Recetas gratis del home. Son muestra: enganchan y llevan al Recetario de pago.
 * PENDIENTE: escribir el contenido y hacer las fotos (hoy `image: null` → placeholder).
 */
export const recipes: Recipe[] = [
  {
    slug: "bowl-de-avena-y-frutos-rojos",
    title: "Bowl de avena nocturna con frutos rojos",
    kind: "comida",
    summary: "Se prepara de noche, se come de día · 3 minutos",
    image: null,
    href: "/recetas/bowl-de-avena-y-frutos-rojos",
  },
  {
    slug: "batido-verde-de-la-manana",
    title: "Batido verde para empezar el día",
    kind: "batido",
    summary: "Espinaca, banano y avena · 5 minutos",
    image: null,
    href: "/recetas/batido-verde-de-la-manana",
  },
];

/** Bloque "GRATIS" de la sección de recetas (imán de captación). */
export const freeRecipeBook = {
  badge: "Gratis",
  title: "Recetario semanal de comida saludable",
  text: "Recibe cada semana un recetario con ideas saludables y prácticas.",
  buttonLabel: "Quiero recibirlo gratis",
  image: null as Recipe["image"], // Pendiente: mockup del recetario.
};
