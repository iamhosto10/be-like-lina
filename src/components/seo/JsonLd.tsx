import type { Thing, WithContext } from "schema-dts";

type Graph = { "@context": "https://schema.org"; "@graph": Thing[] };

/**
 * Inserta datos estructurados (schema.org) para buscadores y motores de IA.
 * Escapa `<` para que ningún texto pueda cerrar la etiqueta <script>.
 */
export function JsonLd({ data }: { data: WithContext<Thing> | Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
