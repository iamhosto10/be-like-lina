"use client";

import { useActionState } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter, type NewsletterState } from "@/actions/newsletter";

interface NewsletterFormProps {
  /** Identificador del origen para segmentar (p. ej. "footer", "recetas"). */
  source: string;
  buttonLabel?: string;
  /** "inline" = campo y botón en fila (footer). "stacked" = apilados (bloques grandes). */
  layout?: "inline" | "stacked";
  size?: "default" | "lg";
  className?: string;
}

const initialState: NewsletterState = { status: "idle" };

export function NewsletterForm({
  source,
  buttonLabel = "Suscribirme",
  layout = "inline",
  size = "default",
  className,
}: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);
  const inputId = `newsletter-${source}`;
  const messageId = `${inputId}-message`;

  if (state.status === "success") {
    return (
      <p role="status" className={cn("text-sm font-medium", className)}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("w-full", className)} noValidate>
      <input type="hidden" name="source" value={source} />
      <div className={cn("flex gap-2", layout === "stacked" ? "flex-col" : "flex-col sm:flex-row")}>
        <label htmlFor={inputId} className="sr-only">
          Correo electrónico
        </label>
        <Input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Tu correo electrónico"
          required
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? messageId : undefined}
          className={cn("bg-background/60", size === "lg" && "h-12 px-4 text-base md:text-base")}
        />
        <Button type="submit" size={size} disabled={pending} className="shrink-0">
          {pending ? "Enviando…" : buttonLabel}
        </Button>
      </div>
      {state.status === "error" && (
        <p id={messageId} role="alert" className="mt-2 text-sm text-destructive">
          {state.message}
        </p>
      )}
    </form>
  );
}
