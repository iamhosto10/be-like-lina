import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { site } from "@/data/site";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Precarga la imagen (solo en el header, que es LCP-cercano). */
  eager?: boolean;
  /** «rosa»: el del PDF de marca, para fondos claros (header). «blanco»: para ciruela (footer). */
  variant?: "rosa" | "blanco";
}

/** Alto del logo por tamaño. El ancho se deriva de la proporción 384×139. */
const heights = { sm: "h-9", md: "h-10 md:h-12", lg: "h-12 md:h-14" } as const;

const LOGOS = {
  rosa: { src: "/images/logo/logo-rosado.webp", width: 384, height: 139 },
  blanco: { src: "/images/logo/logo-blanco.webp", width: 384, height: 139 },
} as const;

/** Logotipo oficial (símbolo + «BE LIKE LINA») en rosa (#F28CBF, como el PDF) o en blanco. */
export function Logo({ className, size = "md", eager = false, variant = "rosa" }: LogoProps) {
  const LOGO = LOGOS[variant];
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <Image
        src={LOGO.src}
        alt=""
        width={LOGO.width}
        height={LOGO.height}
        sizes="(min-width: 768px) 166px, 138px"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={cn("w-auto", heights[size])}
      />
    </Link>
  );
}
