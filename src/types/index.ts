/** Enlace de navegación. `external` abre en pestaña nueva. */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  name: "Instagram" | "TikTok" | "Facebook" | "WhatsApp";
  href: string;
}

/** Imagen estática en /public con sus dimensiones reales (evita CLS). */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory =
  "proteina" | "pre-entreno" | "antioxidante" | "endulzante" | "digital";

export interface Product {
  /** Identificador interno (futura ruta /tienda/[slug]). */
  slug: string;
  /** Slug del producto en la tienda actual (WordPress), para el enlace externo. */
  externalSlug: string;
  name: string;
  /** Variante corta para la tarjeta (p. ej. "Sabor chocolate"). */
  variant?: string;
  category: ProductCategory;
  /** Precio en pesos colombianos, sin decimales. */
  price: number;
  /** Ficha de una línea para la tarjeta. */
  spec: string;
  image: ImageAsset | null;
  /** Se muestra en la rejilla del home. */
  featured: boolean;
  /** Orden de aparición. */
  order: number;
}

export type PlanIcon = "apple" | "dumbbell";

export interface Plan {
  slug: string;
  name: string;
  /** Descripción corta bajo el nombre. */
  tagline: string;
  price: number;
  priceNote: string;
  /** Lo que incluye. */
  features: string[];
  icon: PlanIcon;
  iconTone: "pink" | "violet";
  /** Etiqueta destacada (p. ej. "Más completo"). */
  highlight?: string;
  /** Mensaje prellenado para WhatsApp. */
  whatsappMessage: string;
}

export interface Recipe {
  slug: string;
  title: string;
  kind: "comida" | "batido";
  /** Ingredientes principales · tiempo. */
  summary: string;
  image: ImageAsset | null;
  href: string;
}

export type PostCategory = "Nutrición" | "Entrenamiento" | "Recetas" | "Mentalidad";

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  image: ImageAsset | null;
  href: string;
}
