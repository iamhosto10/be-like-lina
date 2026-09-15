import type { ImageAsset } from "@/types";

/** Datos de la fundadora para «Sobre Lina», avatar y metadatos. */
export const lina = {
  name: "Lina Fuentes",
  role: "Entrenadora integral para la mujer",
  credentials: "Certificada en nutrición y entrenamiento personalizado",
  since: 2021,
  story:
    "Creé Be Like Lina en 2021, después de mi propio proceso de salud, cuando entendí que la salud es la base de todo. Soy entrenadora integral y estoy certificada en nutrición y entrenamiento.",
  images: {
    portrait: {
      src: "/images/lina/retrato.webp",
      alt: "Retrato de Lina Fuentes",
      width: 1000,
      height: 1250,
    } satisfies ImageAsset,
    avatar: {
      src: "/images/lina/avatar.webp",
      alt: "Lina Fuentes",
      width: 600,
      height: 600,
    } satisfies ImageAsset,
    og: {
      src: "/images/lina/og.jpg",
      alt: "Be Like Lina — Lina Fuentes, entrenadora integral para la mujer",
      width: 1200,
      height: 630,
    } satisfies ImageAsset,
  },
};
