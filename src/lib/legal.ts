import type { Metadata } from "next";
import { site } from "@/data/site";

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
    },
  };
}
