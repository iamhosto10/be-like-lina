"use client";

import { useSyncExternalStore } from "react";

interface TokenSwatchProps {
  token: string;
  label: string;
}

const noopSubscribe = () => () => {};

/** Muestra el color y el valor real resuelto de una variable CSS. Solo para /design. */
export function TokenSwatch({ token, label }: TokenSwatchProps) {
  const value = useSyncExternalStore(
    noopSubscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(token).trim(),
    () => "",
  );

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="h-14" style={{ background: `var(${token})` }} />
      <div className="bg-card px-3 py-2">
        <p className="text-xs font-semibold text-card-foreground">{label}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{token}</p>
        <p className="font-mono text-[11px] text-muted-foreground uppercase">{value || "…"}</p>
      </div>
    </div>
  );
}
