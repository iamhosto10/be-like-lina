import type { Metadata } from "next";

/* El checkout y sus resultados son privados: no se indexan ni se siguen. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return children;
}
