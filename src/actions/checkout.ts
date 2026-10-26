"use server";

import { randomInt } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { departments } from "@/data/shipping";
import { commerce } from "@/lib/commerce/config";
import { toWhatsappNumber } from "@/lib/commerce/phone";
import { priceCart } from "@/lib/commerce/pricing";
import { isDurable, saveOrder } from "@/lib/commerce/store";
import type { Order } from "@/lib/commerce/types";

export type CheckoutState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      /** Lo que escribió la persona, para que el formulario no se borre al fallar. */
      values?: Record<string, string>;
    };

/** `label` lleva su artículo y género: «El nombre», «La ciudad». */
const text = (min: number, max: number, label: string) => {
  const feminine = label.startsWith("La ");
  return z
    .string()
    .trim()
    .min(min, `${label} es obligatori${feminine ? "a" : "o"}.`)
    .max(max, `${label} es demasiado largo${feminine ? "a" : ""}.`);
};

const cartSchema = z
  .array(z.object({ slug: z.string().max(80), quantity: z.number().int().min(1).max(99) }))
  .min(1)
  .max(30);

const customerSchema = z.object({
  firstName: text(2, 60, "El nombre"),
  lastName: text(2, 60, "El apellido"),
  email: z.string().trim().toLowerCase().email("Escribe un correo válido.").max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => toWhatsappNumber(v) !== null, "Escribe un celular válido (10 dígitos)."),
  document: z
    .string()
    .trim()
    .transform((v) => v.replace(/[.\s-]/g, ""))
    .refine((v) => v === "" || /^\d{5,15}$/.test(v), "La cédula solo lleva números."),
  terms: z.literal("on", { message: "Debes aceptar los términos y condiciones." }),
});

const addressSchema = z.object({
  department: z.enum(departments, { message: "Elige el departamento." }),
  city: text(2, 60, "La ciudad"),
  address: text(5, 120, "La dirección"),
  details: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(200).optional(),
});

/** Id legible y difícil de adivinar (lo ve quien compra en la página de resultado). */
function newOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 8; i++) id += alphabet[randomInt(alphabet.length)];
  return `BLL-${id}`;
}

const fail = (
  message: string,
  fieldErrors?: Record<string, string>,
  values?: Record<string, string>,
): CheckoutState => ({ status: "error", message, fieldErrors, values });

/**
 * Crea el pedido y manda al cliente a pagar. Todo lo que importa se vuelve a calcular aquí:
 * los precios salen del catálogo y no de lo que mande el navegador.
 */
export async function createCheckout(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  if (!commerce.enabled) return fail("Los pagos en línea aún no están disponibles.");
  if (formData.get("website")) return fail("No pudimos procesar la solicitud."); // trampa para robots

  // Carrito
  let cartInput: unknown;
  try {
    cartInput = JSON.parse(String(formData.get("cart") ?? "[]"));
  } catch {
    return fail("No pudimos leer tu carrito. Recarga la página e inténtalo de nuevo.");
  }
  const cart = cartSchema.safeParse(cartInput);
  if (!cart.success) return fail("Tu carrito está vacío o no es válido.");
  const priced = priceCart(cart.data);
  if (!priced.ok) return fail(priced.error);

  // Datos de contacto y envío
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;
  // Lo escrito se devuelve en cualquier error para que el formulario no se borre.
  const values = Object.fromEntries(
    Object.entries(raw).filter(([key]) => key !== "cart" && key !== "website"),
  );
  const customer = customerSchema.safeParse(raw);
  const address = priced.hasPhysical ? addressSchema.safeParse(raw) : null;

  const fieldErrors: Record<string, string> = {};
  for (const result of [customer, address]) {
    if (result && !result.success) {
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] ??= issue.message;
      }
    }
  }
  if (Object.keys(fieldErrors).length > 0 || !customer.success) {
    return fail("Revisa los campos marcados.", fieldErrors, values);
  }

  if (!isDurable()) {
    console.error(
      "[checkout] Falta Upstash Redis: en Vercel los pedidos no pueden guardarse en memoria.",
    );
    return fail(
      "El pago no está disponible en este momento. Escríbenos por WhatsApp y te ayudamos.",
      undefined,
      values,
    );
  }

  const now = new Date().toISOString();
  const { firstName, lastName, email, phone, document } = customer.data;
  const order: Order = {
    ...priced,
    id: newOrderId(),
    createdAt: now,
    updatedAt: now,
    status: "pending",
    mode: commerce.mode === "epayco" ? "epayco" : "demo",
    currency: "COP",
    customer: { firstName, lastName, email, phone, document: document || undefined },
    ...(address?.success && { shippingAddress: address.data }),
  };

  let destination: string;
  try {
    await saveOrder(order); // primero se guarda: la confirmación de ePayco debe encontrar el pedido
    destination =
      order.mode === "epayco" ? `/checkout/pagar/${order.id}` : `/checkout/demo/${order.id}`;
  } catch (error) {
    console.error(`[checkout] No se pudo crear el pago del pedido ${order.id}:`, error);
    return fail(
      "No pudimos iniciar el pago. Inténtalo de nuevo en un momento o escríbenos por WhatsApp.",
      undefined,
      values,
    );
  }

  redirect(destination); // fuera del try/catch, como exige Next
}
