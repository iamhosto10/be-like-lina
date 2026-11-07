import type { Product, ProductCategory } from "@/types";

/**
 * Catálogo real de belikelina.com (precios y textos verificados en la tienda
 * actual, octubre 2026). `featured` marca los 6 que aparecen en el home.
 * `externalSlug` es el slug del producto en el WordPress anterior; ya no se enlaza, pero sirve
 * para las redirecciones 301 (/product/<externalSlug>/ → /tienda/<slug>) al migrar el dominio.
 */
export const products: Product[] = [
  {
    slug: "proteina-shaker-chocolate",
    externalSlug: "protein-100",
    name: "Proteína Shaker",
    variant: "Sabor chocolate",
    category: "proteina",
    price: 220000,
    spec: "Aislada de suero · 900 g · con BCAAs y prebióticos",
    tagline: "Proteína whey ideal para alcanzar tu requerimiento proteico de una forma más fácil y divertida.",
    description: [
      "Proteína Shaker aislada de suero de leche (whey), con aminoácidos esenciales y prebióticos. Cada scoop aporta 25 g de proteína, el apoyo que tu cuerpo necesita para recuperarse y mantener masa muscular.",
      "Se mezcla fácil en agua. Sabor chocolate (cacao).",
    ],
    highlights: [
      "Proteína aislada de suero de leche (whey limpia)",
      "BCAAs: leucina, valina e isoleucina",
      "Con prebióticos, más amable con la digestión",
      "25 g de proteína por scoop",
    ],
    specs: [
      { label: "Presentación", value: "900 g · 29 servicios" },
      { label: "Proteína por scoop", value: "25 g" },
      { label: "Sabor", value: "Chocolate (cacao)" },
      { label: "Modo de uso", value: "1 scoop en 250 ml de agua" },
    ],
    image: {
      src: "/images/productos/shaker-chocolate.webp",
      alt: "Bote de Proteína Shaker Be Like Lina sabor chocolate, 900 g, junto a trozos de chocolate",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
    featured: true,
    order: 1,
  },
  {
    slug: "proteina-shaker-vainilla",
    externalSlug: "protein-100-red",
    name: "Proteína Shaker",
    variant: "Sabor vainilla",
    category: "proteina",
    price: 220000,
    spec: "Aislada de suero · 900 g · con BCAAs y prebióticos",
    tagline: "Proteína whey ideal para alcanzar tu requerimiento proteico de una forma más fácil y divertida.",
    description: [
      "Proteína Shaker aislada de suero de leche (whey), con aminoácidos esenciales y prebióticos. Cada scoop aporta 25 g de proteína, el apoyo que tu cuerpo necesita para recuperarse y mantener masa muscular.",
      "Se mezcla fácil en agua. Sabor vainilla.",
    ],
    highlights: [
      "Proteína aislada de suero de leche (whey limpia)",
      "BCAAs: leucina, valina e isoleucina",
      "Con prebióticos, más amable con la digestión",
      "25 g de proteína por scoop",
    ],
    specs: [
      { label: "Presentación", value: "900 g · 29 servicios" },
      { label: "Proteína por scoop", value: "25 g" },
      { label: "Sabor", value: "Vainilla" },
      { label: "Modo de uso", value: "1 scoop en 250 ml de agua" },
    ],
    image: {
      src: "/images/productos/shaker-vainilla.webp",
      alt: "Bote de Proteína Shaker Be Like Lina sabor vainilla, 900 g, junto a una flor y vainas de vainilla",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
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
    spec: "Guaraná, maca, borojó y chontaduro · 900 g · sin azúcar",
    tagline: "Energía natural para entrenar sin terminar agotado.",
    description: [
      "Pre-entreno de frutos silvestres con guaraná, maca, borojó y chontaduro: ingredientes que la tradición colombiana usa para resistencia y vitalidad, en una fórmula sin azúcar.",
      "Tómalo entre 20 y 30 minutos antes de entrenar. Sabor a frutos rojos.",
    ],
    highlights: [
      "Con guaraná, maca, borojó y chontaduro",
      "0 azúcar",
      "Ideal 20–30 minutos antes de entrenar",
    ],
    specs: [
      { label: "Presentación", value: "400 gramos 20 servicios" },
      { label: "Sabor", value: "Frutos rojos" },
      { label: "Azúcar", value: "0 g" },
      { label: "Modo de uso", value: "1 scoop en agua, 20–30 min antes de entrenar" },
    ],
    image: {
      src: "/images/productos/fishz.webp",
      alt: "Bote de Pre-Entreno FISHZ Be Like Lina sabor frutos rojos, 900 g, rodeado de fresas, moras y maca",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
    featured: true,
    order: 3,
  },
  {
    slug: "guia-alimentacion-saludable",
    externalSlug: "guia-de-alimentacion-saludable",
    name: "Guía de Alimentación Saludable",
    category: "digital",
    price: 170000,
    spec: "Digital · desayunos, almuerzos, snacks y cenas",
    tagline: "Alimentación balanceada que aporta nutrientes para alcanzar tu máximo desarrollo",
    description: [
      "La Guía de Alimentación Saludable está diseñada para orientarte sobre qué alimentos elegir para una dieta equilibrada: mejorar tu nutrición, prevenir enfermedades y sostener tu bienestar.",
      "Incluye desayunos, almuerzos, cenas y snacks saludables.",
    ],
    highlights: [
      "Desayunos, almuerzos, cenas y snacks",
      "Recetas prácticas para el día a día",
      "Asesoría incluida",
      "Formato digital: la recibes al comprar",
    ],
    specs: [
      { label: "Formato", value: "Digital (PDF)" },
      { label: "Entrega", value: "Después de confirmar el pago" },
    ],
    image: {
      src: "/images/productos/guia-portada.webp",
      alt: "Portada de la Guía de Alimentación Saludable de Be Like Lina, con un plato de pollo, brócoli y aguacate",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
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
    spec: "Antioxidante en cápsulas · 60 unidades",
    tagline: "Potente antioxidante con prueba científica.",
    description: [
      "Santtina es un antioxidante potente con múltiples beneficios para la salud: piel y cabello, sistema cardiovascular, resistencia muscular, defensas, salud cerebral, gástrica y visual.",
      "Una cápsula al día, acompañada de una comida.",
    ],
    highlights: [
      "Salud de la piel",
      "Salud cardiovascular",
      "Resistencia muscular",
      "Función inmune",
      "Salud cerebral",
      "Salud gástrica",
      "Agudeza visual y salud ocular",
    ],
    specs: [
      { label: "Presentación", value: "60 cápsulas" },
      { label: "Modo de uso", value: "Modo de uso: 1 cápsula al día" },
    ],
    image: {
      src: "/images/productos/santtina.webp",
      alt: "Dos frascos rojos de Santtina con cápsulas de antioxidante",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
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
    spec: "Endulzante líquido · 0 calorías · 1.000 porciones",
    tagline: "Endulza sin azúcar y sin calorías.",
    description: [
      "Endulzante líquido de stevia: solo hoja y agua de stevia. Sin calorías, sin grasas y sin azúcares.",
      "Con 3 a 5 gotas endulzas una bebida",
    ],
    highlights: [
      "Ingredientes: hoja y agua de stevia",
      "0 calorías, 0 grasas, 0 azúcares",
      "Rinde ~1.000 porciones de 0,25 ml",
      "Apto para adultos y niños mayores de 4 años",
    ],
    specs: [
      { label: "Presentación", value: "250 ml" },
      { label: "Modo de uso", value: "3 a 5 gotas por bebida" },
    ],
    image: {
      src: "/images/productos/stevia-250.webp",
      alt: "Botella de Stevia Be Like Lina de 250 ml, endulzante líquido sin calorías, con hojas de menta",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
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
    spec: "Endulzante líquido · 0 calorías · formato de bolsillo",
    tagline: "Endulza sin azúcar y sin calorías.",
    description: [
      "Endulzante líquido de stevia: solo hoja y agua de stevia. Sin calorías, sin grasas y sin azúcares.",
      "Con 3 a 5 gotas endulzas una bebida.",
    ],
    highlights: [
      "Ingredientes: hoja y agua de stevia",
      "0 calorías, 0 grasas, 0 azúcares",
      "Formato de bolsillo",
    ],
    specs: [
      { label: "Presentación", value: "100 ml" },
      { label: "Modo de uso", value: "3 a 5 gotas por bebida" },
    ],
    // Mismo render que la de 250 ml: no hay foto propia del formato de 100 ml.
    image: {
      src: "/images/productos/stevia-250.webp",
      alt: "Botella de Stevia Be Like Lina, endulzante líquido sin calorías, con hojas de menta",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
    featured: false,
    order: 7,
  },
  {
    slug: "recetario-batidos",
    externalSlug: "batidos-con-funcion-be-like-lina",
    name: "Recetario de Batidos Orgánicos con Función",
    category: "digital",
    price: 90000,
    spec: "Digital · batidos antioxidantes, detox y desinflamatorios",
    tagline: "Batidos a base de vegetales y frutas (vitaminas y minerales) que cumplen cada uno una función.",
    description: [
      "Con este recetario sacas el máximo provecho en nutrientes, vitaminas y minerales. Cada batido está pensado para un objetivo concreto, con ingredientes naturales que consigues en cualquier mercado.",
    ],
    highlights: [
      "Batido antioxidante",
      "Batido con aloe vera",
      "Batido hidratante",
      "Batido detox",
      "Batido desinflamatorio",
    ],
    specs: [
      { label: "Formato", value: "Digital (PDF)" },
      { label: "Entrega", value: "Después de confirmar el pago" },
    ],
    image: {
      src: "/images/productos/recetario.webp",
      alt: "Portada del Recetario de Batidos Orgánicos con Función, con un batido de fresa y cerezas",
      width: 900,
      height: 900,
    },
    imageTone: "dark",
    featured: false,
    order: 8,
  },
];

/** Nombre visible de cada categoría en la tienda. */
export const categoryLabels: Record<ProductCategory, string> = {
  proteina: "Proteína",
  "pre-entreno": "Pre-entreno",
  antioxidante: "Antioxidante",
  endulzante: "Endulzante",
  digital: "Guía digital",
};

/** Agrupación de la página /tienda, en el orden en que se muestra. */
export const storeGroups = [
  {
    id: "suplementos",
    title: "Suplementos",
    description: "Proteína, pre-entreno y antioxidante para acompañar tu entrenamiento.",
    categories: ["proteina", "pre-entreno", "antioxidante"] as ProductCategory[],
  },
  {
    id: "digitales",
    title: "Guías y recetarios",
    description: "Contenido digital que recibes al comprar",
    categories: ["digital"] as ProductCategory[],
  },
  {
    id: "endulzantes",
    title: "Edulcorante natural",
    description: "Stevia líquida orgánica sin calorías apta para diabéticos en dos presentaciones.",
    categories: ["endulzante"] as ProductCategory[],
  },
];

export const sortedProducts = products.slice().sort((a, b) => a.order - b.order);

export const featuredProducts = sortedProducts.filter((p) => p.featured);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Productos de la misma categoría (o los siguientes del catálogo) para "También te puede servir". */
export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return [];
  const sameCategory = sortedProducts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = sortedProducts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
