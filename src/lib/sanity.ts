import "server-only";
// Se importa de @sanity/client y no de "next-sanity": la raíz de next-sanity re-exporta
// componentes de cliente que terminan en el JavaScript del navegador (~55 KB gzip).
import { createClient, type QueryParams } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-07-30";

/**
 * Sin Project ID el sitio funciona igual con el contenido local de `src/data` (ver `lib/blog.ts`).
 * Así un despliegue nunca se rompe por una variable de entorno que falta.
 */
export const isSanityConfigured = projectId.length > 0;

// useCdn: false porque la caché la lleva Next (Data Cache + tags) y se invalida con el
// webhook de /api/revalidate; el CDN de Sanity sería un segundo nivel de caché.
const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published", // los borradores nunca llegan al sitio
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

/**
 * fetch con tags de caché. Convención: "global-data" siempre, más "all-<tipo>" en
 * listados y "<tipo>-<slug>" en detalle. En Next 16 el caché de fetch es opt-in, de ahí
 * `cache: "force-cache"`.
 */
export function sanityFetch<T>(query: string, params: QueryParams = {}, tags: string[] = []) {
  if (!client) {
    throw new Error("Sanity no está configurado: falta NEXT_PUBLIC_SANITY_PROJECT_ID.");
  }
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: { tags: ["global-data", ...tags] },
  });
}
