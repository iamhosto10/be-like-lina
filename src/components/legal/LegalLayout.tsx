import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RichText } from "@/components/legal/RichText";
import { site } from "@/data/site";
import { whatsappUrl } from "@/lib/links";

interface LegalLayoutProps {
  title: string;
  /** Texto de entrada bajo el título. */
  intro?: string;
  /** Ruta de la página actual, para marcarla en «Otros documentos». */
  currentHref: string;
  children: ReactNode;
}

/**
 * Marco común de las páginas de texto: cabecera oscura con migas, cuerpo claro
 * (la lectura larga se hace sobre fondo claro), enlaces a los demás documentos
 * y cierre con WhatsApp.
 */
export function LegalLayout({ title, intro, currentHref, children }: LegalLayoutProps) {
  const others = site.legal.filter((item) => item.href !== currentHref);

  return (
    <>
      <Section tone="dark" className="pt-28 pb-10 md:pt-36 md:pb-14">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: title }]} />
        <h1 className="mt-5 text-3xl md:text-5xl">{title}</h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            <RichText text={intro} />
          </p>
        )}
      </Section>

      <Section tone="light" className="py-12 md:py-16">
        {children}
      </Section>

      <Section tone="wine" className="py-12 md:py-16" aria-labelledby="mas-informacion">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="mas-informacion" className="text-xl font-bold tracking-tight uppercase">
              Otros documentos
            </h2>
            <ul className="mt-5 space-y-1">
              {others.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 rounded-sm py-1.5 text-base font-medium outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {item.label}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight uppercase">¿Tienes dudas?</h2>
            <p className="mt-3 text-muted-foreground">
              Escríbele a Lina y te responde por WhatsApp.
            </p>
            <Button
              size="xl"
              className="mt-5"
              nativeButton={false}
              render={
                <a
                  href={whatsappUrl(`Hola Lina, tengo una consulta sobre: ${title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <SiWhatsapp aria-hidden />
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
