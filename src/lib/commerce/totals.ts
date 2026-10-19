import { shipping } from "@/data/shipping";
import type { OrderItem, PricedCart } from "@/lib/commerce/types";

/**
 * Subtotal, envío y total de una lista de líneas ya resueltas. Es una función pura y pequeña:
 * la usan el servidor (con precios del catálogo) y el navegador (para mostrar el carrito) con
 * la misma regla, así lo que se ve coincide con lo que se cobra.
 */
export function computeTotals(items: OrderItem[]): PricedCart {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const hasPhysical = items.some((i) => !i.digital);
  const hasDigital = items.some((i) => i.digital);
  const free = shipping.freeOver !== null && subtotal >= shipping.freeOver;
  const shippingCost = hasPhysical && !free ? shipping.flatRate : 0;
  return {
    items,
    subtotal,
    shipping: shippingCost,
    total: subtotal + shippingCost,
    hasPhysical,
    hasDigital,
  };
}
