/** Enlace de navegación. `external` abre en pestaña nueva. */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  name: "Instagram" | "TikTok" | "Facebook" | "WhatsApp";
  href: string;
}
