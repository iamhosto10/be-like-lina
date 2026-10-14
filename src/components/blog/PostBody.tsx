import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "@/components/blog/SanityImage";
import type { SanityImageSource } from "@/lib/sanityImage";
import type { PortableTextBlock } from "@portabletext/react";

interface BodyImage {
  _type: "image";
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
  dimensions?: { width: number; height: number };
}

const linkClass =
  "font-medium text-primary underline underline-offset-4 outline-none transition-colors hover:text-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm break-words";

/** Estilos del texto enriquecido con el diseño del sitio (se pinta sobre fondo claro). */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 text-xl font-bold tracking-tight md:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary pl-5 text-lg font-medium italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 marker:text-primary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={linkClass}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => {
      if (!value.asset) return null;
      const { width, height } = value.dimensions ?? { width: 1200, height: 800 };
      return (
        <figure className="my-9">
          <SanityImage
            image={value as unknown as SanityImageSource}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            sizes="(min-width: 768px) 48rem, 100vw"
            className="h-auto w-full rounded-xl"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] md:text-lg">
      <PortableText value={value} components={components} />
    </div>
  );
}
