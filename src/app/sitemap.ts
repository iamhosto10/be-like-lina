import type { MetadataRoute } from "next";
import { lina } from "@/data/lina";
import { sortedProducts } from "@/data/products";
import { site } from "@/data/site";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/site-url";

/**
 * Home, tienda, la ficha de cada producto y las páginas legales. /blog y las páginas «próximamente»
 * llevan `noindex` y por eso no aparecen aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl(lina.images.og.src)],
    },
    {
      url: `${siteUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...site.legal.map((page) => ({
      url: `${siteUrl}${page.href}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...sortedProducts.map((product) => ({
      url: `${siteUrl}/tienda/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(product.image && { images: [absoluteUrl(product.image.src)] }),
    })),
  ];
}
