/**
 * Pruebas del núcleo de la tienda (sin navegador ni cuentas reales):
 *   pnpm test:commerce
 *
 * Usa un servidor de correo falso en vez de Resend y el almacén en memoria.
 */
import { createHmac } from "node:crypto";
import { createServer, type IncomingMessage } from "node:http";
import assert from "node:assert/strict";

// ── Entorno ANTES de importar los módulos (leen process.env al cargarse) ─────────────────────
const sent: { to: string[]; subject: string; html: string; text: string; reply_to?: string }[] = [];
let failTo: string | null = null; // si un correo va a esta dirección, el servidor falso responde 500

const mail = createServer((req: IncomingMessage, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    const email = JSON.parse(body);
    if (failTo && email.to.includes(failTo)) {
      res.writeHead(500).end("boom");
      return;
    }
    sent.push(email);
    res.writeHead(200, { "content-type": "application/json" }).end('{"id":"fake"}');
  });
});
await new Promise<void>((r) => mail.listen(0, r));
const port = (mail.address() as { port: number }).port;

Object.assign(process.env, {
  MERCADOPAGO_ACCESS_TOKEN: "TEST-token",
  MERCADOPAGO_WEBHOOK_SECRET: "clave-secreta-de-prueba",
  RESEND_API_KEY: "re_test",
  RESEND_API_URL: `http://127.0.0.1:${port}`,
  ORDER_NOTIFY_EMAIL: "despacho@belikelina.test, apoyo@belikelina.test",
  ORDER_EMAIL_FROM: "Be Like Lina <pedidos@belikelina.test>",
});

const { priceCart } = await import("@/lib/commerce/pricing");
const { toWhatsappNumber } = await import("@/lib/commerce/phone");
const { verifyWebhookSignature } = await import("@/lib/commerce/mercadopago");
const { applyPayment } = await import("@/lib/commerce/process");
const { saveOrder, getOrder } = await import("@/lib/commerce/store");
const { shipping } = await import("@/data/shipping");
type Order = import("@/lib/commerce/types").Order;

