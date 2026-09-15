"use client";

import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface VideoDialogProps {
  /** URL embebible (YouTube "embed", Vimeo "player" o un .mp4). */
  url: string;
  label: string;
}

const isFile = (url: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(url);

/** Botón "Ver video" del hero: abre el video en un diálogo accesible. */
export function VideoDialog({ url, label }: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="group inline-flex items-center gap-3 rounded-full font-semibold text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <span className="inline-flex size-11 items-center justify-center rounded-full border border-foreground/50 transition-colors group-hover:border-primary group-hover:text-primary">
          <Play className="ml-0.5 size-4 fill-current" aria-hidden />
        </span>
        {label}
      </DialogTrigger>
      <DialogContent
        data-tone="dark"
        className="max-w-4xl overflow-hidden border-none bg-background p-0 sm:max-w-4xl"
        showCloseButton
      >
        <DialogTitle className="sr-only">Video de presentación</DialogTitle>
        <DialogDescription className="sr-only">
          Lina Fuentes presenta Be Like Lina.
        </DialogDescription>
        <div className="aspect-video w-full bg-black">
          {isFile(url) ? (
            <video src={url} controls autoPlay playsInline className="size-full" />
          ) : (
            <iframe
              src={url}
              title="Video de presentación"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
