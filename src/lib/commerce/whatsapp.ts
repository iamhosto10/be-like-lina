import { site } from "@/data/site";
import { itemLabel } from "@/lib/commerce/pricing-label";
import { formatCOP } from "@/lib/format";
import { whatsappLink } from "@/lib/commerce/phone";
import type { Order } from "@/lib/commerce/types";

/** Mensaje con el resumen del pedido, para enviárselo a Lina por WhatsApp una vez pagado. */
export function orderWhatsappMessage(order: Order): string {
  const c = order.customer;
  const a = order.shippingAddress;
  const lines = [
    `¡Hola Lina! Acabo de pagar mi pedido ${order.id} en la tienda.`,
    "",
    "Compré:",
    ...order.items.map(
      (i) =>
        `• ${i.quantity} × ${itemLabel(i)}${i.digital ? " (digital)" : ""} — ${formatCOP(i.unitPrice * i.quantity)}`,
    ),
    "",
    order.hasPhysical ? `Envío: ${formatCOP(order.shipping)}` : "Envío: no aplica (solo digital)",
    `Total pagado: ${formatCOP(order.total)} COP`,
    "",
    `Nombre: ${c.firstName} ${c.lastName}`.trim(),
    `Celular: ${c.phone}`,
    `Correo: ${c.email}`,
    ...(a
      ? [
          `Dirección: ${[a.address, a.details].filter(Boolean).join(", ")} — ${a.city}, ${a.department}`,
        ]
      : []),
    ...(a?.notes ? [`Notas: ${a.notes}`] : []),
  ];
  return lines.join("\n");
}

export const orderWhatsappUrl = (order: Order): string =>
  whatsappLink(site.contact.whatsappNumber, orderWhatsappMessage(order)) as string;
