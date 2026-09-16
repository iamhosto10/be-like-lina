import type { NextConfig } from "next";
import { withCn } from "cn/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF primero (mejor compresión), WebP de respaldo. Next elige según el header Accept.
    formats: ["image/avif", "image/webp"],
    // Calidades permitidas. 75 por defecto; 85 para el hero (LCP).
    qualities: [75, 85],
  },
};

/*
 * withCn compila en build las tablas de resolución de clases de `cn` a partir
 * de las clases que realmente usa el proyecto, en vez de enviar las tablas
 * completas de Tailwind al navegador.
 */
export default withCn(nextConfig, { content: ["src/**/*.{ts,tsx}"] });
