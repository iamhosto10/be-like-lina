import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { site } from "@/data/site";
import type { NavItem } from "@/types";

function FooterLink({ item }: { item: NavItem }) {
  const className =
    "text-muted-foreground hover:text-primary inline-block rounded-sm py-1 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50";
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold tracking-widest text-foreground uppercase">{title}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  /** Enlaces rápidos = el menú sin "Inicio". */
  const quickLinks = site.nav.filter((item) => item.href !== "/");

  return (
    <footer data-tone="deep" className="border-t border-border bg-background text-foreground">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12">
          {/* Marca */}
          <div className="space-y-5">
            <Logo size="lg" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
            <SocialLinks />
          </div>

          <FooterColumn title={site.footer.quickLinksTitle}>
            <ul className="space-y-1 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={site.footer.legalTitle}>
            <ul className="space-y-1 text-sm">
              {site.legal.map((item) => (
                <li key={item.href}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={site.footer.newsletterTitle}>
            <p className="mb-4 text-sm text-muted-foreground">{site.footer.newsletterText}</p>
            <NewsletterForm source="footer" />
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">{site.footer.copyright}</p>
          <p className="text-muted-foreground">
            {site.contact.city}, {site.contact.country} ·{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-sm transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
