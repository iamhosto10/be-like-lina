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

export function PlanCard({ plan, className }: PlanCardProps) {
  const Icon = icons[plan.icon];
  const highlighted = Boolean(plan.highlight);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-7",
        highlighted && "border-primary/40 ring-1 ring-primary/15",
        className,
      )}
    >
      {plan.highlight && (
        <p className="mb-3 text-xs font-bold tracking-[0.15em] text-primary uppercase">
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
          <Icon className="size-7" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-bold md:text-xl">{plan.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
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

      <p className="mt-6">
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
          className={cn(!highlighted && "border-primary text-primary hover:bg-primary/10")}
        >
          Elegir plan
        </Button>
      </div>
    </article>
  );
}
