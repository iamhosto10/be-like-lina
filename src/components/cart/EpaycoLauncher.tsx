"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export interface EpaycoLauncherProps {
  scriptUrl: string;
  publicKey: string;
  test: boolean;
  /** Datos de la transacción, ya preparados en el servidor. */
  data: Record<string, string | number | boolean>;
}

interface EpaycoWindow extends Window {
  ePayco?: {
    checkout: {
      configure: (o: { key: string; test: boolean }) => {
        open: (d: Record<string, string | number | boolean>) => void;
      };
    };
  };
}

/** Carga el script de ePayco y abre su ventana de pago; con un botón de respaldo por si se cierra. */
export function EpaycoLauncher({ scriptUrl, publicKey, test, data }: EpaycoLauncherProps) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const opened = useRef(false);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
    if ((window as EpaycoWindow).ePayco) {
      const t = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(t);
    }
    const script = existing ?? document.createElement("script");
    const onLoad = () => setReady(true);
    const onError = () => setFailed(true);
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existing) {
      script.src = scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, [scriptUrl]);

  const open = useCallback(() => {
    const ePayco = (window as EpaycoWindow).ePayco;
    if (!ePayco) return;
    ePayco.checkout.configure({ key: publicKey, test }).open(data);
  }, [publicKey, test, data]);

  // Se abre sola una vez; si la persona la cierra, queda el botón.
  useEffect(() => {
    if (ready && !opened.current) {
      opened.current = true;
      open();
    }
  }, [ready, open]);

  return (
    <div className="text-center">
      <Button size="xl" className="w-full" onClick={open} disabled={!ready}>
        {ready ? "Pagar con ePayco" : "Cargando el pago seguro…"}
      </Button>
      {failed && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          No pudimos cargar la ventana de pago. Revisa tu conexión (o desactiva el bloqueador de
          anuncios) y recarga la página.
        </p>
      )}
    </div>
  );
}
