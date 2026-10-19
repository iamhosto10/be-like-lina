/** Tipos del carrito y los pedidos. Sin dependencias: se usan en servidor y en navegador. */

export interface CartLine {
  slug: string;
  quantity: number;
}

/** Línea de un pedido, con el precio vigente al comprar (copiado del catálogo en el servidor). */
export interface OrderItem {
  slug: string;
  name: string;
  variant?: string;
  unitPrice: number;
  quantity: number;
  /** Guía o recetario: se entrega por correo, sin envío físico. */
  digital: boolean;
  image?: string;
}

export interface PricedCart {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  hasPhysical: boolean;
  hasDigital: boolean;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  /** Celular tal como lo escribió la persona (se normaliza al armar enlaces de WhatsApp). */
  phone: string;
  /** Cédula; opcional. Algunas transportadoras la piden para la guía. */
  document?: string;
}

export interface ShippingAddress {
  department: string;
  city: string;
  address: string;
  /** Barrio, apartamento, torre… */
  details?: string;
  notes?: string;
}

export type OrderStatus =
  | "pending" // creado, esperando el pago
  | "in_process" // el pago está en revisión
  | "approved" // pagado
  | "rejected"
  | "cancelled"
  | "refunded";

export interface PaymentInfo {
  id: string;
  status: string;
  statusDetail?: string;
  method?: string;
  amount: number;
}

export interface Order extends PricedCart {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  /** "demo": pago simulado, sin Mercado Pago. */
  mode: "mercadopago" | "demo";
  currency: "COP";
  customer: Customer;
  shippingAddress?: ShippingAddress;
  preferenceId?: string;
  payment?: PaymentInfo;
  /** Cuándo se enviaron los correos de confirmación (existe solo si ya se enviaron). */
  notifiedAt?: string;
}
