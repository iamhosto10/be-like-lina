"use client";

import Link from "next/link";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { site } from "@/data/site";

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeHref: string;
}

/**
 * Panel del menú móvil. Se carga bajo demanda (next/dynamic) la primera vez
 * que se abre, para no enviar Base UI Dialog en el JS inicial de la página.
 */
export function MobileMenuSheet({ open, onOpenChange, activeHref }: MobileMenuSheetProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        data-tone="dark"
        className="flex w-full flex-col gap-0 bg-background p-0 text-foreground sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">Navegación principal del sitio</SheetDescription>
          <Logo size="sm" />
        </SheetHeader>

        <nav aria-label="Principal" className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => {
              const isActive = item.href === activeHref;
              const linkClass = cn(
                "block rounded-lg px-3 py-3 font-heading text-2xl font-bold tracking-tight transition-colors",
                "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive ? "text-primary" : "text-foreground hover:text-primary",
              );
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      onClick={close}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-current={isActive ? "page" : undefined}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 border-t border-border px-6 py-6">
          <Button
            size="xl"
            className="w-full"
            nativeButton={false}
            render={<Link href={site.cta.href} onClick={close} />}
          >
            {site.cta.label}
          </Button>
          <SocialLinks className="justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
