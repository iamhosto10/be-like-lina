import "server-only";
import { site } from "@/data/site";

/**
 * Modo de la tienda, decidido solo por variables de entorno:
 *  - "epayco": están las tres credenciales de ePayco → pagos (reales o de prueba, según EPAYCO_TEST).
 *  - "demo":   CHECKOUT_DEMO_MODE=true y sin credenciales → el pago se simula en el sitio.
 *  - "off":         ninguno → no hay carrito; las fichas siguen con «Comprar por WhatsApp».
 *
 * «off» es el valor por defecto a propósito: un despliegue sin credenciales jamás puede cobrar
 * ni aparentar que cobra.
 */
export type CommerceMode = "epayco" | "demo" | "off";

const env = (name: string) => process.env[name]?.trim() || undefined;
const list = (value?: string) =>
  (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const publicKey = env("EPAYCO_PUBLIC_KEY");
const customerId = env("EPAYCO_CUSTOMER_ID");
const privateKey = env("EPAYCO_P_KEY");
const mode: CommerceMode =
  publicKey && customerId && privateKey
    ? "epayco"
    : env("CHECKOUT_DEMO_MODE") === "true"
      ? "demo"
      : "off";

export const commerce = {
  mode,
  enabled: mode !== "off",

  epayco: {
    /** «Llave pública» (P_PUBLIC_KEY): la usa el botón de pago en el navegador; no es secreta. */
    publicKey,
    /** «P_CUST_ID_CLIENTE»: id de cliente. Solo servidor: firma y valida las confirmaciones. */
    customerId,
    /** «P_KEY»: llave privada. Solo servidor. */
    privateKey,
    /** Mientras no sea «false» los pagos son de PRUEBA (no se cobra). Se pasa a producción con EPAYCO_TEST=false. */
    test: env("EPAYCO_TEST") !== "false",
    /** Solo se cambia en pruebas automáticas (servidor falso). */
    apiUrl: env("EPAYCO_API_URL") ?? "https://secure.epayco.co",
    scriptUrl: "https://checkout.epayco.co/checkout.js",
  },

  email: {
    apiKey: env("RESEND_API_KEY"),
    apiUrl: env("RESEND_API_URL") ?? "https://api.resend.com",
    /** Remitente. Con dominio verificado en Resend: «Be Like Lina <pedidos@belikelina.com>». */
    from: env("ORDER_EMAIL_FROM") ?? "Be Like Lina <onboarding@resend.dev>",
    /** Quién recibe el aviso de cada pedido PAGADO (varios, separados por coma). Por defecto ventas@belikelina.com. */
    fulfillmentTo: list(env("ORDER_NOTIFY_EMAIL")).length
      ? list(env("ORDER_NOTIFY_EMAIL"))
      : [site.contact.email],
    replyTo: site.contact.email,
  },
} as const;

export type Commerce = typeof commerce;
