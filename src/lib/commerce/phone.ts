/**
 * Celular colombiano → número internacional sin «+» (para wa.me), o null si no parece válido.
 * Acepta «300 123 4567», «+57 300 123 4567», «57300…» y «(300) 123-4567».
 */
export function toWhatsappNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (/^3\d{9}$/.test(digits)) return `57${digits}`;
  if (/^573\d{9}$/.test(digits)) return digits;
  // Otro país: se acepta con indicativo explícito (8 a 15 dígitos).
  if (raw.trim().startsWith("+") && digits.length >= 8 && digits.length <= 15) return digits;
  return null;
}

export function whatsappLink(phone: string | null, message: string): string | null {
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null;
}
