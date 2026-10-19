/**
 * Datos públicos del proyecto de Sanity. No son secretos: el Project ID y el dataset aparecen en
 * cada URL de imagen del CDN. Tienen valor por defecto para que el sitio funcione aunque la
 * variable de entorno no esté definida en el entorno de construcción (Vercel, local, CI).
 * Las variables `NEXT_PUBLIC_SANITY_*` siguen mandando si existen (por ejemplo para apuntar a
 * otro dataset de pruebas).
 *
 * Este archivo no importa "server-only" a propósito: también lo usa el cargador de imágenes
 * que corre en el navegador (lib/sanityImage.ts).
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9rzaao18";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-07-30";
