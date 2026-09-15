import type { Metadata } from "next";
import { Figtree, Great_Vibes } from "next/font/google";
import "./globals.css";

/* Fuente principal de todo el sitio (variable, self-hosted por next/font, sin CLS) */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

/* Solo para la firma decorativa "Be Like Lina" del hero */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Be Like Lina",
  description:
    "Entrenamientos inteligentes, nutrición real y mentalidad para transformar tu cuerpo y tu vida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${figtree.variable} ${greatVibes.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
