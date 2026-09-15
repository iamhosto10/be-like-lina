import type { Product } from "@/types";

/**
 * Catálogo real de belikelina.com (precios en COP, septiembre 2026).
 * `featured` marca los 6 que aparecen en la rejilla del home.
 * `externalSlug` es el slug en la tienda actual (WordPress) mientras no exista la nueva.
 */
export const products: Product[] = [
  {
    slug: "proteina-shaker-chocolate",
    externalSlug: "protein-100",
    name: "Proteína Shaker",
    variant: "Sabor chocolate",
    category: "proteina",
    price: 203000,
    spec: "Aislada de suero · 900 g · con BCAAs y prebióticos",
    image: {
      src: "/images/productos/shaker-chocolate.webp",
      alt: "Bote de Proteína Shaker Be Like Lina sabor chocolate",
      width: 800,
      height: 800,
    },
    featured: true,
    order: 1,
  },
  {
    slug: "proteina-shaker-vainilla",
    externalSlug: "protein-100-red",
    name: "Proteína Shaker",
    variant: "Sabor vainilla",
    category: "proteina",
    price: 203000,
    spec: "Aislada de suero · 900 g · con BCAAs y prebióticos",
    image: {
      src: "/images/productos/shaker-vainilla.webp",
      alt: "Bote de Proteína Shaker Be Like Lina sabor vainilla",
      width: 800,
      height: 800,
    },
    featured: true,
    order: 2,
  },
  {
    slug: "pre-entreno-fishz",
    externalSlug: "protein-100-purple",
    name: "Pre-Entreno FISHZ",
    variant: "Frutos rojos",
    category: "pre-entreno",
    price: 145000,
    spec: "Guaraná, maca, borojó y chontaduro · 400 g",
    image: {
      src: "/images/productos/fishz.webp",
      alt: "Bote de Pre-Entreno FISHZ Be Like Lina sabor frutos rojos",
      width: 800,
      height: 800,
    },
    featured: true,
    order: 3,
  },
  {
    slug: "guia-alimentacion-saludable",
    externalSlug: "guia-de-alimentacion-saludable",
    name: "Guía de Alimentación Saludable",
    category: "digital",
    price: 170000,
    spec: "Digital · macronutrientes y micronutrientes explicados",
    image: null, // Pendiente: mockup de la guía.
    featured: true,
    order: 4,
  },
  {
    slug: "santtina",
    externalSlug: "santina",
    name: "Santtina",
    variant: "Antioxidante",
    category: "antioxidante",
    price: 180000,
    spec: "Astaxantina 4 mg · 60 softgels",
    image: {
      src: "/images/productos/santtina.webp",
      alt: "Frasco de Santtina, antioxidante con astaxantina, 60 softgels",
      width: 447,
      height: 559,
    },
    featured: true,
    order: 5,
  },
  {
    slug: "stevia-250",
    externalSlug: "stevia",
    name: "Stevia",
    variant: "250 ml",
    category: "endulzante",
    price: 33000,
    spec: "Endulzante líquido · sin calorías · apto para diabéticos",
    image: {
      src: "/images/productos/stevia.webp",
      alt: "Botella de Stevia Be Like Lina de 250 ml",
      width: 285,
      height: 901,
    },
    featured: true,
    order: 6,
  },
  {
    slug: "stevia-100",
    externalSlug: "stevia-2",
    name: "Stevia",
    variant: "100 ml",
    category: "endulzante",
    price: 21000,
    spec: "Endulzante líquido · sin calorías · apto para diabéticos",
    image: {
      src: "/images/productos/stevia.webp",
      alt: "Botella de Stevia Be Like Lina de 100 ml",
      width: 285,
      height: 901,
    },
    featured: false,
    order: 7,
  },
  {
    slug: "recetario-batidos",
    externalSlug: "batidos-con-funcion-be-like-lina",
    name: "Recetario de Batidos con Función",
    category: "digital",
    price: 90000,
    spec: "Digital · 5 batidos: desinflamatorio, detox, antioxidante, hidratante y aloe vera",
    image: {
      src: "/images/productos/recetario.webp",
      alt: "Batido rojo con fresas y cerezas, imagen del Recetario de Batidos con Función",
      width: 467,
      height: 466,
    },
    featured: false,
    order: 8,
  },
];

export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
