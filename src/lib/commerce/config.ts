import "server-only";
import { site } from "@/data/site";

/**
 * Modo de la tienda, decidido solo por variables de entorno:
 *  - "mercadopago": hay MERCADOPAGO_ACCESS_TOKEN → pagos reales.
 *  - "demo":        CHECKOUT_DEMO_MODE=true y sin token → el pago se simula en el sitio.
 *  - "off":         ninguno → no hay carrito; las fichas siguen con «Comprar por WhatsApp».
 *
 * «off» es el valor por defecto a propósito: un despliegue sin credenciales jamás puede cobrar
 * ni aparentar que cobra.
 */
export type CommerceMode = "mercadopago" | "demo" | "off";

const env = (name: string) => process.env[name]?.trim() || undefined;
const list = (value?: string) =>
  (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const accessToken = env("MERCADOPAGO_ACCESS_TOKEN");
const mode: CommerceMode = accessToken
  ? "mercadopago"
  : env("CHECKOUT_DEMO_MODE") === "true"
    ? "demo"
    : "off";

export const commerce = {
  mode,
  enabled: mode !== "off",

  mercadopago: {
    accessToken,
    /** «Clave secreta» de Webhooks en el panel de Mercado Pago: valida que la notificación sea suya. */
    webhookSecret: env("MERCADOPAGO_WEBHOOK_SECRET"),
    /** Solo se cambia en pruebas automáticas (servidor falso). */
    apiUrl: env("MERCADOPAGO_API_URL") ?? "https://api.mercadopago.com",
    /** true → redirige a `sandbox_init_point` (algunas cuentas de prueba lo exigen). */
    useSandboxUrl: env("MERCADOPAGO_USE_SANDBOX_URL") === "true",
  },

  email: {
    apiKey: env("RESEND_API_KEY"),
    apiUrl: env("RESEND_API_URL") ?? "https://api.resend.com",
    /** Remitente. Con dominio verificado en Resend: «Be Like Lina <pedidos@belikelina.com>». */
    from: env("ORDER_EMAIL_FROM") ?? "Be Like Lina <onboarding@resend.dev>",
    /** Quién recibe el aviso de cada pedido pagado (varios, separados por coma). */
    fulfillmentTo: list(env("ORDER_NOTIFY_EMAIL")).length
      ? list(env("ORDER_NOTIFY_EMAIL"))
      : [site.contact.email],
    replyTo: site.contact.email,
  },
} as const;

export type Commerce = typeof commerce;
