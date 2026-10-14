"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { urlFor, type SanityImageSource } from "@/lib/sanityImage";

// El CDN de Sanity redimensiona y convierte a WebP/AVIF por URL, así que next/image solo
// genera el srcset y no consume la cuota de optimización de imágenes de Vercel.
function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}

type SanityImageProps = Omit<ImageProps, "src" | "loader"> & {
  image: SanityImageSource;
};

export function SanityImage({ image, alt, ...props }: SanityImageProps) {
  return <Image src={urlFor(image).url()} loader={sanityLoader} alt={alt} {...props} />;
}