let passed = 0;
const test = async (name: string, fn: () => void | Promise<void>) => {
  try {
    await fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}\n    ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

console.log("Precios y envío");
await test("producto físico: suma la tarifa de envío", () => {
  const r = priceCart([{ slug: "proteina-shaker-chocolate", quantity: 2 }]);
  assert(r.ok);
  assert.equal(r.subtotal, 220000 * 2);
  assert.equal(r.shipping, shipping.flatRate);
  assert.equal(r.total, 440000 + shipping.flatRate);
  assert(r.hasPhysical && !r.hasDigital);
});
await test("solo digitales: sin envío ni dirección", () => {
  const r = priceCart([
    { slug: "guia-alimentacion-saludable", quantity: 1 },
    { slug: "recetario-batidos", quantity: 1 },
  ]);
  assert(r.ok);
  assert.equal(r.shipping, 0);
  assert(!r.hasPhysical && r.hasDigital);
  assert.equal(r.total, 170000 + 90000);
});
await test("mixto: envío por lo físico; las líneas repetidas se suman", () => {
  const r = priceCart([
    { slug: "stevia-250", quantity: 1 },
    { slug: "stevia-250", quantity: 2 },
    { slug: "recetario-batidos", quantity: 1 },
  ]);
  assert(r.ok);
  assert.equal(r.items.find((i) => i.slug === "stevia-250")?.quantity, 3);
  assert.equal(r.shipping, shipping.flatRate);
  assert(r.hasPhysical && r.hasDigital);
});
await test("rechaza: vacío, producto inexistente, cantidad 0 o > máximo", () => {
  assert(!priceCart([]).ok);
  assert(!priceCart([{ slug: "no-existe", quantity: 1 }]).ok);
  assert(!priceCart([{ slug: "stevia-250", quantity: 0 }]).ok);
  assert(!priceCart([{ slug: "stevia-250", quantity: 11 }]).ok);
  assert(!priceCart([{ slug: "stevia-250", quantity: 1.5 }]).ok);
});
await test("el precio viene del catálogo, no de quien llama", () => {
  const r = priceCart([{ slug: "stevia-250", quantity: 1, unitPrice: 1 } as never]);
  assert(r.ok);
  assert.equal(r.items[0].unitPrice, 33000);
});

console.log("Teléfonos");
await test("normaliza celulares colombianos", () => {
  assert.equal(toWhatsappNumber("300 123 4567"), "573001234567");
  assert.equal(toWhatsappNumber("+57 300 123 4567"), "573001234567");
  assert.equal(toWhatsappNumber("(300) 123-4567"), "573001234567");
  assert.equal(toWhatsappNumber("573001234567"), "573001234567");
  assert.equal(toWhatsappNumber("123"), null);
  assert.equal(toWhatsappNumber("6012345678"), null); // fijo
  assert.equal(toWhatsappNumber("+1 305 555 0100"), "13055550100");
});

console.log("Firma del webhook de Mercado Pago");
const secret = "clave-secreta-de-prueba";
const sign = (dataId: string, requestId: string, ts: string, key = secret) =>
  `ts=${ts},v1=${createHmac("sha256", key).update(`id:${dataId};request-id:${requestId};ts:${ts};`).digest("hex")}`;
await test("acepta una firma válida", () => {
  assert(
    verifyWebhookSignature({
      dataId: "123456",
      requestId: "req-1",
      signature: sign("123456", "req-1", "1700000000"),
      secret,
    }),
  );
});
await test("el id alfanumérico se firma en minúsculas", () => {
  assert(
    verifyWebhookSignature({
      dataId: "ABC123",
      requestId: "r",
      signature: sign("abc123", "r", "1"),
      secret,
    }),
  );
});
await test("rechaza: otra clave, id distinto, request-id distinto, sin firma, firma mal formada", () => {
  assert(
    !verifyWebhookSignature({
      dataId: "123456",
      requestId: "req-1",
      signature: sign("123456", "req-1", "1", "otra-clave"),
      secret,
    }),
  );
  assert(
    !verifyWebhookSignature({
      dataId: "999",
      requestId: "req-1",
      signature: sign("123456", "req-1", "1"),
      secret,
    }),
  );
  assert(
    !verifyWebhookSignature({
      dataId: "123456",
      requestId: "otro",
      signature: sign("123456", "req-1", "1"),
      secret,
    }),
  );
  assert(
    !verifyWebhookSignature({ dataId: "123456", requestId: "req-1", signature: null, secret }),
  );
  assert(
    !verifyWebhookSignature({ dataId: "123456", requestId: "req-1", signature: "basura", secret }),
  );
});

console.log("Procesamiento de pagos y correos");
/** Quita el `ok` del resultado de priceCart, dejando solo el carrito calculado. */
const unwrap = (priced: object) =>
  Object.fromEntries(Object.entries(priced).filter(([key]) => key !== "ok")) as unknown as Omit<
    Order,
    "id"
  >;

function makeOrder(over: Partial<Order> = {}): Order {
  const priced = priceCart([
    { slug: "proteina-shaker-chocolate", quantity: 1 },
    { slug: "guia-alimentacion-saludable", quantity: 1 },
  ]);
  assert(priced.ok);
  const rest = unwrap(priced);
  const id = `BLL-TEST${Math.floor(Math.random() * 9000 + 1000)}`;
  return {
    ...rest,
    id,
    createdAt: "2026-10-20T10:00:00.000Z",
    updatedAt: "2026-10-20T10:00:00.000Z",
    status: "pending",
    mode: "mercadopago",
    currency: "COP",
    customer: {
      firstName: "Ana",
      lastName: "Pérez",
      email: "ana@cliente.test",
      phone: "300 123 4567",
      document: "1065000111",
    },
    shippingAddress: {
      department: "Cesar",
      city: "Valledupar",
      address: "Calle 10 # 5-20",
      details: "Apto 301",
      notes: "Portería",
    },
    ...over,
  } as Order;
}
const pay = (order: Order, over = {}) => ({
  id: "777001",
  status: "approved",
  statusDetail: "accredited",
  method: "pse",
  amount: order.total,
  currency: "COP",
  externalReference: order.id,
  ...over,
});

await test("pago aprobado: un correo al cliente y uno a quien despacha", async () => {
  sent.length = 0;
  const o = makeOrder();
  await saveOrder(o);
  const r = await applyPayment(pay(o));
  assert(r.ok && r.order.status === "approved" && r.order.notifiedAt);
  assert.equal(sent.length, 2);
  const customer = sent.find((m) => m.to.includes("ana@cliente.test"))!;
  const desk = sent.find((m) => m.to.includes("despacho@belikelina.test"))!;
  assert(desk.to.includes("apoyo@belikelina.test"), "debe ir a todos los despachadores");
  assert(customer.subject.includes(o.id) && desk.subject.includes(o.id));
  // cliente
  assert(customer.html.includes("Valledupar") && customer.html.includes("Calle 10 # 5-20"));
  assert(
    customer.html.includes("productos digitales") ||
      customer.html.toLowerCase().includes("productos digitales"),
  );
  assert(
    customer.html.includes("$220.000") &&
      customer.html.includes(`$${o.total.toLocaleString("es-CO")}`),
  );
  assert(customer.html.includes("wa.me/573012156152"), "botón de ayuda a Lina");
  // despacho
  assert(desk.html.includes("wa.me/573001234567"), "enlace de WhatsApp al cliente normalizado");
  assert(desk.html.includes("Despachar") && desk.html.includes("Enviar por correo"));
  assert(desk.html.includes("1065000111") && desk.html.includes("Portería"));
  assert.equal(desk.reply_to, "ana@cliente.test");
  assert(customer.text.length > 50 && desk.text.length > 50, "versión en texto plano");
});
await test("idempotente: una notificación repetida no reenvía correos", async () => {
  sent.length = 0;
  const o = makeOrder();
  await saveOrder(o);
  await applyPayment(pay(o));
  await applyPayment(pay(o));
  await Promise.all([applyPayment(pay(o)), applyPayment(pay(o))]);
  assert.equal(sent.length, 2);
});
await test("monto distinto al del pedido: no se confirma ni se envía nada", async () => {
  sent.length = 0;
  const o = makeOrder();
  await saveOrder(o);
  const r = await applyPayment(pay(o, { amount: 1000 }));
  assert(!r.ok && r.reason === "amount_mismatch");
  assert.equal((await getOrder(o.id))?.status, "pending");
  assert.equal(sent.length, 0);
});
await test("pedido desconocido o moneda distinta: se ignora", async () => {
  sent.length = 0;
  const o = makeOrder();
  assert.deepEqual(await applyPayment(pay(o, { externalReference: "BLL-NOEXISTE" })), {
    ok: false,
    reason: "order_not_found",
  });
  assert.deepEqual(await applyPayment(pay(o, { externalReference: undefined })), {
    ok: false,
    reason: "order_not_found",
  });
  await saveOrder(o);
  assert.deepEqual(await applyPayment(pay(o, { currency: "USD" })), {
    ok: false,
    reason: "currency",
  });
  assert.equal(sent.length, 0);
});
await test("rechazado y en revisión: actualizan el estado, sin correos", async () => {
  sent.length = 0;
  const a = makeOrder();
  await saveOrder(a);
  await applyPayment(pay(a, { status: "rejected" }));
  assert.equal((await getOrder(a.id))?.status, "rejected");
  const b = makeOrder();
  await saveOrder(b);
  await applyPayment(pay(b, { status: "in_process" }));
  assert.equal((await getOrder(b.id))?.status, "in_process");
  assert.equal(sent.length, 0);
});
await test("un pedido pagado no retrocede si llega una notificación vieja", async () => {
  const o = makeOrder();
  await saveOrder(o);
  await applyPayment(pay(o));
  await applyPayment(pay(o, { status: "in_process" }));
  await applyPayment(pay(o, { status: "rejected" }));
  assert.equal((await getOrder(o.id))?.status, "approved");
});
await test("reembolso posterior: cambia el estado, sin correos nuevos", async () => {
  sent.length = 0;
  const o = makeOrder();
  await saveOrder(o);
  await applyPayment(pay(o));
  await applyPayment(pay(o, { status: "refunded" }));
  assert.equal((await getOrder(o.id))?.status, "refunded");
  assert.equal(sent.length, 2);
});
await test("si falla el correo a quien despacha: lanza, y el reintento solo repite ese", async () => {
  sent.length = 0;
  const o = makeOrder();
  await saveOrder(o);
  failTo = "despacho@belikelina.test";
  await assert.rejects(() => applyPayment(pay(o)));
  assert.equal(sent.length, 1, "el del cliente sí salió");
  assert(!(await getOrder(o.id))?.notifiedAt);
  failTo = null;
  const r = await applyPayment(pay(o)); // reintento de Mercado Pago
  assert(r.ok && r.order.notifiedAt);
  assert.equal(sent.length, 2, "el del cliente no se repite; el de despacho sí");
  assert(sent[1].to.includes("despacho@belikelina.test"));
});
await test("solo digitales: sin dirección ni bloque de envío", async () => {
  sent.length = 0;
  const priced = priceCart([{ slug: "recetario-batidos", quantity: 1 }]);
  assert(priced.ok);
  const o = makeOrder({ ...unwrap(priced), shippingAddress: undefined });
  await saveOrder(o);
  await applyPayment(pay(o));
  const desk = sent.find((m) => m.to.includes("despacho@belikelina.test"))!;
  assert(!desk.html.includes("Dirección de envío") && !desk.html.includes("Despachar"));
  assert(desk.html.includes("Enviar por correo"));
});
await test("pedido de prueba (demo): lo avisa en asunto y cuerpo", async () => {
  sent.length = 0;
  const o = makeOrder({ mode: "demo" });
  await saveOrder(o);
  await applyPayment(pay(o));
  assert(sent.every((m) => m.subject.startsWith("[PRUEBA]")));
  assert(sent.every((m) => /prueba/i.test(m.html)));
});
await test("el HTML de los correos escapa lo que escribe el cliente", async () => {
  sent.length = 0;
  const o = makeOrder({
    customer: {
      firstName: "<script>alert(1)</script>",
      lastName: 'Pérez"',
      email: "x@y.test",
      phone: "3001234567",
    },
    shippingAddress: {
      department: "Cesar",
      city: "Valledupar",
      address: "<img src=x onerror=1>",
      notes: "<b>hola</b>",
    },
  });
  await saveOrder(o);
  await applyPayment(pay(o));
  for (const m of sent) {
    assert(
      !m.html.includes("<script>") && !m.html.includes("<img src=x") && !m.html.includes("<b>hola"),
      m.subject,
    );
  }
});

mail.close();
console.log(`\n${process.exitCode ? "✗ Hubo fallos" : `✓ ${passed} pruebas pasaron`}`);
