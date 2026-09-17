import { site } from "@/data/site";

/**
 * URL base absoluta del despliegue actual, resuelta en tiempo de build:
 *   1. NEXT_PUBLIC_SITE_URL   → override manual (p. ej. https://nuevo.belikelina.com)
 *   2. VERCEL_PROJECT_PRODUCTION_URL → dominio de producción que Vercel inyecta solo
 *   3. localhost              → desarrollo
 * Se usa para metadataBase, canonical, Open Graph, sitemap, robots y JSON-LD.
 */
function resolveSiteUrl(): string {
  const manual = process.env.NEXT_PUBLIC_SITE_URL;
  if (manual) return manual.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/**
 * Solo se permite indexar cuando el sitio vive en su dominio definitivo (`site.url`).
 * En la URL de Vercel o en un subdominio de pruebas se envía `noindex` y `robots.txt`
 * bloquea a los rastreadores: así el sitio nuevo no compite ni duplica a belikelina.com
 * mientras el WordPress siga en línea. Al conectar el dominio, se activa solo.
 */
export const isIndexable = siteUrl === site.url;

/** Convierte una ruta interna ("/images/lina/og.jpg") en URL absoluta. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}
