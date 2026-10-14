import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PostCard } from "@/components/shared/PostCard";
import { placeholderPosts } from "@/data/posts";
import { getPosts } from "@/lib/blog";

export async function BlogSection() {
  // Los 4 más recientes de Sanity; si aún no hay contenido, los títulos de relleno.
  const published = await getPosts(4);
  const posts = published.length > 0 ? published : placeholderPosts;

  return (
    <Section tone="dark" id="blog" aria-labelledby="blog-titulo">
      <SectionHeader
        number={4}
        title="Blog"
        subtitle="Consejos, recetas y motivación para tu transformación."
        titleId="blog-titulo"
        action={{ label: "Ver todos los artículos", href: "/blog" }}
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Artículos recientes">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} className="h-full" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
