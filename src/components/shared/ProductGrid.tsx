import { ProductCard } from "@/components/shared/ProductCard";
import type { Product } from "@/types";

/** Rejilla de productos: 2 columnas en móvil, 3 en tablet, 4 en escritorio. */
export function ProductGrid({
  products,
  label,
  eagerCount = 0,
}: {
  products: Product[];
  label: string;
  /** Nº de imágenes que se cargan de inmediato (solo en la primera rejilla de la página). */
  eagerCount?: number;
}) {
  return (
    <ul
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
      aria-label={label}
    >
      {products.map((product, i) => (
        <li key={product.slug}>
          <ProductCard
            product={product}
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
            /* Las dos primeras entran en pantalla sin desplazarse: son las candidatas a LCP. */
            eager={eagerCount > 0 && i < 2}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}
