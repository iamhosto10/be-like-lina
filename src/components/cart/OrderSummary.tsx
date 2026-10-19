import { formatCOP } from "@/lib/format";
import { itemLabel } from "@/lib/commerce/pricing-label";
import type { OrderItem } from "@/lib/commerce/types";

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  hasPhysical: boolean;
}

/** Lista de productos con subtotal, envío y total. La usan el checkout, el resultado y la demo. */
export function OrderSummary({ items, subtotal, shipping, total, hasPhysical }: OrderSummaryProps) {
  return (
    <div className="text-sm">
      <ul className="divide-y divide-border" aria-label="Productos">
        {items.map((item) => (
          <li key={item.slug} className="flex justify-between gap-4 py-3">
            <span className="min-w-0">
              <span className="font-semibold">{itemLabel(item)}</span>
              <span className="block text-xs text-muted-foreground">
                {item.quantity} × {formatCOP(item.unitPrice)}
                {item.digital ? " · digital" : ""}
              </span>
            </span>
            <span className="font-semibold whitespace-nowrap tabular-nums">
              {formatCOP(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
        <div className="flex justify-between text-muted-foreground">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatCOP(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <dt>Envío</dt>
          <dd className="tabular-nums">
            {!hasPhysical ? "No aplica" : shipping > 0 ? formatCOP(shipping) : "Gratis"}
          </dd>
        </div>
        <div className="flex justify-between pt-1 text-base font-bold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatCOP(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
