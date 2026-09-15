import { site } from "@/data/site";

/** URL de WhatsApp con mensaje prellenado, usando el número del sitio. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** URL de un producto en la tienda actual (WordPress) mientras no exista la nueva. */
export function externalProductUrl(slug: string): string {
  return `${site.external.store}product/${slug}/`;
}
