"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

/* El panel (Base UI Dialog) solo se descarga la primera vez que se abre. */
const MobileMenuSheet = dynamic(
  () => import("@/components/layout/MobileMenuSheet").then((m) => m.MobileMenuSheet),
  { ssr: false },
);

interface MobileMenuProps {
  activeHref: string;
}

export function MobileMenu({ activeHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Abrir menú"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="size-11 text-foreground hover:bg-foreground/10 lg:hidden"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        <Menu className="size-6" aria-hidden />
      </Button>
      {loaded && <MobileMenuSheet open={open} onOpenChange={setOpen} activeHref={activeHref} />}
    </>
  );
}
