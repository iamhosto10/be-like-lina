import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { whatsappUrl } from "@/lib/links";

/** Botón flotante de WhatsApp, siempre visible abajo a la derecha. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl("Hola Lina, vengo de la web y quiero más información.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg shadow-black/30 transition-transform outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 md:right-6 md:bottom-6"
    >
      <SiWhatsapp className="size-7" aria-hidden />
    </a>
  );
}
