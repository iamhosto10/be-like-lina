"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/CartProvider";
import { MAX_QUANTITY } from "@/data/shipping";
import { formatCOP } from "@/lib/format";
import { itemLabel } from "@/lib/commerce/pricing-label";

/** Cajón del carrito. Se carga bajo demanda (ver CartButton). */
export function CartSheet() {
  const cart = useCart();
  const close = () => cart.setOpen(false);

  return (
    <Sheet open={cart.open} onOpenChange={cart.setOpen}>
      <SheetContent
        side="right"
        data-tone="dark"
        className="flex w-full flex-col gap-0 bg-background p-0 text-foreground sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="text-xl font-bold">Tu carrito</SheetTitle>
          <SheetDescription className="sr-only">
            Productos que vas a comprar, cantidades y total.
          </SheetDescription>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-12 text-primary/60" strokeWidth={1.25} aria-hidden />
            <p className="text-lg font-semibold">Tu carrito está vacío</p>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/tienda" onClick={close} />}
            >
              Ver la tienda
            </Button>
          </div>
        ) : (
          <>
            <ul
              className="flex-1 divide-y divide-border overflow-y-auto px-6"
              aria-label="Productos del carrito"
            >
              {cart.items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-brand-deep">
                    {item.image && (
                      <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/tienda/${item.slug}`}
                      onClick={close}
                      className="line-clamp-2 rounded-sm text-sm leading-snug font-semibold outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {itemLabel(item)}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.digital ? "Digital · se envía por correo" : formatCOP(item.unitPrice)}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          aria-label={`Quitar una unidad de ${itemLabel(item)}`}
                          onClick={() => cart.setQuantity(item.slug, item.quantity - 1)}
                          className="inline-flex size-9 items-center justify-center rounded-l-lg outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          <Minus className="size-4" aria-hidden />
                        </button>
                        <span
                          className="min-w-8 text-center text-sm font-semibold tabular-nums"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Agregar una unidad de ${itemLabel(item)}`}
                          disabled={item.quantity >= MAX_QUANTITY}
                          onClick={() => cart.setQuantity(item.slug, item.quantity + 1)}
                          className="inline-flex size-9 items-center justify-center rounded-r-lg outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
                        >
                          <Plus className="size-4" aria-hidden />
                        </button>
                      </div>
                      <p className="text-sm font-bold tabular-nums">
                        {formatCOP(item.unitPrice * item.quantity)}
                      </p>
                      <button
                        type="button"
                        aria-label={`Eliminar ${itemLabel(item)} del carrito`}
                        onClick={() => cart.remove(item.slug)}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-border px-6 py-5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCOP(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className="tabular-nums">
                  {!cart.hasPhysical
                    ? "No aplica"
                    : cart.shipping > 0
                      ? formatCOP(cart.shipping)
                      : "Gratis"}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-lg font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatCOP(cart.total)}</span>
              </div>
              <Button
                size="xl"
                className="mt-3 w-full"
                nativeButton={false}
                render={<Link href="/checkout" onClick={close} />}
              >
                Finalizar compra
              </Button>
              {cart.demo && (
                <p className="pt-1 text-center text-xs text-muted-foreground">
                  Modo demostración: no se hace ningún cobro real.
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
