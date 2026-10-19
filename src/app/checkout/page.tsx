import type { Metadata } from "next";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { commerce } from "@/lib/commerce/config";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = { title: "Finalizar compra" };

export default function CheckoutPage() {
  return (
    <>
      <Section tone="dark" className="pt-28 pb-8 md:pt-36 md:pb-10">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Tienda", href: "/tienda" },
            { label: "Finalizar compra" },
          ]}
        />
        <h1 className="mt-5 text-3xl md:text-5xl">Finalizar compra</h1>
        {commerce.mode === "demo" && (
          <p className="mt-4 max-w-2xl rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
            <strong>Modo demostración.</strong> Puedes recorrer todo el proceso, pero el pago se
            simula y no se cobra nada.
          </p>
        )}
      </Section>

      <Section tone="light" className="py-10 md:py-14">
        {commerce.enabled ? (
          <CheckoutForm />
        ) : (
          <div className="mx-auto max-w-lg py-10 text-center">
            <h2 className="text-2xl font-bold">Los pagos en línea llegan muy pronto</h2>
            <p className="mt-3 text-muted-foreground">
              Mientras tanto, puedes comprar escribiéndole a Lina por WhatsApp.
            </p>
            <Button
              size="xl"
              className="mt-6"
              nativeButton={false}
              render={
                <a
                  href={whatsappUrl("Hola Lina, quiero hacer un pedido.")}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <SiWhatsapp aria-hidden />
              Comprar por WhatsApp
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}
