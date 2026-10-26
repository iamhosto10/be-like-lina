import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EpaycoLauncher } from "@/components/cart/EpaycoLauncher";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Section } from "@/components/shared/Section";
import { commerce } from "@/lib/commerce/config";
import { itemLabel } from "@/lib/commerce/pricing-label";
import { getOrder } from "@/lib/commerce/store";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pagar tu pedido" };

/** Paso intermedio: abre la ventana segura de ePayco con los datos del pedido ya guardado. */
export default async function PayPage({ params }: PageProps<"/checkout/pagar/[orderId]">) {
  const { publicKey, test, scriptUrl } = commerce.epayco;
  if (commerce.mode !== "epayco" || !publicKey) notFound();

  const { orderId } = await params;
  const order = await getOrder(orderId);
  if (!order || order.mode !== "epayco") notFound();
  if (order.status !== "pending") redirect(`/checkout/resultado/${order.id}`);

  const c = order.customer;
  const data = {
    name: `Pedido ${order.id}`,
    description: order.items
      .map((i) => `${i.quantity} × ${itemLabel(i)}`)
      .join(", ")
      .slice(0, 250),
    invoice: order.id,
    currency: "cop",
    amount: order.total,
    tax_base: order.total,
    tax: 0,
    tax_ico: 0,
    country: "co",
    lang: "es",
    external: "false",
    extra1: order.id,
    response: `${siteUrl}/checkout/resultado/${order.id}`,
    confirmation: `${siteUrl}/api/epayco/confirmacion`,
    name_billing: `${c.firstName} ${c.lastName}`.trim(),
    email_billing: c.email,
    mobilephone_billing: c.phone.replace(/\D/g, ""),
    ...(c.document && { type_doc_billing: "cc", number_doc_billing: c.document }),
  };

  return (
    <>
      <Section tone="dark" className="pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl">Último paso: el pago</h1>
          <p className="mt-3 text-muted-foreground">
            Se abrirá la ventana segura de ePayco. Si no aparece, usa el botón de abajo.
          </p>
        </div>
      </Section>

      <Section tone="light" className="py-10 md:py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
            <p className="mb-3 text-sm text-muted-foreground">
              Pedido <strong className="text-foreground">{order.id}</strong>
              {test && " · pagos de prueba (no se cobra)"}
            </p>
            <OrderSummary {...order} />
          </div>
          <div className="mt-8">
            <EpaycoLauncher scriptUrl={scriptUrl} publicKey={publicKey} test={test} data={data} />
          </div>
        </div>
      </Section>
    </>
  );
}
