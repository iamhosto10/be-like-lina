"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MAX_QUANTITY } from "@/data/shipping";
import { computeTotals } from "@/lib/commerce/totals";
import type { CartLine, OrderItem, PricedCart } from "@/lib/commerce/types";

/** Lo mínimo de cada producto que necesita el carrito (el servidor lo arma desde el catálogo). */
export interface CatalogItem {
  slug: string;
  name: string;
  variant?: string;
  price: number;
  image?: string;
  digital: boolean;
}

interface CartContextValue extends PricedCart {
  lines: CartLine[];
  count: number;
  /** false en el servidor y en el primer render del navegador (el carrito vive en localStorage). */
  hydrated: boolean;
  /** Tienda activa (ePayco o modo demostración). Si es false no se muestra carrito. */
  enabled: boolean;
  demo: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ── Almacenamiento (localStorage con respaldo en memoria) ─────────────────────────────────── */
const STORAGE_KEY = "bll-cart-v1";
const listeners = new Set<() => void>();
let memoryRaw = "[]";

function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return memoryRaw; // modo privado o almacenamiento bloqueado
  }
}

function writeLines(lines: CartLine[]) {
  const raw = JSON.stringify(lines);
  memoryRaw = raw;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* se queda en memoria */
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && notify();
  window.addEventListener("storage", onStorage); // otra pestaña modificó el carrito
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

function parseLines(raw: string): CartLine[] {
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((l) =>
      l && typeof l.slug === "string" && Number.isInteger(l.quantity) && l.quantity > 0
        ? [{ slug: l.slug, quantity: Math.min(l.quantity, MAX_QUANTITY) }]
        : [],
    );
  } catch {
    return [];
  }
}

const noopSubscribe = () => () => {};

/* ── Proveedor ─────────────────────────────────────────────────────────────────────────────── */
interface CartProviderProps {
  catalog: Record<string, CatalogItem>;
  enabled: boolean;
  demo: boolean;
  children: ReactNode;
}

export function CartProvider({ catalog, enabled, demo, children }: CartProviderProps) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);

  // Se descartan los productos que ya no existen en el catálogo.
  const lines = useMemo(() => parseLines(raw).filter((l) => catalog[l.slug]), [raw, catalog]);

  const items = useMemo<OrderItem[]>(
    () =>
      lines.map((l) => {
        const p = catalog[l.slug];
        return {
          slug: p.slug,
          name: p.name,
          variant: p.variant,
          unitPrice: p.price,
          quantity: l.quantity,
          digital: p.digital,
          image: p.image,
        };
      }),
    [lines, catalog],
  );
  const totals = useMemo(() => computeTotals(items), [items]);

  const add = useCallback(
    (slug: string, quantity = 1) => {
      if (!catalog[slug]) return;
      const current = parseLines(readRaw());
      const found = current.find((l) => l.slug === slug);
      writeLines(
        found
          ? current.map((l) =>
              l.slug === slug
                ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QUANTITY) }
                : l,
            )
          : [...current, { slug, quantity: Math.min(quantity, MAX_QUANTITY) }],
      );
    },
    [catalog],
  );

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const current = parseLines(readRaw());
    writeLines(
      quantity < 1
        ? current.filter((l) => l.slug !== slug)
        : current.map((l) =>
            l.slug === slug ? { ...l, quantity: Math.min(quantity, MAX_QUANTITY) } : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    writeLines(parseLines(readRaw()).filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => writeLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...totals,
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      hydrated,
      enabled,
      demo,
      open,
      setOpen,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [totals, lines, hydrated, enabled, demo, open, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return ctx;
}
