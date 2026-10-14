import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Section } from "@/components/shared/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PostCard } from "@/components/shared/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogMeta } from "@/data/blog";
import { site } from "@/data/site";
import { getPosts } from "@/lib/blog";
import { shareImage } from "@/lib/legal";
import { legalPageSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const hasPosts = (await getPosts(1)).length > 0;
  return {
    title: blogMeta.title,
    description: blogMeta.description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${blogMeta.title} · ${site.name}`,
      description: blogMeta.description,
      url: "/blog",
      images: [shareImage],
    },
    // Sin artículos publicados la página es un «próximamente»: no se indexa.
    robots: hasPosts ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function BlogPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <ComingSoon
        eyebrow="Blog"
        title="Consejos, recetas y motivación para tu transformación"
        backHref="/#blog"
        backLabel="Volver al inicio"
      />
    );
  }

  return (
    <>
      <Section tone="dark" className="pt-28 pb-10 md:pt-36 md:pb-14">
        <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: blogMeta.title }]} />
        <h1 className="mt-5 text-3xl md:text-5xl">{blogMeta.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{blogMeta.intro}</p>
      </Section>

      <Section tone="wine" className="py-12 md:py-16" aria-label="Artículos">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} className="h-full" />
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        data={legalPageSchema({
          title: blogMeta.title,
          description: blogMeta.description,
          path: "/blog",
        })}
      />
    </>
  );
}
