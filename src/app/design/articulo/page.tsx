import { notFound } from "next/navigation";
import { PostArticle } from "@/components/blog/PostArticle";
import { placeholderPosts } from "@/data/posts";
import type { PostDetail } from "@/types";

/**
 * Vista previa de la plantilla de artículo con contenido de ejemplo, para ajustar el diseño
 * sin depender de Sanity. Solo existe en desarrollo (en producción devuelve 404).
 */
const block = (style: string, text: string, extra: Record<string, unknown> = {}) => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: "s", text, marks: [] }],
  ...extra,
});

const sample: PostDetail = {
  slug: "ejemplo",
  title: "Batido post-entreno para recuperar y crecer",
  category: "recetas",
  excerpt:
    "Una receta de 5 minutos con proteína, fruta y avena para recuperar después de entrenar, sin azúcares añadidos.",
  publishedAt: "2026-10-14T15:00:00.000Z",
  updatedAt: "2026-10-14T15:00:00.000Z",
  cover: null,
  relatedProductSlugs: ["proteina-shaker-chocolate", "stevia-250"],
  cta: { title: "¿Quieres tu plan nutricional?", buttonLabel: "Quiero mi plan", message: null },
  body: [
    block(
      "normal",
      "Después de entrenar, tu cuerpo necesita proteína y carbohidratos para recuperarse. Este batido los aporta en un vaso, en menos de cinco minutos.",
    ),
    block("h2", "Ingredientes"),
    block("normal", "Para una porción necesitas:"),
    block("normal", "1 scoop de proteína", { listItem: "bullet", level: 1 }),
    block("normal", "1 banano maduro", { listItem: "bullet", level: 1 }),
    block("normal", "3 cucharadas de avena", { listItem: "bullet", level: 1 }),
    block("normal", "250 ml de leche vegetal", { listItem: "bullet", level: 1 }),
    block("h2", "Preparación"),
    block("normal", "Licúa todo por 30 segundos", { listItem: "number", level: 1 }),
    block("normal", "Prueba y ajusta el dulzor con unas gotas de stevia", {
      listItem: "number",
      level: 1,
    }),
    block("normal", "Sírvelo frío y tómalo en los 30 minutos siguientes a tu entrenamiento", {
      listItem: "number",
      level: 1,
    }),
    block("h3", "Un consejo de Lina"),
    block(
      "blockquote",
      "La constancia importa más que la perfección: un buen batido hoy vale más que una dieta perfecta que abandonas el viernes.",
    ),
    {
      _type: "block",
      _key: "l1",
      style: "normal",
      markDefs: [{ _key: "a", _type: "link", href: "/tienda/proteina-shaker-chocolate" }],
      children: [
        { _type: "span", _key: "a1", text: "Si quieres la proteína que usa Lina, ", marks: [] },
        { _type: "span", _key: "a2", text: "mírala aquí", marks: ["a", "strong"] },
        { _type: "span", _key: "a3", text: ".", marks: [] },
      ],
    },
  ] as PostDetail["body"],
};

export default function ArticlePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <PostArticle post={sample} more={placeholderPosts.slice(0, 3)} />;
}
