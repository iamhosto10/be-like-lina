import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { formatCOP } from "@/lib/format";
import type { Product } from "@/types";

interface RecipeProductCardProps {
  product: Product;
  /** Etiqueta corta sobre el nombre ("Guía digital"). */
  label: string;
  className?: string;
}

/**
 * Tarjeta de un producto digital. En móvil es horizontal (foto a la izquierda, datos a la
 * derecha); desde `sm` es vertical, con la foto a todo el ancho arriba y el botón al fondo,
 * para que ocupe bien el alto de la fila y nunca deje un hueco bajo una foto pequeña.
 */
export function RecipeProductCard({ product, label, className }: RecipeProductCardProps) {
  return (
    <Link
      href={`/tienda/${product.slug}`}
      className={cn(
        "group grid grid-cols-[42%_1fr] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-colors outline-none sm:flex sm:flex-col",
        "hover:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <div className="relative aspect-square w-full shrink-0 bg-brand-deep">
        {product.image && (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 40vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-col justify-center gap-2 p-4 sm:flex-1 sm:justify-start sm:p-5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <h3 className="text-base leading-snug font-semibold">{product.name}</h3>
        <p className="text-base font-bold tabular-nums">{formatCOP(product.price)}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary sm:mt-auto sm:pt-2">
          Comprar ahora
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
