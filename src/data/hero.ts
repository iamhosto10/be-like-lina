import type { ImageAsset } from "@/types";

/**
 * Texto FIJO del hero, aprobado por la clienta. No se reescribe.
 * `highlight` es la línea que va en color primario.
 */
export const hero = {
  headline: {
    before: "Construye una",
    highlight: "versión de ti",
    after: "que te haga sentir bien.",
  },
  subtitle:
    "Entrenamientos inteligentes, nutrición real y mentalidad para transformar tu cuerpo y tu vida.",
  primaryCta: { label: "Empieza hoy", href: "/#planes" },
  videoCta: { label: "Ver video" },
  pillars: [
    { icon: "dumbbell", label: "Entrenamientos inteligentes" },
    { icon: "utensils", label: "Nutrición real" },
    { icon: "heart", label: "Mentalidad fuerte" },
  ] as const,
  floatingCard: {
    title: "Resultados reales",
    subtitle: "Para mujeres reales",
  },
  /** Firma decorativa en cursiva. */
  signature: "Be Like Lina",
  images: {
    cutout: {
      src: "/images/hero/lina-cutout.webp",
      alt: "Lina Fuentes, entrenadora, de pie con enterizo deportivo negro",
      width: 1200,
      height: 1097,
    } satisfies ImageAsset,
    wide: {
      src: "/images/hero/lina-wide.webp",
      alt: "Lina Fuentes, entrenadora, de pie en estudio con fondo oscuro",
      width: 1672,
      height: 941,
    } satisfies ImageAsset,
    full: {
      src: "/images/hero/lina-full.webp",
      alt: "Lina Fuentes, entrenadora, de cuerpo completo en estudio",
      width: 1086,
      height: 1448,
    } satisfies ImageAsset,
  },
};
