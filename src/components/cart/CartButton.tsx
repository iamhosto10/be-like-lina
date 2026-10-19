"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";

/* El cajón (Base UI Dialog) solo se descarga cuando hace falta. */
const loadCartSheet = () => import("@/components/cart/CartSheet").then((m) => m.CartSheet);
const CartSheet = dynamic(loadCartSheet, { ssr: false });

/** Descarga el cajón antes de que se abra (al pasar el cursor o enfocar el botón) para que aparezca al instante. */
export const preloadCartSheet = () => void loadCartSheet();

export function CartButton() {
  const { enabled, count, hydrated, open, setOpen } = useCart();
  const [loaded, setLoaded] = useState(false);
  if (open && !loaded) setLoaded(true); // también se abre desde «Agregar al carrito»
  if (!enabled) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label={count > 0 ? `Abrir carrito, ${count} productos` : "Abrir carrito"}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="relative size-11 text-foreground hover:bg-foreground/10"
        onClick={() => setOpen(true)}
        onPointerEnter={preloadCartSheet}
        onFocus={preloadCartSheet}
      >
        <ShoppingBag className="size-6" aria-hidden />
        {hydrated && count > 0 && (
          <span
            aria-hidden
            className="absolute top-0.5 right-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.7rem] leading-5 font-bold text-primary-foreground tabular-nums"
          >
            {count}
          </span>
        )}
      </Button>
      {loaded && <CartSheet />}
    </>
  );
}
