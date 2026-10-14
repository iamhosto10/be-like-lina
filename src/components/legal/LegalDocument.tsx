import { ChevronDown } from "lucide-react";
import { LegalBlocks } from "@/components/legal/LegalBlocks";
import { LegalLayout } from "@/components/legal/LegalLayout";
import type { LegalPageData, LegalSection } from "@/types";

function sectionLabel(section: LegalSection): string {
  return section.number ? `${section.number}. ${section.title}` : section.title;
}

function TocList({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="space-y-0.5 text-sm">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="block rounded-md px-2 py-1.5 leading-snug text-muted-foreground transition-colors outline-none hover:bg-primary/10 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {sectionLabel(section)}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Documento largo: índice lateral (escritorio) o desplegable (móvil) + secciones. */
export function LegalDocument({ page }: { page: LegalPageData }) {
  const showToc = page.sections.length >= 4;

  return (
    <LegalLayout title={page.title} intro={page.intro} currentHref={`/${page.slug}`}>
      <div className={showToc ? "grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16" : ""}>
        {showToc && (
          <aside className="lg:self-start">
            {/* Móvil: desplegable. Escritorio: lista fija a la vista mientras se lee. */}
            <details className="group rounded-xl border border-border bg-card lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                Contenido de esta página
                <ChevronDown
                  className="size-4 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <nav aria-label="Contenido de esta página" className="px-2 pb-3">
                <TocList sections={page.sections} />
              </nav>
            </details>

            <nav
              aria-label="Contenido de esta página"
              className="sticky top-28 hidden max-h-[calc(100svh-9rem)] overflow-y-auto pr-2 lg:block"
            >
              <p className="mb-3 px-2 text-xs font-bold tracking-[0.15em] text-primary uppercase">
                Contenido
              </p>
              <TocList sections={page.sections} />
            </nav>
          </aside>
        )}

        <article className="max-w-3xl min-w-0">
          {page.preamble && (
            <div className="mb-12">
              <LegalBlocks blocks={page.preamble} />
            </div>
          )}

          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="scroll-mt-24">
                <h2
                  id={section.id}
                  className="mb-4 flex items-start gap-3 text-xl font-bold tracking-tight md:text-2xl"
                >
                  {section.number && (
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex min-w-9 shrink-0 items-center justify-center rounded-full bg-primary px-2.5 py-1 text-sm font-bold text-primary-foreground tabular-nums"
                    >
                      {section.number}
                    </span>
                  )}
                  <span>{section.title}</span>
                </h2>
                <LegalBlocks blocks={section.blocks} />
              </section>
            ))}
          </div>
        </article>
      </div>
    </LegalLayout>
  );
}
