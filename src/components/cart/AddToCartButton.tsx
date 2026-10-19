"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { preloadCartSheet } from "@/components/cart/CartButton";
import { useCart } from "@/components/cart/CartProvider";

/** «Agregar al carrito»: suma una unidad y abre el cajón. No se muestra si la tienda está apagada. */
export function AddToCartButton({ slug }: { slug: string }) {
  const { enabled, add, setOpen } = useCart();
  if (!enabled) return null;

  return (
    <Button
      size="xl"
      onPointerEnter={preloadCartSheet}
      onFocus={preloadCartSheet}
      onClick={() => {
        add(slug);
        setOpen(true);
      }}
    >
      <ShoppingBag aria-hidden />
      Agregar al carrito
    </Button>
  );
}
