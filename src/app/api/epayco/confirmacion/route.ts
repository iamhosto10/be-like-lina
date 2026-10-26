import { NextResponse, type NextRequest } from "next/server";
import { commerce } from "@/lib/commerce/config";
import {
  validateTransaction,
  verifyConfirmationSignature,
  type EpaycoFields,
} from "@/lib/commerce/epayco";
import { applyPayment } from "@/lib/commerce/process";

/**
 * Página de confirmación de ePayco (el «webhook»):
 *   URL: https://<dominio>/api/epayco/confirmacion
 * Se envía en cada pago desde el botón (campo `confirmation`). ePayco la llama con los datos de la
 * transacción; aquí se valida la firma y se vuelve a consultar la transacción a ePayco antes de
 * tocar el pedido. Responder 200 le dice que ya no reintente; un 500 hace que reintente.
 */
async function handle(fields: EpaycoFields) {
  if (commerce.mode !== "epayco") {
    return NextResponse.json({ message: "ePayco no está configurado" }, { status: 404 });
  }
  if (!verifyConfirmationSignature(fields)) {
    return NextResponse.json({ message: "Firma inválida" }, { status: 401 });
  }
  const ref = fields.x_ref_payco;
  if (!ref) return NextResponse.json({ ignored: "sin referencia" });

  try {
    // El estado sale de la API de ePayco, no de lo recibido.
    const result = await applyPayment(await validateTransaction(ref));
    return NextResponse.json(
      result.ok
        ? { ok: true, order: result.order.id, status: result.order.status }
        : { ignored: result.reason },
    );
  } catch (error) {
    console.error(`[epayco] Error procesando la transacción ${ref}:`, error);
    return NextResponse.json({ message: "Error procesando el pago" }, { status: 500 });
  }
}

const toFields = (entries: Iterable<[string, unknown]>) =>
  Object.fromEntries(
    [...entries].filter(([, v]) => typeof v === "string"),
  ) as unknown as EpaycoFields;

export async function POST(req: NextRequest) {
  const type = req.headers.get("content-type") ?? "";
  let fields: EpaycoFields;
  if (type.includes("application/json")) {
    const json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    fields = toFields(Object.entries(json));
  } else {
    const form = await req.formData().catch(() => null);
    fields = toFields(form ? [...form.entries()] : []);
  }
  return handle(fields);
}

/** ePayco permite configurar la confirmación por GET; se acepta igual. */
export async function GET(req: NextRequest) {
  return handle(toFields(req.nextUrl.searchParams.entries()));
}
