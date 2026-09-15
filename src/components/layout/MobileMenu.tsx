"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { site } from "@/data/site";

interface MobileMenuProps {
  activeHref: string;
}

export function MobileMenu({ activeHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Abrir menú"
            className="text-foreground hover:bg-foreground/10 lg:hidden"
          />
        }
      >
        <Menu className="size-6" aria-hidden />
      </SheetTrigger>

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
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
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
            render={<Link href={site.cta.href} onClick={() => setOpen(false)} />}
          >
            {site.cta.label}
          </Button>
          <SocialLinks className="justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
