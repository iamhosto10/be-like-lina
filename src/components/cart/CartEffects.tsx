"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

/** Vacía el carrito cuando el pedido ya se creó y se pagó (o está en revisión). */
export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}

/**
 * ePayco puede devolver a la persona antes de avisar al sitio del pago. Mientras el pedido
 * esté «en proceso», se vuelve a consultar cada 5 segundos (máximo 1 minuto).
 */
export function AutoRefresh({ active }: { active: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!active) return;
    let runs = 0;
    const timer = setInterval(() => {
      router.refresh();
      if (++runs >= 12) clearInterval(timer);
    }, 5000);
    return () => clearInterval(timer);
  }, [active, router]);
  return null;
}
