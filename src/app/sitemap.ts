import type { MetadataRoute } from "next";
import { lina } from "@/data/lina";
import { sortedProducts } from "@/data/products";
import { site } from "@/data/site";
import { getPostSlugs } from "@/lib/blog";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/site-url";

/**
 * Home, tienda, ficha de cada producto, páginas legales y los artículos publicados en Sanity.
 * /blog y las páginas «próximamente» llevan `noindex` mientras no hay artículos, y no aparecen.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexable) return [];
  const posts = await getPostSlugs();

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
    ...(posts.length > 0
      ? [
          {
            url: `${siteUrl}/blog`,
            lastModified: new Date(posts[0].updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
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
