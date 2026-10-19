import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { commerce } from "@/lib/commerce/config";
import { itemLabel } from "@/lib/commerce/pricing";
import { toWhatsappNumber } from "@/lib/commerce/phone";
import type { Order } from "@/lib/commerce/types";

/**
 * Cliente mínimo de Mercado Pago (Checkout Pro) con `fetch`; no hace falta el SDK.
 *  - createPreference: crea la «preferencia» y devuelve la URL a la que se manda al cliente.
 *  - getPayment:       consulta un pago (el webhook solo trae su id; el estado se pregunta a la API).
 *  - verifyWebhookSignature: comprueba la cabecera x-signature con la clave secreta del webhook.
 * Documentación: https://www.mercadopago.com.co/developers/es/docs/checkout-pro
 */

async function mp<T>(path: string, init?: RequestInit): Promise<T> {
  const { accessToken, apiUrl } = commerce.mercadopago;
  if (!accessToken) throw new Error("Falta MERCADOPAGO_ACCESS_TOKEN.");
  const res = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Mercado Pago ${res.status} en ${path}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point?: string;
}

export async function createPreference(order: Order, siteUrl: string) {
  // Mercado Pago solo acepta direcciones https públicas para el retorno y las notificaciones.
  const isPublic = siteUrl.startsWith("https://");
  const back = `${siteUrl}/checkout/resultado/${order.id}`;
  const phone = toWhatsappNumber(order.customer.phone);

  const items = order.items.map((item) => ({
    id: item.slug,
    title: itemLabel(item),
    description: item.digital ? "Producto digital (se envía por correo)" : "Producto físico",
    quantity: item.quantity,
    currency_id: "COP",
    unit_price: item.unitPrice,
    ...(isPublic && item.image && { picture_url: `${siteUrl}${item.image}` }),
  }));
  if (order.shipping > 0) {
    items.push({
      id: "envio",
      title: "Envío",
      description: "Costo de envío",
      quantity: 1,
      currency_id: "COP",
      unit_price: order.shipping,
    });
  }

  const data = await mp<PreferenceResponse>("/checkout/preferences", {
    method: "POST",
    body: JSON.stringify({
      items,
      payer: {
        name: order.customer.firstName,
        surname: order.customer.lastName,
        email: order.customer.email,
        ...(phone && { phone: { area_code: phone.slice(0, 2), number: phone.slice(2) } }),
        ...(order.customer.document && {
          identification: { type: "CC", number: order.customer.document },
        }),
      },
      external_reference: order.id,
      statement_descriptor: "BELIKELINA",
      metadata: { order_id: order.id },
      back_urls: { success: back, pending: back, failure: back },
      ...(isPublic && {
        auto_return: "approved",
        notification_url: `${siteUrl}/api/mercadopago/webhook`,
      }),
    }),
  });

  const url =
    commerce.mercadopago.useSandboxUrl && data.sandbox_init_point
      ? data.sandbox_init_point
      : data.init_point;
  return { preferenceId: data.id, url };
}

interface PaymentResponse {
  id: number | string;
  status: string;
  status_detail?: string;
  transaction_amount: number;
  currency_id?: string;
  external_reference?: string | null;
  payment_method_id?: string;
}

/** Pago ya normalizado, igual para Mercado Pago y para el modo demostración. */
export interface GatewayPayment {
  id: string;
  status: string;
  statusDetail?: string;
  method?: string;
  amount: number;
  currency?: string;
  externalReference?: string;
}

export async function getPayment(id: string): Promise<GatewayPayment> {
  const p = await mp<PaymentResponse>(`/v1/payments/${encodeURIComponent(id)}`);
  return {
    id: String(p.id),
    status: p.status,
    statusDetail: p.status_detail,
    method: p.payment_method_id,
    amount: p.transaction_amount,
    currency: p.currency_id,
    externalReference: p.external_reference ?? undefined,
  };
}

/**
 * Valida la firma de una notificación (cabecera `x-signature: ts=…,v1=…`).
 * Mercado Pago firma con HMAC-SHA256 el texto  `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`
 * usando la clave secreta del webhook.
 */
export function verifyWebhookSignature(params: {
  dataId: string | null;
  signature: string | null;
  requestId: string | null;
  secret: string;
}): boolean {
  const { dataId, signature, requestId, secret } = params;
  if (!signature) return false;

  const parts = Object.fromEntries(
    signature.split(",").map((kv) => {
      const [k, ...v] = kv.trim().split("=");
      return [k, v.join("=")];
    }),
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  // Si el id es alfanumérico, Mercado Pago lo firma en minúsculas.
  const id = dataId && /^[a-z0-9]+$/i.test(dataId) ? dataId.toLowerCase() : (dataId ?? "");
  const manifest = `id:${id};request-id:${requestId ?? ""};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}
