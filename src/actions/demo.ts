"use server";

import { randomUUID } from "node:crypto";
import { notFound, redirect } from "next/navigation";
import { commerce } from "@/lib/commerce/config";
import { applyPayment } from "@/lib/commerce/process";
import { getOrder } from "@/lib/commerce/store";

const outcomes = {
  approved: { status: "approved", statusDetail: "accredited" },
  rejected: { status: "rejected", statusDetail: "cc_rejected_other_reason" },
  pending: { status: "in_process", statusDetail: "pending_review_manual" },
} as const;

/**
 * Modo demostración: simula la respuesta de Mercado Pago y pasa por el MISMO procesamiento
 * que el webhook real (`applyPayment`), incluidos los correos. Solo existe con CHECKOUT_DEMO_MODE.
 */
export async function completeDemoPayment(formData: FormData): Promise<void> {
  if (commerce.mode !== "demo") notFound();

  const orderId = String(formData.get("orderId") ?? "");
  const outcome = outcomes[String(formData.get("outcome")) as keyof typeof outcomes];
  const order = await getOrder(orderId);
  if (!order || order.mode !== "demo" || !outcome) notFound();

  await applyPayment({
    id: `demo-${randomUUID().slice(0, 8)}`,
    ...outcome,
    method: "demo",
    amount: order.total,
    currency: "COP",
    externalReference: order.id,
  });

  redirect(`/checkout/resultado/${order.id}`);
}
