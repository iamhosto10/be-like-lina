import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { site } from "@/data/site";

const ROMAN: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** 1 → "I", 4 → "IV", 9 → "IX"… (las secciones del home no pasan de 10). */
function toRoman(n: number): string {
  let rest = n;
  let out = "";
  for (const [value, symbol] of ROMAN) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

interface SectionHeaderProps {
  /** Número de sección del home; se muestra en romanos si `site.showSectionNumbers`. */
  number?: number;
  title: string;
  subtitle?: string;
  /** Enlace a la derecha ("Ver toda la tienda →"). */
  action?: { label: string; href: string; external?: boolean };
  /** Id del título, para `aria-labelledby` en la sección. */
  titleId?: string;
  className?: string;
}

export function SectionHeader({
  number,
  title,
  subtitle,
  action,
  titleId,
  className,
}: SectionHeaderProps) {
  const showNumber = site.showSectionNumbers && typeof number === "number";
  const actionClass =
    "group inline-flex items-center gap-1.5 text-sm font-semibold text-primary whitespace-nowrap rounded-sm outline-none transition-colors hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 md:mb-10",
        className,
      )}
    >
      <div>
        <h2 id={titleId} className="text-2xl font-bold tracking-tight uppercase md:text-3xl">
          {showNumber && <span aria-hidden>{toRoman(number)}. </span>}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{subtitle}</p>
        )}
      </div>

      {action &&
        (action.external ? (
          <a href={action.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
            {action.label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        ) : (
          <Link href={action.href} className={actionClass}>
            {action.label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ))}
    </div>
  );
}
