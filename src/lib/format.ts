/**
 * Formatea pesos colombianos sin decimales y con punto de miles: 203000 → "$203.000".
 * (Intl con es-CO pone un espacio tras el símbolo; el mockup aprobado no lo lleva.)
 */
export function formatCOP(amount: number): string {
  return `$${amount.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
}
