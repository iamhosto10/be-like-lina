import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryLabels, getProduct, getRelatedProducts, products } from "@/data/products";
import { store } from "@/data/store";
import { formatCOP } from "@/lib/format";
import { externalProductUrl, whatsappUrl } from "@/lib/links";
import { productPageSchema } from "@/lib/schema";

/* Las 8 fichas se generan en el build: HTML estático, sin servidor por medio. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tienda/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = product.variant ? `${product.name} ${product.variant}` : product.name;
  const description = `${product.tagline} ${formatCOP(product.price)} COP. ${store.purchaseNote}`;

  return {
    title,
    description,
    alternates: { canonical: `/tienda/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/tienda/${product.slug}`,
      ...(product.image && {
        images: [{ url: product.image.src, alt: product.image.alt }],
      }),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/tienda/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const fullName = product.variant ? `${product.name} · ${product.variant}` : product.name;
  const related = getRelatedProducts(product.slug);
  const darkPhoto = product.imageTone === "dark";

  return (
    <>
      <Section tone="dark" className="pt-28 pb-14 md:pt-36 md:pb-20">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Tienda", href: "/tienda" },
            { label: fullName },
          ]}
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {product.image && (
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl border border-border",
                darkPhoto ? "bg-brand-deep" : "bg-brand-ice",
              )}
            >
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                sizes="(min-width: 768px) 46vw, 100vw"
                quality={85}
                loading="eager"
                fetchPriority="high"
                className={cn(
                  "absolute inset-0 size-full",
                  darkPhoto ? "object-cover" : "object-contain p-8",
                )}
              />
            </div>
          )}

          <div className="flex flex-col">
            <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
              {categoryLabels[product.category]}
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl">
              {product.name}
              {product.variant && (
                <span className="block text-2xl font-semibold text-muted-foreground md:text-3xl">
                  {product.variant}
                </span>
              )}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">{product.tagline}</p>

            <p className="mt-6 text-3xl font-extrabold tracking-tight tabular-nums md:text-4xl">
              {formatCOP(product.price)}
            </p>

            <ul className="mt-6 space-y-2 text-sm md:text-base">
              {product.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="xl"
                nativeButton={false}
                render={
                  <a
                    href={externalProductUrl(product.externalSlug)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ShoppingBag aria-hidden />
                Comprar ahora
              </Button>
              <Button
                size="xl"
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={whatsappUrl(
                      `Hola Lina, quiero información sobre ${fullName} (${formatCOP(product.price)}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="border-primary text-primary hover:bg-primary/10"
              >
                <SiWhatsapp aria-hidden />
                Preguntar por WhatsApp
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{store.purchaseNote}</p>
            <p className="mt-1 text-xs text-muted-foreground">{store.checkoutNote}</p>
          </div>
        </div>
      </Section>

      <Section tone="light" className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-xl font-bold tracking-tight uppercase md:text-2xl">Descripción</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight uppercase md:text-2xl">Ficha</h2>
            <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-3 text-sm">
                  <dt className="font-semibold">{spec.label}</dt>
                  <dd className="ml-auto text-right text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-muted-foreground">{store.disclaimer}</p>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="wine" aria-labelledby="relacionados" className="py-14 md:py-20">
          <h2
            id="relacionados"
            className="mb-7 text-xl font-bold tracking-tight uppercase md:text-2xl"
          >
            También te puede servir
          </h2>
          <ProductGrid products={related} label="Otros productos" />
          <div className="mt-10">
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/tienda" />}
            >
              <ArrowLeft aria-hidden />
              Ver toda la tienda
            </Button>
          </div>
        </Section>
      )}

      <JsonLd data={productPageSchema(product)} />
    </>
  );
}
