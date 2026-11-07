import { Apple, Dumbbell } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { formatCOP } from "@/lib/format";
import { whatsappUrl } from "@/lib/links";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
  className?: string;
}

const icons = { apple: Apple, dumbbell: Dumbbell } as const;

const iconTones = {
  pink: "bg-brand-pink text-brand-night",
  violet: "bg-brand-violet text-brand-white",
} as const;

/** Cuadrícula de las tarjetas: 1 columna en móvil, 2 en tablet y 3 en escritorio. */
export const plansGridClass =
  "grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5 lg:grid-cols-3 lg:gap-x-5";

/** En tablet, una tarjeta suelta (número impar) ocupa las dos columnas para no quedar a medias. */
export function planSpanClass(index: number, total: number) {
  return index === total - 1 && total % 2 === 1 ? "md:col-span-2 lg:col-span-1" : undefined;
}

export function PlanCard({ plan, className }: PlanCardProps) {
  // "mix" muestra la manzana y la mancuerna juntas (planes que combinan nutrición y entrenamiento).
  const Icon = plan.icon === "mix" ? null : icons[plan.icon];
  const highlighted = Boolean(plan.highlight);

  return (
    <article
      className={cn(
        // Móvil: columna normal. md+: 4 filas en subgrid (encabezado · lista · precio · botón),
        // para que cada fila quede alineada con la de la tarjeta vecina aunque el contenido varíe.
        "relative flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0 md:p-7",
        highlighted && "border-primary/40 ring-1 ring-primary/15",
        className,
      )}
    >
      {/* Etiqueta sobre el borde: no ocupa espacio, así las dos tarjetas arrancan a la misma altura. */}
      {plan.highlight && (
        <p className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-[0.12em] text-primary-foreground uppercase md:left-7">
          {plan.highlight}
        </p>
      )}

      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={cn(
            "inline-flex size-14 shrink-0 items-center justify-center rounded-full",
            iconTones[plan.iconTone],
          )}
        >
          {Icon ? (
            <Icon className="size-7" strokeWidth={1.75} />
          ) : (
            <span className="flex items-center gap-1">
              <Apple className="size-5" strokeWidth={1.75} />
              <Dumbbell className="size-5" strokeWidth={1.75} />
            </span>
          )}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-bold md:text-xl">{plan.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground md:self-start">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span
              aria-hidden
              className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-current text-primary"
            />
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-6 md:self-end">
        <span className="text-2xl font-extrabold tracking-tight tabular-nums md:text-[1.75rem]">
          {formatCOP(plan.price)}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">{plan.priceNote}</span>
      </p>

      <div className="mt-5">
        <Button
          size="lg"
          variant={highlighted ? "default" : "outline"}
          nativeButton={false}
          render={
            <a href={whatsappUrl(plan.whatsappMessage)} target="_blank" rel="noopener noreferrer" />
          }
          className={cn(
            // Mismo ancho, alto y borde en las dos variantes: solo cambia el relleno.
            "w-full border border-primary sm:w-48",
            !highlighted && "text-primary hover:bg-primary/10",
          )}
        >
          Elegir plan
        </Button>
      </div>
    </article>
  );
}
