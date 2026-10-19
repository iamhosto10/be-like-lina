import { NextResponse, type NextRequest } from "next/server";
import { commerce } from "@/lib/commerce/config";
import { getPayment, verifyWebhookSignature } from "@/lib/commerce/mercadopago";
import { applyPayment } from "@/lib/commerce/process";

/**
 * Webhook de Mercado Pago (Tus integraciones → Webhooks → Notificaciones):
 *   URL:     https://<dominio>/api/mercadopago/webhook
 *   Eventos: Pagos
 * Mercado Pago solo envía el id del pago; aquí se valida la firma, se consulta el pago real a su
 * API y se aplica al pedido. Responder 200 le dice que ya no reintente; un 500 hace que reintente.
 */
export async function POST(req: NextRequest) {
  if (commerce.mode !== "mercadopago") {
    return NextResponse.json({ message: "Mercado Pago no está configurado" }, { status: 404 });
  }
  const secret = commerce.mercadopago.webhookSecret;
  if (!secret) {
    console.error(
      "[mercadopago] Falta MERCADOPAGO_WEBHOOK_SECRET: se rechazan las notificaciones.",
    );
    return NextResponse.json({ message: "Webhook sin configurar" }, { status: 500 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    type?: string;
    data?: { id?: string | number };
  };
  const dataId =
    req.nextUrl.searchParams.get("data.id") ?? (body.data?.id ? String(body.data.id) : null);
  const type =
    req.nextUrl.searchParams.get("type") ?? req.nextUrl.searchParams.get("topic") ?? body.type;

  const valid = verifyWebhookSignature({
    dataId: req.nextUrl.searchParams.get("data.id") ?? dataId,
    signature: req.headers.get("x-signature"),
    requestId: req.headers.get("x-request-id"),
    secret,
  });
  if (!valid) return NextResponse.json({ message: "Firma inválida" }, { status: 401 });

  // Solo nos interesan los pagos; el resto de eventos se confirma sin hacer nada.
  if (type !== "payment" || !dataId) return NextResponse.json({ ignored: true });

  try {
    const result = await applyPayment(await getPayment(dataId));
    return NextResponse.json(
      result.ok
        ? { ok: true, order: result.order.id, status: result.order.status }
        : { ignored: result.reason },
    );
  } catch (error) {
    console.error(`[mercadopago] Error procesando el pago ${dataId}:`, error);
    return NextResponse.json({ message: "Error procesando el pago" }, { status: 500 });
  }
}
