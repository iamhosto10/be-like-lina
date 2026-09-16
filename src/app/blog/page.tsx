import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Consejos, recetas y motivación para tu transformación"
      backHref="/#blog"
      backLabel="Volver al inicio"
    />
  );
}
