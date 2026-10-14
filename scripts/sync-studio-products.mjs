/**
 * Mantiene al día la lista de productos que se puede elegir en el Studio.
 *
 *   pnpm studio:sync
 *
 * Los productos viven en src/data/products.ts; el Studio es otro proyecto y no puede importarlos,
 * así que se copia su lista a studio/schemaTypes/productOptions.ts. Correrlo cada vez que se
 * agregue o renombre un producto, y volver a desplegar el Studio (`cd studio && pnpm deploy`).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(root, "src/data/products.ts"), "utf8");

const re =
  /slug: "([^"]+)",\s*externalSlug: "[^"]*",\s*name: "([^"]+)",(?:\s*variant: "([^"]+)",)?/g;
const options = [...source.matchAll(re)].map(([, slug, name, variant]) => ({
  title: variant ? `${name} · ${variant}` : name,
  value: slug,
}));
if (options.length === 0) throw new Error("No encontré productos en src/data/products.ts");

const body = options
  .map((o) => `  {title: ${JSON.stringify(o.title)}, value: ${JSON.stringify(o.value)}},`)
  .join("\n");
await writeFile(
  path.join(root, "studio/schemaTypes/productOptions.ts"),
  `// GENERADO por \`pnpm studio:sync\` a partir de src/data/products.ts. No editar a mano.\nexport const productOptions = [\n${body}\n]\n`,
);
console.log(`✓ studio/schemaTypes/productOptions.ts  ${options.length} productos`);
