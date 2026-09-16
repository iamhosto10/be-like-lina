import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { whatsappUrl } from "@/lib/links";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  /** Ancla del home a la que volver. */
  backHref: string;
  backLabel: string;
}

/**
 * Página provisional para contenido que existe en el home pero cuya
 * página propia aún no está escrita. Evita enlaces muertos.
 */
export function ComingSoon({ eyebrow, title, backHref, backLabel }: ComingSoonProps) {
  return (
    <Section tone="dark" className="pt-32 md:pt-40">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-primary uppercase">
          <Clock className="size-4" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl">{title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Este contenido está en preparación. Muy pronto estará disponible aquí.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href={backHref} />}
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel}
          </Button>
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href={whatsappUrl(`Hola Lina, me interesa: ${title}`)}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Pregúntame por WhatsApp
          </Button>
        </div>
      </div>
    </Section>
  );
}
