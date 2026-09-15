import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF primero (mejor compresión), WebP de respaldo. Next elige según el header Accept.
    formats: ["image/avif", "image/webp"],
    // Calidades permitidas. 75 por defecto; 85 para el hero (LCP).
    qualities: [75, 85],
  },
};

export default nextConfig;
