/**
 * Reglas de envío del checkout. Es el único lugar donde se cambian.
 *
 * PENDIENTE DE CONFIRMAR CON LINA: la tarifa de $15.000 es un valor provisional.
 * Los productos digitales (guía y recetario) nunca pagan envío ni piden dirección.
 */
export const shipping = {
  /** Tarifa fija por pedido con productos físicos, en COP. */
  flatRate: 15000,
  /** Envío gratis desde este subtotal de productos físicos y digitales (COP). `null` = nunca es gratis. */
  freeOver: null as number | null,
  /** Texto bajo el costo de envío en el checkout. */
  note: "Despachamos a toda Colombia. Los pedidos confirmados antes de las 2 p.m. salen el mismo día hábil.",
} as const;

/** Máximo de unidades por producto en un pedido (evita errores de digitación). */
export const MAX_QUANTITY = 10;

export const departments = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bogotá D.C.",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
] as const;
