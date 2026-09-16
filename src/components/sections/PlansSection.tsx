import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlanCard } from "@/components/shared/PlanCard";
import { plans } from "@/data/plans";
import { site } from "@/data/site";

export function PlansSection() {
  return (
    <Section tone="light" id="planes" aria-labelledby="planes-titulo">
      <SectionHeader
        number={3}
        title="Planes de entrenamiento"
        subtitle="Elige el plan que se adapta a tus objetivos."
        titleId="planes-titulo"
        action={{ label: "Ver todos los planes", href: site.external.services, external: true }}
      />

      <ul className="grid gap-5 md:grid-cols-2 md:gap-6" aria-label="Planes">
        {plans.map((plan) => (
          <li key={plan.slug}>
            <PlanCard plan={plan} className="h-full" />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        ¿No sabes cuál elegir?{" "}
        <a
          href={site.nav.find((n) => n.label === "Contáctame")?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-semibold text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Escríbeme por WhatsApp
        </a>{" "}
        y te oriento sin compromiso.
      </p>
    </Section>
  );
}
