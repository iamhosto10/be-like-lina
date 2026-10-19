/** «Proteína Shaker · Sabor chocolate». Vive aparte de pricing.ts para no cargar el catálogo en el navegador. */
export function itemLabel(item: { name: string; variant?: string }): string {
  return item.variant ? `${item.name} · ${item.variant}` : item.name;
}
