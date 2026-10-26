import type { ImageAsset } from "@/types";

/**
 * Texto FIJO del hero, aprobado por la clienta. No se reescribe.
 * `highlight` es la línea que va en color primario.
 */
export const hero = {
  /** Cuatro líneas fijas, tal como se aprobó. `highlightIndex` es la que va en color primario. */
  headline: {
    lines: ["Construye una", "versión de ti", "que te haga", "sentir bien."],
    highlightIndex: 1,
  },
  subtitle:
    "Entrenamientos inteligentes, nutrición real y mentalidad para transformar tu cuerpo y tu vida.",
  primaryCta: { label: "Empieza hoy", href: "/#planes" },
  videoCta: { label: "Ver video" },
  pillars: [
    { icon: "dumbbell", label: "Entrenamientos inteligentes" },
    { icon: "salad", label: "Nutrición real" },
    { icon: "heart", label: "Mentalidad fuerte" },
  ] as const,
  floatingCard: {
    title: "Resultados reales",
    subtitle: "Para mujeres reales",
  },
  /** Firma decorativa en cursiva. */
  signature: "Be Like Lina",
  /** Foto original de la web anterior (belikelina.com): Lina en el gimnasio. */
  image: {
    src: "/images/lina/hero.webp",
    alt: "Lina Fuentes, entrenadora, sentada en un banco de gimnasio",
    width: 1100,
    height: 1650,
  } satisfies ImageAsset,
};
