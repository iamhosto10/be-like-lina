"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { site } from "@/data/site";

/** Ids de sección a los que apunta el menú (de "/#tienda" → "tienda"). */
const sectionIds = site.nav
  .map((item) => item.href)
  .filter((href) => href.startsWith("/#"))
  .map((href) => href.slice(2));

/** Enlace activo: por ruta, o por sección visible en el home (scroll-spy). */
function useActiveHref(): string {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSection(visible[0]?.target.id ?? null);
      },
      // La sección cuenta como activa cuando su parte superior cruza el 40% del viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/") return activeSection ? `/#${activeSection}` : "/";
  return pathname;
}

/** Fondo sólido cuando la página deja de estar en el borde superior. */
function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function Header() {
  const activeHref = useActiveHref();
  const scrolled = useScrolled();

  return (
    <header
      data-tone="dark"
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-foreground transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => {
              const isActive = item.href === activeHref;
              const linkClass = cn(
                "relative py-2 text-[0.9375rem] font-medium transition-colors",
                "rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-primary after:transition-transform",
                isActive
                  ? "text-foreground after:scale-x-100"
                  : "text-foreground/85 after:scale-x-0 hover:text-primary",
              );
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            size="lg"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href={site.cta.href} />}
          >
            {site.cta.label}
          </Button>
          <a
            href={site.external.account}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mi cuenta"
            className={cn(
              "hidden size-10 items-center justify-center rounded-full border border-foreground/40 text-foreground transition-colors hover:border-primary hover:text-primary sm:inline-flex",
              "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            )}
          >
            <UserRound className="size-5" aria-hidden />
          </a>
          <MobileMenu activeHref={activeHref} />
        </div>
      </div>
    </header>
  );
}
