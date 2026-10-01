import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { cn } from "cn";
import { formatCOP } from "@/lib/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** `sizes` de next/image según la rejilla en la que se use. */
  sizes: string;
  /** Carga inmediata: solo para las tarjetas visibles al entrar (candidatas a LCP). */
  eager?: boolean;
  className?: string;
}

/**
 * Tarjeta de producto: toda la tarjeta enlaza a su página en /tienda/[slug],
 * donde está la ficha completa y el botón de compra.
 */
export function ProductCard({ product, sizes, eager = false, className }: ProductCardProps) {
  const darkPhoto = product.imageTone === "dark";

  return (
    <Link
      href={`/tienda/${product.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow] outline-none",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden",
          darkPhoto ? "bg-brand-night" : "bg-brand-ice",
        )}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className={cn(
              "absolute inset-0 size-full transition-transform duration-300 group-hover:scale-[1.04]",
              darkPhoto ? "object-cover" : "object-contain p-4",
            )}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-brand-plum/40"
          >
            <BookOpen className="size-12" strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-5 text-center">
        <p className="text-sm leading-snug font-semibold">
          {product.name}
          {product.variant && (
            <>
              <br />
              <span className="font-medium">{product.variant}</span>
            </>
          )}
        </p>
        <p className="mt-auto text-base font-bold tabular-nums">{formatCOP(product.price)}</p>
        <span className="sr-only">Ver producto</span>
      </div>
    </Link>
  );
}
