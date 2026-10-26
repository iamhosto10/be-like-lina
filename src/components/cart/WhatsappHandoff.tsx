"use client";

import { useEffect, useState } from "react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

const SECONDS = 6;

/**
 * Pedido pagado → lleva a la persona a WhatsApp con el resumen ya escrito.
 * Cuenta regresiva visible (se puede cancelar) y solo una vez por pedido: si vuelve a esta página,
 * ya no la saca de nuevo; queda el botón.
 */
export function WhatsappHandoff({ url, orderId }: { url: string; orderId: string }) {
  const key = `bll-wa-${orderId}`;
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let done = false;
    try {
      done = localStorage.getItem(key) === "1";
    } catch {}
    if (done) return;
    const t = setTimeout(() => setLeft(SECONDS), 0);
    return () => clearTimeout(t);
  }, [key]);

  useEffect(() => {
    if (left === null) return;
    if (left <= 0) {
      try {
        localStorage.setItem(key, "1");
      } catch {}
      window.location.href = url;
      return;
    }
    const t = setTimeout(() => setLeft((n) => (n === null ? n : n - 1)), 1000);
    return () => clearTimeout(t);
  }, [left, url, key]);

  const remember = () => {
    try {
      localStorage.setItem(key, "1");
    } catch {}
  };

  return (
    <div className="mt-8 rounded-2xl border border-primary/40 bg-card p-5 text-center text-card-foreground shadow-sm md:p-6">
      <h2 className="text-xl font-bold">Un último paso: avísale a Lina</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Envíale el resumen de tu pedido por WhatsApp para que lo prepare cuanto antes. El mensaje ya
        está escrito; solo tienes que enviarlo.
      </p>
      <Button
        size="xl"
        className="mt-4 w-full"
        nativeButton={false}
        render={<a href={url} target="_blank" rel="noopener noreferrer" onClick={remember} />}
      >
        <SiWhatsapp aria-hidden />
        Enviar mi pedido a Lina por WhatsApp
      </Button>
      {left !== null && left > 0 && (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          Te llevamos a WhatsApp en {left} s ·{" "}
          <button
            type="button"
            className="underline underline-offset-2"
            onClick={() => {
              remember();
              setLeft(null);
            }}
          >
            cancelar
          </button>
        </p>
      )}
    </div>
  );
}
