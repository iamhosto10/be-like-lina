import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { AutoRefresh, ClearCart } from "@/components/cart/CartEffects";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { getOrder } from "@/lib/commerce/store";
import { whatsappUrl } from "@/lib/links";
import type { OrderStatus } from "@/lib/commerce/types";

// Cada visita lee el estado actual del pedido: nunca se guarda en caché.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Resultado de tu pedido" };

const copy: Record<OrderStatus, { icon: typeof CircleCheck; title: string; text: string }> = {
  approved: {
    icon: CircleCheck,
    title: "¡Pago recibido, gracias!",
    text: "Tu pedido está confirmado. Te enviamos un correo con el resumen.",
  },
  pending: {
    icon: Clock,
    title: "Estamos confirmando tu pago",
    text: "Esto toma unos segundos. Esta página se actualiza sola; no hace falta que la recargues.",
  },
  in_process: {
    icon: Clock,
    title: "Tu pago está en revisión",
    text: "Mercado Pago lo está verificando. Apenas se apruebe te enviaremos el correo de confirmación.",
  },
  rejected: {
    icon: CircleAlert,
    title: "El pago no se completó",
    text: "Mercado Pago no aprobó el pago. No se te cobró nada. Puedes intentarlo de nuevo con otro medio de pago.",
  },
  cancelled: {
    icon: CircleAlert,
    title: "El pago fue cancelado",
    text: "No se te cobró nada. Puedes intentarlo de nuevo cuando quieras.",
  },
  refunded: {
    icon: CircleAlert,
    title: "Este pedido fue reembolsado",
    text: "El dinero se devolvió a tu medio de pago. Si tienes dudas, escríbenos.",
  },
};

export default async function OrderResultPage({
  params,
}: PageProps<"/checkout/resultado/[orderId]">) {
  const { orderId } = await params;
  const order = await getOrder(orderId);
  if (!order) notFound();

  const { icon: Icon, title, text } = copy[order.status];
  const waiting = order.status === "pending" || order.status === "in_process";
  const failed = order.status === "rejected" || order.status === "cancelled";

  return (
    <>
      {/* El pedido ya existe: se vacía el carrito salvo que el pago haya fallado. */}
      {!failed && order.status !== "refunded" && <ClearCart />}
      <AutoRefresh active={waiting} />

      <Section tone="dark" className="pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-2xl text-center">
          <Icon className="mx-auto size-14 text-primary" strokeWidth={1.5} aria-hidden />
          <h1 className="mt-5 text-3xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{text}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Pedido <strong className="text-foreground">{order.id}</strong>
            {order.mode === "demo" && " · prueba"}
          </p>
        </div>
      </Section>

      <Section tone="light" className="py-10 md:py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
            <h2 className="mb-3 text-xl font-bold">Tu pedido</h2>
            <OrderSummary {...order} />
            {order.hasDigital && order.status === "approved" && (
              <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm">
                Los productos digitales llegan a <strong>{order.customer.email}</strong> en el
                transcurso del día hábil.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {failed && (
              <Button size="lg" nativeButton={false} render={<Link href="/checkout" />}>
                Volver a intentar
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/tienda" />}
            >
              Seguir comprando
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={whatsappUrl(`Hola Lina, tengo una pregunta sobre mi pedido ${order.id}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <SiWhatsapp aria-hidden />
              Escribir a Lina
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
