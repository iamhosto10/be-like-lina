import Image from "next/image";
import { BookOpen } from "lucide-react";
import { cn } from "cn";
import { formatCOP } from "@/lib/format";
import { externalProductUrl } from "@/lib/links";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** `sizes` de next/image según la rejilla en la que se use. */
  sizes: string;
  className?: string;
}

/**
 * Tarjeta de producto: toda la tarjeta es un enlace a la ficha del producto
 * (hoy en la tienda actual, donde vive el botón real de compra).
 */
export function ProductCard({ product, sizes, className }: ProductCardProps) {
  const label = product.variant ? `${product.name} · ${product.variant}` : product.name;

  return (
    <a
      href={externalProductUrl(product.externalSlug)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver ${label} en la tienda`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow] outline-none",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-brand-ice">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes={sizes}
            className="absolute inset-0 size-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
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
      </div>
    </a>
  );
}
