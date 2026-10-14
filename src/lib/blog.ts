import { isSanityConfigured, sanityFetch } from "@/lib/sanity";
import type { PostDetail, PostSummary } from "@/types";

/**
 * Consultas del blog (GROQ). Las proyecciones son explícitas: los listados NO traen el
 * cuerpo del artículo (la Data Cache de Next no guarda respuestas de más de 2 MB).
 * Solo se leen documentos publicados con slug y fecha.
 */
const published = `_type == "post" && defined(slug.current) && defined(publishedAt)`;

const summaryFields = `
  "slug": slug.current,
  title,
  category,
  excerpt,
  publishedAt,
  "cover": select(defined(coverImage.asset) => { "image": coverImage{ asset, crop, hotspot }, "alt": coalesce(coverImage.alt, title) })
`;

export const queries = {
  posts: `*[${published}] | order(publishedAt desc)[0...$limit]{ ${summaryFields} }`,
  post: `*[${published} && slug.current == $slug][0]{
    ${summaryFields},
    "updatedAt": _updatedAt,
    "relatedProductSlugs": coalesce(relatedProducts, []),
    cta,
    "body": coalesce(body[]{
      ...,
      _type == "image" => { ..., "dimensions": asset->metadata.dimensions }
    }, [])
  }`,
  slugs: `*[${published}]{ "slug": slug.current, "updatedAt": _updatedAt }`,
};

/**
 * Artículos publicados, del más reciente al más antiguo. Devuelve [] si Sanity no está
 * configurado o no hay ninguno: quien llama decide si muestra el relleno.
 */
export async function getPosts(limit = 100): Promise<PostSummary[]> {
  if (!isSanityConfigured) return [];
  return sanityFetch<PostSummary[]>(queries.posts, { limit }, ["all-post"]);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  if (!isSanityConfigured) return null;
  return sanityFetch<PostDetail | null>(queries.post, { slug }, [`post-${slug}`]);
}

/** Para `generateStaticParams` y el sitemap: solo slug y fecha de modificación. */
export async function getPostSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  if (!isSanityConfigured) return [];
  return sanityFetch(queries.slugs, {}, ["all-post"]);
}
