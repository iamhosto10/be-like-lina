import { site } from "@/data/site";
import { lina } from "@/data/lina";
import { products } from "@/data/products";
import { plans } from "@/data/plans";
import { freeRecipeBook } from "@/data/recipes";
import { formatCOP } from "@/lib/format";
import { externalProductUrl, whatsappUrl } from "@/lib/links";
import { siteUrl } from "@/lib/site-url";

/**
 * /llms.txt — resumen del sitio en Markdown para asistentes de IA (llmstxt.org).
 * Se genera desde `src/data`, así nunca queda desactualizado frente a la web.
 */
/* Sin datos de petición: se prerenderiza en el build como un archivo estático. */
export const dynamic = "force-static";

export function GET() {
  const productLines = products
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((p) => {
      const name = p.variant ? `${p.name} (${p.variant})` : p.name;
      return `- [${name}](${externalProductUrl(p.externalSlug)}): ${p.spec}. ${formatCOP(p.price)} COP`;
    });

  const planLines = plans.map(
    (plan) =>
      `- ${plan.name} — ${formatCOP(plan.price)} COP, ${plan.priceNote}. ${plan.tagline} Incluye: ${plan.features.join(", ")}. Se contrata por WhatsApp: ${whatsappUrl(plan.whatsappMessage)}`,
  );

  const socialLines = site.socials
    .filter((s) => s.name !== "WhatsApp")
    .map((s) => `- ${s.name}: ${s.href}`);

  const body = `# ${site.name}

> ${site.description}

${site.name} es la marca de ${lina.name}, ${lina.role.toLowerCase()}, ${lina.credentials.toLowerCase()}. Con sede en ${site.contact.city}, ${site.contact.country}; atiende a todo el país. Sitio en español (${site.locale}).

En palabras de Lina: «${lina.story}»

## Servicios de coaching

${planLines.join("\n")}

## Tienda (suplementos y guías)

${productLines.join("\n")}

Compra online en ${site.external.store} (pago con Mercado Pago, envíos a toda Colombia).

## Recursos gratuitos

- ${freeRecipeBook.title}: ${freeRecipeBook.text} Se recibe por correo suscribiéndose en ${siteUrl}/#recetas

## Contacto

- WhatsApp: ${site.contact.whatsappDisplay} — ${whatsappUrl()}
- Correo: ${site.contact.email}
${socialLines.join("\n")}

## Páginas

- [Inicio](${siteUrl}/): hero, tienda, recetas saludables, planes de entrenamiento y blog.
- [Tienda actual](${site.external.store})
- [Servicios](${site.external.services})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
