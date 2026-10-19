import "server-only";
import { site } from "@/data/site";
import { shipping } from "@/data/shipping";
import { commerce } from "@/lib/commerce/config";
import { formatCOP } from "@/lib/format";
import { itemLabel } from "@/lib/commerce/pricing";
import { toWhatsappNumber, whatsappLink } from "@/lib/commerce/phone";
import { siteUrl } from "@/lib/site-url";
import type { Order } from "@/lib/commerce/types";

/* ── Envío con Resend ─────────────────────────────────────────────────── */

interface Email {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export interface SendResult {
  /** false si no hay RESEND_API_KEY: el correo solo se muestra en el log del servidor. */
  sent: boolean;
}

export async function sendEmail(email: Email): Promise<SendResult> {
  const { apiKey, apiUrl, from } = commerce.email;
  if (!apiKey) {
    console.info(`[correo · simulado] a ${email.to.join(", ")} · ${email.subject}\n${email.text}`);
    return { sent: false };
  }
  const res = await fetch(`${apiUrl}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo && { reply_to: email.replyTo }),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return { sent: true };
}

/* ── Plantillas ───────────────────────────────────────────────────────── */

// Los clientes de correo no soportan variables CSS: los colores van fijos (mismos de globals.css).
const C = {
  night: "#150915",
  pink: "#ff93ce",
  plum: "#8e2f67",
  ice: "#fff0f8",
  text: "#241323",
  muted: "#6b6270",
  border: "#ebd5e4",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function shell(preheader: string, body: string): string {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(preheader)}</title></head><body style="margin:0;padding:0;background:${C.ice};font-family:Arial,Helvetica,sans-serif;color:${C.text};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ice};padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">
<tr><td style="background:${C.night};padding:22px 28px;"><span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:.08em;">BE LIKE <span style="color:${C.pink};">LINA</span></span></td></tr>
<tr><td style="padding:28px;">${body}</td></tr>
<tr><td style="background:${C.night};padding:18px 28px;color:#c4b2c1;font-size:12px;line-height:1.5;">${esc(site.name)} · ${esc(site.contact.city)}, ${esc(site.contact.country)}<br>${esc(site.contact.email)} · ${esc(site.contact.whatsappDisplay)}</td></tr>
</table></td></tr></table></body></html>`;
}

const h1 = (t: string) =>
  `<h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;color:${C.text};">${esc(t)}</h1>`;
const p = (t: string) =>
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${C.text};">${t}</p>`;
const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${C.plum};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:10px;margin:6px 8px 6px 0;">${esc(label)}</a>`;
const box = (inner: string) =>
  `<div style="background:${C.ice};border:1px solid ${C.border};border-radius:10px;padding:16px 18px;margin:0 0 18px;font-size:14px;line-height:1.6;">${inner}</div>`;

function itemsTable(order: Order): string {
  const rows = order.items
    .map(
      (i) => `<tr>
<td style="padding:8px 0;border-bottom:1px solid ${C.border};font-size:14px;">${esc(itemLabel(i))}${i.digital ? ` <span style="color:${C.muted};font-size:12px;">(digital)</span>` : ""}<br><span style="color:${C.muted};font-size:12px;">${i.quantity} × ${formatCOP(i.unitPrice)}</span></td>
<td align="right" style="padding:8px 0;border-bottom:1px solid ${C.border};font-size:14px;white-space:nowrap;">${formatCOP(i.unitPrice * i.quantity)}</td></tr>`,
    )
    .join("");
  const line = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:6px 0;font-size:${strong ? 16 : 14}px;${strong ? "font-weight:700;" : `color:${C.muted};`}">${label}</td><td align="right" style="padding:6px 0;font-size:${strong ? 16 : 14}px;${strong ? "font-weight:700;" : ""}">${value}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">${rows}
${line("Subtotal", formatCOP(order.subtotal))}
${line("Envío", order.hasPhysical ? (order.shipping > 0 ? formatCOP(order.shipping) : "Gratis") : "No aplica")}
${line("Total", `${formatCOP(order.total)} COP`, true)}</table>`;
}

const itemsText = (order: Order) =>
  order.items
    .map(
      (i) =>
        `- ${itemLabel(i)}${i.digital ? " (digital)" : ""} × ${i.quantity}: ${formatCOP(i.unitPrice * i.quantity)}`,
    )
    .join("\n") +
  `\nSubtotal: ${formatCOP(order.subtotal)}\nEnvío: ${order.hasPhysical ? formatCOP(order.shipping) : "No aplica"}\nTotal: ${formatCOP(order.total)} COP`;

function addressLines(order: Order): string[] {
  const a = order.shippingAddress;
  if (!a) return [];
  return [
    a.address,
    a.details,
    `${a.city}, ${a.department}`,
    a.notes ? `Notas: ${a.notes}` : "",
  ].filter((x): x is string => Boolean(x));
}

const paymentStatusEs: Record<string, string> = {
  approved: "aprobado",
  in_process: "en revisión",
  pending: "pendiente",
  rejected: "rechazado",
  refunded: "reembolsado",
};
const paymentLabel = (order: Order) =>
  paymentStatusEs[order.payment?.status ?? "approved"] ?? order.payment?.status ?? "aprobado";

const prefix = (order: Order) => (order.mode === "demo" ? "[PRUEBA] " : "");
const fullName = (order: Order) => `${order.customer.firstName} ${order.customer.lastName}`.trim();

/* ── 1) Confirmación para quien compró ────────────────────────────────── */

export function customerEmail(order: Order): Email {
  const name = order.customer.firstName;
  const help = whatsappLink(
    toWhatsappNumber(site.contact.whatsappNumber) ?? site.contact.whatsappNumber,
    `Hola Lina, tengo una pregunta sobre mi pedido ${order.id}.`,
  );
  const address = addressLines(order);

  const body = [
    order.mode === "demo"
      ? box(
          "<strong>Pedido de prueba.</strong> Este correo se generó en modo demostración; no hubo cobro real.",
        )
      : "",
    h1(`¡Gracias por tu compra, ${name}!`),
    p(`Recibimos tu pago y tu pedido <strong>${order.id}</strong> ya está en marcha.`),
    itemsTable(order),
    order.hasPhysical
      ? box(
          `<strong>Se enviará a:</strong><br>${esc(fullName(order))}<br>${address.map(esc).join("<br>")}<br><span style="color:${C.muted};">${esc(shipping.note)}</span>`,
        )
      : "",
    order.hasDigital
      ? box(
          `<strong>Productos digitales:</strong> te los enviaremos por correo a <strong>${esc(order.customer.email)}</strong> en el transcurso del día hábil. Si no los ves, revisa la carpeta de spam.`,
        )
      : "",
    p("Si tienes cualquier duda con tu pedido, escríbenos por WhatsApp:"),
    help ? button(help, "Escribir a Lina por WhatsApp") : "",
  ].join("");

  const text = [
    order.mode === "demo" ? "PEDIDO DE PRUEBA (sin cobro real)\n" : "",
    `¡Gracias por tu compra, ${name}!`,
    `Recibimos tu pago. Pedido ${order.id}.`,
    "",
    itemsText(order),
    order.hasPhysical ? `\nSe enviará a:\n${fullName(order)}\n${address.join("\n")}` : "",
    order.hasDigital
      ? `\nProductos digitales: te los enviaremos por correo a ${order.customer.email}.`
      : "",
    `\n¿Dudas? WhatsApp ${site.contact.whatsappDisplay}${help ? ` → ${help}` : ""}`,
  ].join("\n");

  return {
    to: [order.customer.email],
    subject: `${prefix(order)}Recibimos tu pedido ${order.id}`,
    html: shell(`Pedido ${order.id} confirmado por ${formatCOP(order.total)}`, body),
    text,
    replyTo: commerce.email.replyTo,
  };
}

/* ── 2) Aviso para quien despacha ─────────────────────────────────────── */

export function fulfillmentEmail(order: Order): Email {
  const c = order.customer;
  const customerWa = whatsappLink(
    toWhatsappNumber(c.phone),
    `Hola ${c.firstName}, soy del equipo de Be Like Lina. Tu pedido ${order.id} ya está confirmado y lo estamos preparando. Te aviso apenas salga.`,
  );
  const address = addressLines(order);
  const physical = order.items.filter((i) => !i.digital);
  const digital = order.items.filter((i) => i.digital);

  const todo = [
    physical.length
      ? `<li><strong>Despachar</strong> ${physical.map((i) => `${i.quantity} × ${esc(itemLabel(i))}`).join("; ")} a la dirección de abajo.</li>`
      : "",
    digital.length
      ? `<li><strong>Enviar por correo</strong> a ${esc(c.email)}: ${digital.map((i) => esc(itemLabel(i))).join("; ")}.</li>`
      : "",
  ].join("");

  const body = [
    order.mode === "demo"
      ? box(
          "<strong>PEDIDO DE PRUEBA.</strong> No hay que despachar nada: se generó en modo demostración.",
        )
      : "",
    h1(`Nuevo pedido pagado ${order.id}`),
    p(
      `<strong>${formatCOP(order.total)} COP</strong> · pago ${esc(paymentLabel(order))}${order.payment?.method ? ` (${esc(order.payment.method)})` : ""} · referencia ${esc(order.payment?.id ?? "—")}`,
    ),
    box(
      `<strong>Qué hay que hacer</strong><ol style="margin:8px 0 0 18px;padding:0;">${todo}</ol>`,
    ),
    itemsTable(order),
    box(
      `<strong>Cliente</strong><br>${esc(fullName(order))}<br>Celular: ${esc(c.phone)}<br>Correo: ${esc(c.email)}${c.document ? `<br>Cédula: ${esc(c.document)}` : ""}`,
    ),
    order.hasPhysical
      ? box(`<strong>Dirección de envío</strong><br>${address.map(esc).join("<br>")}`)
      : "",
    customerWa ? button(customerWa, "Escribirle al cliente por WhatsApp") : "",
    button(
      `mailto:${c.email}?subject=${encodeURIComponent(`Tu pedido ${order.id}`)}`,
      "Responder por correo",
    ),
  ].join("");

  const text = [
    order.mode === "demo" ? "PEDIDO DE PRUEBA (no despachar)\n" : "",
    `Nuevo pedido pagado ${order.id} · ${formatCOP(order.total)} COP`,
    `Pago: ${paymentLabel(order)} ${order.payment?.method ?? ""} ref ${order.payment?.id ?? "—"}`,
    "",
    physical.length
      ? `DESPACHAR: ${physical.map((i) => `${i.quantity} × ${itemLabel(i)}`).join("; ")}`
      : "",
    digital.length ? `ENVIAR POR CORREO a ${c.email}: ${digital.map(itemLabel).join("; ")}` : "",
    "",
    itemsText(order),
    "",
    `CLIENTE: ${fullName(order)} · ${c.phone} · ${c.email}${c.document ? ` · CC ${c.document}` : ""}`,
    order.hasPhysical ? `DIRECCIÓN:\n${address.join("\n")}` : "",
    customerWa ? `\nWhatsApp al cliente: ${customerWa}` : "",
  ].join("\n");

  return {
    to: [...commerce.email.fulfillmentTo],
    subject: `${prefix(order)}Nuevo pedido pagado ${order.id} · ${formatCOP(order.total)}`,
    html: shell(`Pedido ${order.id} de ${fullName(order)} por ${formatCOP(order.total)}`, body),
    text,
    replyTo: c.email,
  };
}

/** Enlace público al resultado del pedido (para mostrar en pantallas, no en correos). */
export const orderResultUrl = (id: string) => `${siteUrl}/checkout/resultado/${id}`;
