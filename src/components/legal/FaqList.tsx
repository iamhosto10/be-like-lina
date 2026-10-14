import { Plus } from "lucide-react";
import { LegalBlocks } from "@/components/legal/LegalBlocks";
import type { FaqItem } from "@/types";

/**
 * Acordeón con `<details>` nativo: accesible con teclado y lectores de pantalla,
 * sin JavaScript. `name` hace que al abrir una se cierre la anterior.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="max-w-3xl space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          name="faq"
          className="group rounded-xl border border-border bg-card text-card-foreground shadow-sm open:border-primary/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-base font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:text-lg [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <div className="px-5 pb-5">
            <LegalBlocks blocks={item.answer} />
          </div>
        </details>
      ))}
    </div>
  );
}
