import type { Metadata } from "next";
import { lina } from "@/data/lina";
import { site } from "@/data/site";

/** Imagen para compartir (la misma del layout). */
export const shareImage = {
  url: lina.images.og.src,
  width: lina.images.og.width,
  height: lina.images.og.height,
  alt: lina.images.og.alt,
};

/** Metadatos de una página de texto: título, descripción, canonical y Open Graph. */
export function legalMetadata(page: {
  slug: string;
  title: string;
  description: string;
}): Metadata {
  const path = `/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.title} · ${site.name}`,
      description: page.description,
      url: path,
      // El `openGraph` de una página reemplaza al del layout, así que la imagen se repite aquí.
      images: [shareImage],
    },
  };
}
