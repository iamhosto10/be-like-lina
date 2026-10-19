import { MAX_QUANTITY } from "@/data/shipping";
import { computeTotals } from "@/lib/commerce/totals";
import { getProduct } from "@/data/products";
import type { CartLine, OrderItem, PricedCart } from "@/lib/commerce/types";

export type PriceResult = ({ ok: true } & PricedCart) | { ok: false; error: string };

/**
 * Calcula el carrito con los precios del catálogo (`src/data/products.ts`). Es la única fuente
 * de precios: el servidor nunca usa un precio que venga del navegador.
 *
 * Las líneas repetidas se suman, las cantidades se acotan a MAX_QUANTITY y un producto que no
 * existe invalida el carrito (un enlace viejo o un intento de manipularlo).
 */
export function priceCart(lines: CartLine[]): PriceResult {
  const merged = new Map<string, number>();
  for (const line of lines) {
    if (!Number.isInteger(line.quantity) || line.quantity < 1) {
      return { ok: false, error: "Hay una cantidad no válida en el carrito." };
    }
    merged.set(line.slug, (merged.get(line.slug) ?? 0) + line.quantity);
  }
  if (merged.size === 0) return { ok: false, error: "Tu carrito está vacío." };

  const items: OrderItem[] = [];
  for (const [slug, quantity] of merged) {
    const product = getProduct(slug);
    if (!product) return { ok: false, error: "Un producto del carrito ya no está disponible." };
    if (quantity > MAX_QUANTITY) {
      return { ok: false, error: `Máximo ${MAX_QUANTITY} unidades por producto.` };
    }
    items.push({
      slug,
      name: product.name,
      variant: product.variant,
      unitPrice: product.price,
      quantity,
      digital: product.category === "digital",
      image: product.image?.src,
    });
  }

  return { ok: true, ...computeTotals(items) };
}

export { itemLabel } from "@/lib/commerce/pricing-label";
