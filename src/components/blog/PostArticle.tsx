import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { toPlainText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { PostCard } from "@/components/shared/PostCard";
import { PostBody } from "@/components/blog/PostBody";
import { SanityImage } from "@/components/blog/SanityImage";
import { postCategories } from "@/data/blog";
import { lina } from "@/data/lina";
import { getProduct } from "@/data/products";
import { formatDate, readingMinutes } from "@/lib/format";
import { whatsappUrl } from "@/lib/links";
import type { PostDetail, PostSummary } from "@/types";

interface PostArticleProps {
  post: PostDetail;
  /** Otros artículos para «Sigue leyendo» (máx. 3). */
  more: PostSummary[];
}

/**
 * Plantilla única de todos los artículos: lo que cambia entre uno y otro es el contenido que
 * viene de Sanity (portada, texto, productos relacionados, CTA), no el diseño.
 */
export function PostArticle({ post, more }: PostArticleProps) {
  const category = postCategories[post.category];
  const minutes = readingMinutes(toPlainText(post.body));
  const products = post.relatedProductSlugs.flatMap((slug) => getProduct(slug) ?? []);

  const cta = {
    title: post.cta?.title || "¿Quieres llevar esto a tu rutina?",
    buttonLabel: post.cta?.buttonLabel || "Escribirle a Lina",
    message:
      post.cta?.message || `Hola Lina, leí el artículo «${post.title}» y quiero más información.`,
  };

  return (
    <>
      <Section tone="dark" className="pt-28 pb-10 md:pt-36 md:pb-14">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <div className="mt-6 max-w-3xl">
          <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
            {category.label}
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>}

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2.5">
              <Image
                src={lina.images.avatar.src}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <span className="font-semibold text-foreground">{lina.name}</span>
            </span>
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {minutes} min de lectura
            </span>
          </div>
        </div>
      </Section>

      <Section tone="light" className="py-10 md:py-16">
        {post.cover && (
          <div className="relative mx-auto mb-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-brand-ice md:mb-14">
            <SanityImage
              image={post.cover.image}
              alt={post.cover.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <article className="mx-auto max-w-3xl">
          <PostBody value={post.body} />
        </article>
      </Section>

      {products.length > 0 && (
        <Section tone="wine" aria-labelledby="productos-relacionados" className="py-14 md:py-20">
          <h2
            id="productos-relacionados"
            className="mb-7 text-xl font-bold tracking-tight uppercase md:text-2xl"
          >
            Productos que te pueden servir
          </h2>
          <ProductGrid products={products} label="Productos relacionados" />
        </Section>
      )}

      <Section tone="plum" aria-labelledby="articulo-cta" className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="articulo-cta" className="text-2xl font-bold tracking-tight md:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Escríbele a Lina y recibe orientación personalizada por WhatsApp.
          </p>
          <Button
            size="xl"
            className="mt-7"
            nativeButton={false}
            render={<a href={whatsappUrl(cta.message)} target="_blank" rel="noopener noreferrer" />}
          >
            <SiWhatsapp aria-hidden />
            {cta.buttonLabel}
          </Button>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="dark" aria-labelledby="sigue-leyendo" className="py-14 md:py-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <h2
              id="sigue-leyendo"
              className="text-xl font-bold tracking-tight uppercase md:text-2xl"
            >
              Sigue leyendo
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Todos los artículos
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Otros artículos">
            {more.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} className="h-full" />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
