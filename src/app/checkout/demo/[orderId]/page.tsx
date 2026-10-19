import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { completeDemoPayment } from "@/actions/demo";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { commerce } from "@/lib/commerce/config";
import { getOrder } from "@/lib/commerce/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pago de demostración" };

const outcomes = [
  { value: "approved", label: "Simular pago aprobado", variant: "default" },
  { value: "pending", label: "Simular pago en revisión", variant: "outline" },
  { value: "rejected", label: "Simular pago rechazado", variant: "outline" },
] as const;

/**
 * Sustituye a la página de Mercado Pago mientras no hay credenciales. Cada botón pasa por el mismo
 * procesamiento que el webhook real, incluido el envío de correos. Solo existe en modo demostración.
 */
export default async function DemoPaymentPage({ params }: PageProps<"/checkout/demo/[orderId]">) {
  if (commerce.mode !== "demo") notFound();
  const { orderId } = await params;
  const order = await getOrder(orderId);
  if (!order || order.mode !== "demo") notFound();

  return (
    <>
      <Section tone="dark" className="pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
            Modo demostración
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl">Aquí iría Mercado Pago</h1>
          <p className="mt-3 text-muted-foreground">
            Elige cómo termina el pago para probar el proceso. No se cobra nada.
          </p>
        </div>
      </Section>

      <Section tone="light" className="py-10 md:py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
            <p className="mb-3 text-sm text-muted-foreground">
              Pedido <strong className="text-foreground">{order.id}</strong>
            </p>
            <OrderSummary {...order} />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {outcomes.map((o) => (
              <form key={o.value} action={completeDemoPayment}>
                <input type="hidden" name="orderId" value={order.id} />
                <input type="hidden" name="outcome" value={o.value} />
                <Button type="submit" size="xl" variant={o.variant} className="w-full">
                  {o.label}
                </Button>
              </form>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
