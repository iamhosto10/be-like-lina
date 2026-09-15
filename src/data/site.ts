import type { NavItem, SocialLink } from "@/types";

const WHATSAPP_NUMBER = "573012156152";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Configuración del sitio. Todo lo que es "dato" y no "diseño" vive aquí:
 * textos de marca, navegación, contacto, redes, enlaces externos y flags.
 */
export const site = {
  name: "Be Like Lina",
  shortName: "BLL",
  tagline:
    "Entrenamientos inteligentes, nutrición real y mentalidad para transformar tu cuerpo y tu vida.",
  description:
    "Lina Fuentes, entrenadora integral para la mujer, certificada en nutrición y entrenamiento. Planes personalizados, suplementos y recetas desde Valledupar para toda Colombia.",
  url: "https://belikelina.com",
  locale: "es-CO",

  /** Título visible de cada sección del home, con o sin número según `showSectionNumbers`. */
  showSectionNumbers: true,

  /** URL del video del hero. Si es null, el botón "Ver video" no se renderiza. */
  heroVideoUrl: null as string | null,

  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: "+57 301 215 6152",
    email: "ventas@belikelina.com",
    city: "Valledupar, Cesar",
    country: "Colombia",
  },

  /** Menú principal. Los anclas apuntan a las secciones del home mientras no existan páginas internas. */
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Tienda", href: "/#tienda" },
    { label: "Recetas", href: "/#recetas" },
    { label: "Planes", href: "/#planes" },
    { label: "Blog", href: "/#blog" },
    {
      label: "Contáctame",
      href: `${WHATSAPP_BASE}?text=${encodeURIComponent("Hola Lina, quiero más información.")}`,
      external: true,
    },
  ] satisfies NavItem[],

  /** CTA principal del header y del hero. */
  cta: {
    label: "Empieza hoy",
    href: "/#planes",
  },

  socials: [
    { name: "Instagram", href: "https://www.instagram.com/be.like.lina/" },
    { name: "TikTok", href: "https://www.tiktok.com/@belikelina_" },
    { name: "Facebook", href: "https://web.facebook.com/profile.php?id=61571908780077" },
    { name: "WhatsApp", href: WHATSAPP_BASE },
  ] satisfies SocialLink[],

  /** Enlaces a la web actual (WordPress) mientras se migra. */
  external: {
    store: "https://belikelina.com/shop/",
    account: "https://belikelina.com/my-account/",
  },

  /** Páginas legales (hoy en el sitio actual). */
  legal: [
    {
      label: "Términos y condiciones",
      href: "https://belikelina.com/terminos-y-condiciones/",
      external: true,
    },
    {
      label: "Política de privacidad",
      href: "https://belikelina.com/privacy-policy/",
      external: true,
    },
    {
      label: "Pagos, envíos y devoluciones",
      href: "https://belikelina.com/refund_returns/",
      external: true,
    },
    {
      label: "Preguntas frecuentes",
      href: "https://belikelina.com/elements/accordions/",
      external: true,
    },
  ] satisfies NavItem[],

  footer: {
    quickLinksTitle: "Enlaces rápidos",
    legalTitle: "Legal",
    newsletterTitle: "Únete a la comunidad",
    newsletterText: "Recibe tips, recetas y ofertas exclusivas.",
    copyright: `© ${new Date().getFullYear()} Be Like Lina. Todos los derechos reservados.`,
  },
} as const;

export type SiteConfig = typeof site;
