import type { Metadata } from "next";
import { Figtree, Great_Vibes } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site } from "@/data/site";
import { lina } from "@/data/lina";
import { isIndexable, siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/JsonLd";
import { linaSchema, organizationSchema, webSiteSchema } from "@/lib/schema";
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
  /* Base para todas las URLs relativas de abajo (OG, canonical, iconos). */
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: lina.name, url: siteUrl }],
  creator: lina.name,
  category: "health",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.name,
    url: "./",
    title: site.seo.title,
    description: site.description,
    images: [
      {
        url: lina.images.og.src,
        width: lina.images.og.width,
        height: lina.images.og.height,
        alt: lina.images.og.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.description,
    images: [lina.images.og.src],
  },
  /* Fuera del dominio definitivo (Vercel, pruebas) no se indexa. Ver lib/site-url.ts. */
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.locale} className={`${figtree.variable} ${greatVibes.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationSchema, linaSchema, webSiteSchema],
          }}
        />
      </body>
    </html>
  );
}
