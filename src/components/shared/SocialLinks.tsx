import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { cn } from "cn";
import { site } from "@/data/site";
import type { SocialLink } from "@/types";

const icons: Record<SocialLink["name"], typeof SiInstagram> = {
  Instagram: SiInstagram,
  TikTok: SiTiktok,
  Facebook: SiFacebook,
  WhatsApp: SiWhatsapp,
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

/** Iconos de redes sociales del sitio, en el orden de `site.socials`. */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {site.socials.map(({ name, href }) => {
        const Icon = icons[name];
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary",
                "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                iconClassName,
              )}
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
