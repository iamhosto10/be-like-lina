import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { commerce } from "@/lib/commerce/config";

/**
 * Cliente mínimo de ePayco (Checkout estándar) con `fetch`.
 *  - El cliente paga en la ventana segura de ePayco (se abre desde /checkout/pagar/[pedido]).
 *  - verifyConfirmationSignature: comprueba la firma `x_signature` de la confirmación (webhook).
 *  - validateTransaction:         consulta la transacción a ePayco; el estado SIEMPRE sale de aquí,
 *                                 nunca de lo que diga quien llama a nuestra URL.
 * Documentación: https://docs.epayco.co/
 */

/** Pago ya normalizado, igual para ePayco y para el modo demostración. */
export interface GatewayPayment {
  id: string;
  /** approved | rejected | cancelled | refunded | in_process */
  status: string;
  statusDetail?: string;
  method?: string;
  amount: number;
  currency?: string;
  externalReference?: string;
}

/** x_cod_response de ePayco → estado interno. */
function mapCode(code: number): string {
  switch (code) {
    case 1:
      return "approved";
    case 2: // rechazada
    case 4: // fallida
    case 12: // antifraude
      return "rejected";
    case 9: // expirada
    case 10: // abandonada
    case 11: // cancelada
      return "cancelled";
    case 6: // reversada
      return "refunded";
    default:
      return "in_process"; // 3 pendiente, 7 retenida, 8 iniciada…
  }
}

/** Campos `x_*` que ePayco devuelve en la confirmación y en la API de validación. */
export interface EpaycoFields {
  x_ref_payco?: string;
  x_transaction_id?: string;
  x_amount?: string;
  x_currency_code?: string;
  x_cod_response?: string;
  x_response?: string;
  x_response_reason_text?: string;
  x_franchise?: string;
  x_extra1?: string;
  x_id_invoice?: string;
  x_signature?: string;
}

export function fieldsToPayment(f: EpaycoFields): GatewayPayment {
  return {
    id: String(f.x_ref_payco ?? f.x_transaction_id ?? ""),
    status: mapCode(Number(f.x_cod_response)),
    statusDetail: f.x_response_reason_text || f.x_response,
    method: f.x_franchise,
    amount: Number(f.x_amount),
    currency: f.x_currency_code,
    externalReference: f.x_extra1 || f.x_id_invoice || undefined,
  };
}

/**
 * Firma de la confirmación: SHA-256 de
 *   p_cust_id_cliente ^ p_key ^ x_ref_payco ^ x_transaction_id ^ x_amount ^ x_currency_code
 */
export function verifyConfirmationSignature(f: EpaycoFields): boolean {
  const { customerId, privateKey } = commerce.epayco;
  if (!customerId || !privateKey || !f.x_signature) return false;
  const expected = createHash("sha256")
    .update(
      [
        customerId,
        privateKey,
        f.x_ref_payco ?? "",
        f.x_transaction_id ?? "",
        f.x_amount ?? "",
        f.x_currency_code ?? "",
      ].join("^"),
    )
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(f.x_signature.trim().toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Consulta una transacción por su `ref_payco` (la API pública de validación de ePayco). */
export async function validateTransaction(refPayco: string): Promise<GatewayPayment> {
  const res = await fetch(
    `${commerce.epayco.apiUrl}/validation/v1/reference/${encodeURIComponent(refPayco)}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`ePayco ${res.status} al validar ${refPayco}`);
  const json = (await res.json()) as { success?: boolean; data?: EpaycoFields };
  if (!json.success || !json.data) throw new Error(`ePayco no reconoce la referencia ${refPayco}`);
  return fieldsToPayment(json.data);
}
