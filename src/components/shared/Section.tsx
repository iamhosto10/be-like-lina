import type { ComponentPropsWithoutRef } from "react";
import { cn } from "cn";

/**
 * Tonos de sección. Cada uno activa un juego completo de tokens semánticos
 * en globals.css (fondo, texto, tarjetas, botón primario, bordes…).
 *
 *  dark   → Morado Noche  · hero, tienda, blog, CTA final
 *  wine   → Morado Vino   · recetas, testimonios
 *  light  → Rosa Hielo    · tienda, planes, FAQ (secciones de respiro)
 *  plum   → Ciruela       · captación (punto alto)
 *  deep   → Morado Prof.  · footer
 */
export type Tone = "dark" | "wine" | "light" | "plum" | "deep";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone: Tone;
  /** Sin padding vertical (el hero lo gestiona por su cuenta). */
  flush?: boolean;
  /** Si es false, el contenido no se envuelve en `.container-site`. */
  contained?: boolean;
}

export function Section({
  tone,
  flush = false,
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("bg-background text-foreground", !flush && "py-16 md:py-24", className)}
      {...rest}
    >
      {contained ? <div className="container-site">{children}</div> : children}
    </section>
  );
}
