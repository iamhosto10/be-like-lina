import type {
  BreadcrumbList,
  FAQPage,
  ItemList,
  Organization,
  Person,
  Product,
  Thing,
  WebSite,
} from "schema-dts";
import { site } from "@/data/site";
import { lina } from "@/data/lina";
import { categoryLabels, sortedProducts } from "@/data/products";
import { store } from "@/data/store";
import { stripRichText } from "@/components/legal/RichText";
import type { FaqItem, LegalBlock, Product as ProductData } from "@/types";
import { plans } from "@/data/plans";
import { whatsappUrl } from "@/lib/links";
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

/** Esquema de un producto del catálogo. La URL es la ficha del sitio; la oferta apunta a donde se compra. */
export function productSchema(p: ProductData): Product {
  return {
    "@type": "Product",
    name: p.variant ? `${p.name} · ${p.variant}` : p.name,
    description: p.tagline,
    ...(p.image && { image: absoluteUrl(p.image.src) }),
    url: absoluteUrl(`/tienda/${p.slug}`),
    category: categoryLabels[p.category],
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/tienda/${p.slug}`),
      seller: { "@id": ORG_ID },
    },
  };
}

/** Un `Product` por artículo del catálogo, en el orden de la tienda. */
export const productSchemas: Product[] = sortedProducts.map(productSchema);

/** Migas de pan para buscadores (coincide con el componente `Breadcrumbs`). */
function breadcrumbSchema(items: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Grafo de la página /tienda. */
export const storePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/tienda"),
      name: `Tienda · ${site.name}`,
      description: store.intro,
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: site.locale,
      mainEntity: {
        "@type": "ItemList",
        name: "Catálogo Be Like Lina",
        numberOfItems: productSchemas.length,
        itemListElement: productSchemas.map((item, i) => ({
          "@type": "ListItem" as const,
          position: i + 1,
          item,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: "Tienda", path: "/tienda" },
    ]),
  ],
} satisfies { "@context": "https://schema.org"; "@graph": Thing[] };

/** Grafo de una ficha de producto. */
export function productPageSchema(p: ProductData) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      productSchema(p),
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Tienda", path: "/tienda" },
        { name: p.variant ? `${p.name} · ${p.variant}` : p.name, path: `/tienda/${p.slug}` },
      ]),
    ],
  } satisfies { "@context": "https://schema.org"; "@graph": Thing[] };
}

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

/** Grafo de una página de texto (términos, privacidad, envíos…). */
export function legalPageSchema(page: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        url: absoluteUrl(page.path),
        inLanguage: site.locale,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
      },
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: page.title, path: page.path },
      ]),
    ],
  } satisfies { "@context": "https://schema.org"; "@graph": Thing[] };
}

function blocksToText(blocks: LegalBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "p" || b.type === "subheading") return stripRichText(b.text);
      if (b.type === "ul" || b.type === "ol") return b.items.map(stripRichText).join(" · ");
      return b.lines.join(" ");
    })
    .join(" ");
}

/** Preguntas y respuestas para los resultados enriquecidos y los asistentes de IA. */
export function faqPageSchema(items: FaqItem[], path: string) {
  const faq: FAQPage = {
    "@type": "FAQPage",
    "@id": absoluteUrl(path),
    inLanguage: site.locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: blocksToText(item.answer) },
    })),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      faq,
      breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Preguntas frecuentes", path: path },
      ]),
    ],
  } satisfies { "@context": "https://schema.org"; "@graph": Thing[] };
}
