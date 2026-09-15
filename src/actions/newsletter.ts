"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Escribe un correo válido."),
  /** De dónde viene el registro (footer, recetas…) para segmentar después. */
  source: z.string().trim().max(40).optional(),
});

export type NewsletterState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

/**
 * Alta en el boletín.
 *
 * FASE 1: valida y registra en el log del servidor.
 * FASE 2 (pendiente): enviar a Resend / Brevo / n8n y notificar por WhatsApp.
 */
export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? undefined,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revisa los datos." };
  }

  // TODO(fase 2): integrar proveedor real.
  console.info("[newsletter] nueva suscripción", parsed.data);

  return { status: "success", message: "¡Listo! Revisa tu correo (y la carpeta de spam)." };
}
