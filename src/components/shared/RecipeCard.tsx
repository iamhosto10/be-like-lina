import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CupSoda, Salad } from "lucide-react";
import { cn } from "cn";
import type { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const kindIcon = { comida: Salad, batido: CupSoda } as const;
const kindLabel = {
  comida: "Receta de comida saludable",
  batido: "Receta de batido saludable",
} as const;

/** Tarjeta horizontal: imagen cuadrada a la izquierda, título y enlace a la derecha. */
export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const Icon = kindIcon[recipe.kind];

  return (
    <article
      className={cn(
        "group grid grid-cols-[42%_1fr] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="relative aspect-square bg-brand-elevated">
        {recipe.image ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt}
            width={recipe.image.width}
            height={recipe.image.height}
            sizes="(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 40vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-primary/50"
          >
            <Icon className="size-10" strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-3 p-4 md:p-5">
        <p className="text-xs text-muted-foreground">{kindLabel[recipe.kind]}</p>
        <h3 className="text-base leading-snug font-semibold">{recipe.title}</h3>
        <Link
          href={recipe.href}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`Ver receta: ${recipe.title}`}
        >
          Ver receta
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
