import { Fragment } from "react";
import Link from "next/link";

/** Fragmentos: **negrita** y [etiqueta](enlace). */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

const linkClass =
  "font-medium text-primary underline underline-offset-4 outline-none transition-colors hover:text-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm break-words";

/**
 * Texto con formato mínimo en línea. Los datos legales se guardan como cadenas
 * planas; esto evita meter JSX en `src/data` y mantiene el contenido editable.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          if (href.startsWith("/")) {
            return (
              <Link key={i} href={href} className={linkClass}>
                {label}
              </Link>
            );
          }
          const external = href.startsWith("http");
          return (
            <a
              key={i}
              href={href}
              className={linkClass}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Texto plano (sin marcas) para datos estructurados y `llms.txt`. */
export function stripRichText(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
