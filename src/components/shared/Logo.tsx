import Link from "next/link";
import { cn } from "cn";
import { site } from "@/data/site";

interface LogoProps {
  className?: string;
  /** Tamaño del texto. */
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-lg",
  md: "text-xl md:text-2xl",
  lg: "text-2xl md:text-3xl",
} as const;

/** Logotipo tipográfico: "BE LIKE" en el color de texto y "LINA" en el color primario. */
export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={cn(
        "inline-flex items-baseline gap-[0.35em] font-heading font-extrabold tracking-wide uppercase select-none",
        "rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        sizes[size],
        className,
      )}
    >
      <span className="text-foreground">Be Like</span>
      <span className="text-primary">Lina</span>
    </Link>
  );
}
