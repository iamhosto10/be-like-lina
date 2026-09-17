import type { ItemList, Organization, Person, Product, WebSite } from "schema-dts";
import { site } from "@/data/site";
import { lina } from "@/data/lina";
import { products } from "@/data/products";
import { plans } from "@/data/plans";
import { externalProductUrl, whatsappUrl } from "@/lib/links";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/* Identificadores estables para enlazar entidades entre sí dentro del grafo. */
const ORG_ID = `${siteUrl}/#organization`;
const PERSON_ID = `${siteUrl}/#lina`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** Lina como persona: fundadora y autora de los contenidos. */
export const linaSchema: Person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: lina.name,
  jobTitle: lina.role,
  description: lina.credentials,
  image: absoluteUrl(lina.images.portrait.src),
  url: siteUrl,
  worksFor: { "@id": ORG_ID },
  sameAs: site.socials.filter((s) => s.name !== "WhatsApp").map((s) => s.href),
};

/** La marca. `Organization` es lo que Google y los LLM esperan para un negocio online. */
export const organizationSchema: Organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: siteUrl,
  logo: absoluteUrl("/images/logo/logo-blanco.webp"),
  image: absoluteUrl(lina.images.og.src),
  description: site.description,
  foundingDate: String(lina.since),
  founder: { "@id": PERSON_ID },
  email: site.contact.email,
  telephone: `+${site.contact.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.city,
    addressCountry: "CO",
  },
  areaServed: { "@type": "Country", name: site.contact.country },
  sameAs: site.socials.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: whatsappUrl(),
    availableLanguage: "es",
  },
};

export const webSiteSchema: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: site.name,
  url: siteUrl,
  inLanguage: site.locale,
  publisher: { "@id": ORG_ID },
};

/** Un `Product` por artículo del catálogo, con su oferta en pesos colombianos. */
export const productSchemas: Product[] = products
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((p) => ({
    "@type": "Product",
    name: p.variant ? `${p.name} · ${p.variant}` : p.name,
    description: p.spec,
    ...(p.image && { image: absoluteUrl(p.image.src) }),
    url: externalProductUrl(p.externalSlug),
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "COP",
      url: externalProductUrl(p.externalSlug),
      seller: { "@id": ORG_ID },
    },
  }));

/** Los planes de coaching como servicios con precio. */
export const planSchemas: Product[] = plans.map((plan) => ({
  "@type": "Product",
  name: plan.name,
  description: `${plan.tagline} Incluye: ${plan.features.join(", ")}.`,
  brand: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    price: plan.price,
    priceCurrency: "COP",
    url: whatsappUrl(plan.whatsappMessage),
    seller: { "@id": ORG_ID },
  },
}));

/** Lista ordenada de productos que muestra el home (para rich results de tienda). */
export const productListSchema: ItemList = {
  "@type": "ItemList",
  name: "Tienda Be Like Lina",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: productSchemas.length,
  itemListElement: productSchemas.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item,
  })),
};

export const planListSchema: ItemList = {
  "@type": "ItemList",
  name: "Planes de entrenamiento y nutrición",
  numberOfItems: planSchemas.length,
  itemListElement: planSchemas.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item,
  })),
};
