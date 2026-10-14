import { RichText } from "@/components/legal/RichText";
import type { LegalBlock } from "@/types";

/** Renderiza los bloques de una sección con la tipografía de lectura del sitio. */
export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-4 text-[0.9375rem] leading-relaxed md:text-base">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <RichText text={block.text} />
              </p>
            );
          case "subheading":
            return (
              <h3 key={i} className="pt-3 text-base font-bold tracking-tight md:text-lg">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-primary">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary"
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            );
          case "contact":
            return (
              <address
                key={i}
                className="rounded-xl border border-border bg-card px-5 py-4 text-sm not-italic"
              >
                {block.lines.map((line) => (
                  <p key={line} className={line.includes("@") ? "" : "font-semibold"}>
                    {line.includes("@") ? <RichText text={`[${line}](mailto:${line})`} /> : line}
                  </p>
                ))}
              </address>
            );
        }
      })}
    </div>
  );
}
