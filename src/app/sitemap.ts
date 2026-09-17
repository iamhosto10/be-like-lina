import type { MetadataRoute } from "next";
import { lina } from "@/data/lina";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/site-url";

/**
 * Solo el home por ahora: /blog y las páginas «próximamente» llevan `noindex`
 * y no deben aparecer aquí. Al crear páginas internas, se añaden en esta lista.
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
  ];
}
