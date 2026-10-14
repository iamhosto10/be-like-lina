import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { PostArticle } from "@/components/blog/PostArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { postCategories } from "@/data/blog";
import { placeholderPosts } from "@/data/posts";
import { getPost, getPosts, getPostSlugs } from "@/lib/blog";
import { blogPostSchema } from "@/lib/schema";
import { shareImage } from "@/lib/legal";
import { urlFor } from "@/lib/sanityImage";

/** Hasta que Sanity tenga artículos publicados, las rutas de relleno muestran «próximamente». */
async function findPlaceholder(slug: string) {
  const hasRealPosts = (await getPostSlugs()).length > 0;
  return hasRealPosts ? undefined : placeholderPosts.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  const real = await getPostSlugs();
  return (real.length > 0 ? real : placeholderPosts).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    const placeholder = await findPlaceholder(slug);
    return placeholder
      ? { title: placeholder.title, robots: { index: false, follow: true } }
      : { title: "Artículo no encontrado" };
  }

  // Portada recortada a 1200×630 por el CDN de Sanity; si no hay, la imagen del sitio.
  const image = post.cover
    ? {
        url: urlFor(post.cover.image).width(1200).height(630).fit("crop").url(),
        width: 1200,
        height: 630,
        alt: post.cover.alt,
      }
    : shareImage;
  const description = post.excerpt ?? undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      authors: ["Lina Fuentes"],
      section: postCategories[post.category].label,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    const placeholder = await findPlaceholder(slug);
    if (!placeholder) notFound();
    return (
      <ComingSoon
        eyebrow={postCategories[placeholder.category].label}
        title={placeholder.title}
        backHref="/#blog"
        backLabel="Volver al blog"
      />
    );
  }

  // «Sigue leyendo»: primero los de la misma categoría, luego los más recientes.
  const others = (await getPosts(12)).filter((p) => p.slug !== post.slug);
  const more = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <PostArticle post={post} more={more} />
      <JsonLd data={blogPostSchema(post)} />
    </>
  );
}
