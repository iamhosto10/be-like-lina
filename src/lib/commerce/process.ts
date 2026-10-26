import "server-only";
import { claim, getOrder, release, saveOrder } from "@/lib/commerce/store";
import { customerEmail, fulfillmentEmail, sendEmail } from "@/lib/commerce/emails";
import type { GatewayPayment } from "@/lib/commerce/epayco";
import type { Order, OrderStatus } from "@/lib/commerce/types";

/** Estado normalizado del pago (ver epayco.ts) → estado del pedido. */
function mapStatus(status: string): OrderStatus {
  switch (status) {
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "cancelled":
      return "cancelled";
    case "refunded":
    case "charged_back":
      return "refunded";
    default:
      return "in_process"; // pending, in_process, authorized, in_mediation…
  }
}

export type ApplyResult =
  | { ok: true; order: Order }
  | { ok: false; reason: "order_not_found" | "currency" | "amount_mismatch" };

/**
 * Aplica el resultado de un pago a su pedido. Lo llaman por igual el webhook de ePayco, la página de resultado y
 * el modo demostración, así que se prueba el mismo camino que en producción.
 *
 * - Es idempotente: ePayco reenvía notificaciones, y los correos salen una sola vez.
 * - Si un envío falla, lanza el error (el webhook responde 500 y ePayco reintenta), y solo se
 *   repite el correo que falló.
 */
export async function applyPayment(payment: GatewayPayment): Promise<ApplyResult> {
  if (!payment.externalReference) return { ok: false, reason: "order_not_found" };
  const order = await getOrder(payment.externalReference);
  if (!order) return { ok: false, reason: "order_not_found" };
  if (payment.currency && payment.currency !== "COP") return { ok: false, reason: "currency" };

  const next = mapStatus(payment.status);

  // El monto cobrado tiene que coincidir con el del pedido; si no, no se da por pagado.
  if (next === "approved" && Math.round(payment.amount) !== order.total) {
    console.error(
      `[pedido ${order.id}] monto distinto: cobrado ${payment.amount}, esperado ${order.total}. No se confirma.`,
    );
    return { ok: false, reason: "amount_mismatch" };
  }

  // Las notificaciones pueden llegar desordenadas: un pedido pagado no vuelve a «pendiente».
  const keepApproved =
    order.status === "approved" && (next === "in_process" || next === "rejected");
  const updated: Order = {
    ...order,
    status: keepApproved ? "approved" : next,
    payment: {
      id: payment.id,
      status: payment.status,
      statusDetail: payment.statusDetail,
      method: payment.method,
      amount: payment.amount,
    },
  };
  await saveOrder(updated);

  if (updated.status === "approved") await notifyOnce(updated);
  return { ok: true, order: (await getOrder(order.id)) ?? updated };
}

async function notifyOnce(order: Order): Promise<void> {
  const steps = [
    { key: `notify:${order.id}:customer`, send: () => sendEmail(customerEmail(order)) },
    { key: `notify:${order.id}:fulfillment`, send: () => sendEmail(fulfillmentEmail(order)) },
  ];

  for (const step of steps) {
    if (!(await claim(step.key))) continue; // ya se envió (o se está enviando)
    try {
      await step.send();
    } catch (error) {
      await release(step.key); // permite que el reintento de ePayco lo vuelva a probar
      throw error;
    }
  }

  const fresh = (await getOrder(order.id)) ?? order;
  if (!fresh.notifiedAt) await saveOrder({ ...fresh, notifiedAt: new Date().toISOString() });
}
