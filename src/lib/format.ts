/**
 * Formatea pesos colombianos sin decimales y con punto de miles: 203000 → "$203.000".
 * (Intl con es-CO pone un espacio tras el símbolo; el mockup aprobado no lo lleva.)
 */
export function formatCOP(amount: number): string {
  return `$${amount.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
}

const longDate = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "long",
  timeZone: "America/Bogota",
});

/** "2026-10-14T15:00:00Z" → "14 de octubre de 2026". */
export function formatDate(iso: string): string {
  return longDate.format(new Date(iso));
}

/** Minutos de lectura (200 palabras por minuto), mínimo 1. */
export function readingMinutes(plainText: string): number {
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
