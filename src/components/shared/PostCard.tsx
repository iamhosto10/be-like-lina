import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight, Brain, CupSoda, Dumbbell } from "lucide-react";
import { cn } from "cn";
import type { Post, PostCategory } from "@/types";

interface PostCardProps {
  post: Post;
  className?: string;
}

const categoryIcon: Record<PostCategory, typeof Apple> = {
  Nutrición: Apple,
  Entrenamiento: Dumbbell,
  Recetas: CupSoda,
  Mentalidad: Brain,
};

/** Tarjeta de artículo: imagen apaisada, categoría, título y «Leer más». Toda la tarjeta es enlace. */
export function PostCard({ post, className }: PostCardProps) {
  const Icon = categoryIcon[post.category];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-elevated">
        {post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 90vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-wine to-brand-elevated text-primary/45"
          >
            <Icon className="size-12" strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="text-[0.7rem] font-bold tracking-[0.15em] text-primary uppercase">
          {post.category}
        </p>
        <h3 className="text-base leading-snug font-bold">
          <Link
            href={post.href}
            className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary">
          Leer más
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </p>
      </div>
    </article>
  );
}
