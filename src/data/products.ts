import type { Product, ProductCategory } from "@/types";

/**
 * Catálogo real de belikelina.com (precios y textos verificados en la tienda
 * actual, octubre 2026). `featured` marca los 6 que aparecen en el home.
 * `externalSlug` es el slug en WooCommerce, donde se completa la compra.
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
    tagline: "Proteína limpia para recuperar después de entrenar.",
    description: [
      "Proteína Shaker es aislada de suero de leche (whey limpia), con aminoácidos esenciales y prebióticos. Cada scoop aporta 25 g de proteína, el apoyo que tu cuerpo necesita para recuperarse y mantener masa muscular.",
      "Se mezcla fácil en agua o leche vegetal. Sabor chocolate (cacao).",
    ],
    highlights: [
      "Proteína aislada de suero de leche (whey limpia)",
      "BCAAs: leucina, valina e isoleucina",
      "Con prebióticos, más amable con la digestión",
      "25 g de proteína por scoop",
    ],
    specs: [
      { label: "Presentación", value: "900 g · 29 porciones" },
      { label: "Proteína por scoop", value: "25 g" },
      { label: "Sabor", value: "Chocolate (cacao)" },
      { label: "Modo de uso", value: "1 scoop en 250 ml de agua o leche vegetal" },
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
    price: 203000,
    spec: "Aislada de suero · 900 g · con BCAAs y prebióticos",
    tagline: "La misma proteína limpia, en sabor vainilla.",
    description: [
      "Proteína Shaker es aislada de suero de leche (whey limpia), con aminoácidos esenciales y prebióticos. Cada scoop aporta 25 g de proteína, el apoyo que tu cuerpo necesita para recuperarse y mantener masa muscular.",
      "Se mezcla fácil en agua o leche vegetal. Sabor vainilla.",
    ],
    highlights: [
      "Proteína aislada de suero de leche (whey limpia)",
      "BCAAs: leucina, valina e isoleucina",
      "Con prebióticos, más amable con la digestión",
      "25 g de proteína por scoop",
    ],
    specs: [
      { label: "Presentación", value: "900 g · 29 porciones" },
      { label: "Proteína por scoop", value: "25 g" },
      { label: "Sabor", value: "Vainilla" },
      { label: "Modo de uso", value: "1 scoop en 250 ml de agua o leche vegetal" },
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
    spec: "Guaraná, maca, borojó y chontaduro · sin azúcar",
    tagline: "Energía natural para entrenar con todo.",
    description: [
      "Pre-entreno de frutos silvestres con guaraná, maca, borojó y chontaduro: ingredientes que la tradición colombiana usa para resistencia y vitalidad, en una fórmula sin azúcar.",
      "Tómalo entre 20 y 30 minutos antes de entrenar. Sabor a frutos rojos.",
    ],
    highlights: [
      "Con guaraná, maca, borojó y chontaduro",
      "0 azúcar",
      "Sabor frutos rojos",
      "Ideal 20–30 minutos antes de entrenar",
    ],
    specs: [
      { label: "Sabor", value: "Frutos rojos" },
      { label: "Azúcar", value: "0 g" },
      { label: "Modo de uso", value: "1 scoop en agua, 20–30 min antes de entrenar" },
    ],
    image: {
      src: "/images/productos/fishz.webp",
      alt: "Bote de Pre-Entreno FISHZ Be Like Lina sabor frutos rojos, rodeado de fresas, moras y maca",
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
    tagline: "Qué comer cada día, explicado sin complicaciones.",
    description: [
      "La Guía de Alimentación Saludable está diseñada para orientarte sobre qué alimentos elegir para una dieta equilibrada: mejorar tu nutrición, prevenir enfermedades y sostener tu bienestar.",
      "Incluye desayunos, almuerzos, snacks y cenas saludables, y viene con asesoría personalizada de Lina.",
    ],
    highlights: [
      "Desayunos, almuerzos, snacks y cenas",
      "Recetas prácticas para el día a día",
      "Asesoría personalizada incluida",
      "Formato digital: la recibes al comprar",
    ],
    specs: [
      { label: "Formato", value: "Digital (PDF)" },
      { label: "Incluye", value: "Asesoría personalizada" },
      { label: "Entrega", value: "Después de confirmar el pago" },
    ],
    image: {
      src: "/images/productos/guia.webp",
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
    tagline: "Un antioxidante potente para la piel, la energía y las defensas.",
    description: [
      "Santtina es un antioxidante potente con múltiples beneficios para la salud: piel y cabello, sistema cardiovascular, resistencia muscular, defensas, salud cerebral, gástrica y visual.",
      "Una cápsula al día, acompañada de una comida.",
    ],
    highlights: [
      "Salud de la piel y el cabello",
      "Salud cardiovascular y resistencia muscular",
      "Función inmune y salud cerebral",
      "Agudeza y salud ocular",
      "Ayuda a frenar el envejecimiento celular",
    ],
    specs: [
      { label: "Presentación", value: "60 cápsulas" },
      { label: "Modo de uso", value: "1 cápsula al día con una comida" },
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
      "Endulzante líquido de stevia: solo agua y hoja de stevia. Sin calorías, sin grasas y sin azúcares.",
      "Con 3 a 5 gotas endulzas una bebida. El frasco de 250 ml rinde cerca de 1.000 porciones. Apto para adultos y niños mayores de 4 años.",
    ],
    highlights: [
      "Ingredientes: agua y hoja de stevia",
      "0 calorías, 0 grasas, 0 azúcares",
      "Rinde ~1.000 porciones de 0,25 ml",
      "Apto para adultos y niños mayores de 4 años",
    ],
    specs: [
      { label: "Presentación", value: "250 ml" },
      { label: "Rendimiento", value: "~1.000 porciones de 0,25 ml" },
      { label: "Modo de uso", value: "3 a 5 gotas por bebida" },
    ],
    image: {
      src: "/images/productos/stevia.webp",
      alt: "Botella de Stevia Be Like Lina de 250 ml",
      width: 285,
      height: 901,
    },
    imageTone: "light",
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
    tagline: "El mismo endulzante natural, en tamaño para llevar.",
    description: [
      "Endulzante natural de 100 ml: solo agua y hoja de stevia. El formato pequeño cabe en el bolso y es perfecto para la oficina o los viajes.",
    ],
    highlights: [
      "Ingredientes: agua y hoja de stevia",
      "0 calorías, 0 grasas, 0 azúcares",
      "Formato de bolsillo",
    ],
    specs: [
      { label: "Presentación", value: "100 ml" },
      { label: "Modo de uso", value: "3 a 5 gotas por bebida" },
    ],
    image: {
      src: "/images/productos/stevia.webp",
      alt: "Botella de Stevia Be Like Lina de 100 ml",
      width: 285,
      height: 901,
    },
    imageTone: "light",
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
    tagline: "Batidos que además de ricos, cumplen una función.",
    description: [
      "Con este recetario sacas el máximo provecho en nutrientes, vitaminas y minerales. Cada batido está pensado para un objetivo concreto, con ingredientes naturales que consigues en cualquier mercado.",
    ],
    highlights: [
      "Batidos antioxidantes",
      "Batidos con aloe vera",
      "Batidos hidratantes",
      "Batidos detox",
      "Batidos desinflamatorios",
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
    description: "Contenido digital que recibes al comprar, con asesoría de Lina.",
    categories: ["digital"] as ProductCategory[],
  },
  {
    id: "endulzantes",
    title: "Endulzantes",
    description: "Stevia líquida sin calorías, en dos presentaciones.",
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
