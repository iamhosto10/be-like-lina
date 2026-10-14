# Be Like Lina — sitio web

Sitio de **Be Like Lina**, marca de Lina Fuentes (entrenadora integral para la mujer, Valledupar, Colombia): planes de coaching, suplementos y recetas.

Construido con **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · **shadcn/ui**.

## Empezar

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script                      | Qué hace                                                    |
| --------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                  | Servidor de desarrollo                                      |
| `pnpm build` · `pnpm start` | Build y servidor de producción                              |
| `pnpm check`                | `lint` + `typecheck` + `format:check`, todo en uno          |
| `pnpm format`               | Prettier sobre todo el proyecto                             |
| `pnpm images`               | Optimiza las imágenes fuente a `public/images/` (ver abajo) |
| `pnpm og`                   | Regenera la imagen para compartir (favicon sobre el fondo)  |
| `pnpm studio:sync`          | Copia los productos de la tienda al Studio de Sanity        |

## Cómo cambiar los colores

Todos los colores del sitio salen de **un solo archivo**: [`src/app/globals.css`](src/app/globals.css).

Tiene tres niveles y **solo se edita el primero**:

```
1 · PALETA DE MARCA        --brand-pink: #ff93ce · --brand-night: #150915  ← aquí se cambian los colores
2 · TOKENS SEMÁNTICOS      --primary: var(--brand-pink)   (por tono; no se tocan)
3 · EXPOSICIÓN A TAILWIND  --color-primary: var(--primary) (genera bg-primary, etc.)
```

Cambia `--brand-pink` y se actualizan botones, enlaces, iconos, halos y la palabra destacada del hero en todo el sitio.

### Tonos por sección

Cada sección declara su tono con `<Section tone="dark | wine | light | plum | deep">`. Ese atributo activa un juego completo de tokens, así que el mismo `<Button>` sale rosa sobre oscuro y ciruela sobre claro sin ninguna clase de color propia.

En desarrollo, `/design` muestra la paleta, la tipografía y cada tono con los componentes reales (en producción devuelve 404).

## Estructura

```
src/
├── app/            layout, inicio, /tienda y /tienda/[slug], globals.css, robots, sitemap, llms.txt
├── components/
│   ├── ui/         shadcn/ui (generados)
│   ├── layout/     Header, MobileMenu, Footer, WhatsAppButton
│   ├── sections/   Hero, StoreSection, RecipesSection, PlansSection, BlogSection
│   ├── seo/        JsonLd
│   └── shared/     Section, SectionHeader, tarjetas, NewsletterForm, Logo…
├── data/           site.ts (config), products, plans, recipes (sección de recetas), posts, hero, lina
├── actions/        Server Actions (newsletter)
├── lib/            formatCOP, enlaces de WhatsApp, URL base, JSON-LD
└── types/
```

Todo lo que es **dato** (textos, precios, enlaces, número de WhatsApp, menú) vive en `src/data/`. Todo lo que es **diseño** vive en `globals.css` y los componentes.

## Imagen para compartir (WhatsApp, Facebook, X)

La imagen que aparece al compartir el link es el **favicon centrado en un lienzo de 1200×630** del color de fondo de la marca. Se genera con código: `pnpm og` crea `public/images/lina/og-logo.jpg` a partir de `src/app/icon.png` y del color `--brand-night` de `globals.css`. Si cambias el favicon o la paleta, vuelve a correrlo. Si lo reemplazas por otra imagen, cámbiale también el nombre: WhatsApp y los optimizadores la cachean por URL.

## Imágenes

Las fotos fuente (originales, retocadas y los renders de producto de `Productos/`) están **fuera del repo**, en la carpeta padre. `pnpm images` las convierte a WebP en los tamaños necesarios y las deja en `public/images/`; falla si alguna supera 300 KB. El manifiesto está en [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).

## SEO y motores de IA

- **Metadatos** en [`src/app/layout.tsx`](src/app/layout.tsx): título, descripción, canonical, Open Graph y Twitter (imagen `public/images/lina/og-logo.jpg`). Los textos salen de `site.seo` y `site.description` en [`src/data/site.ts`](src/data/site.ts).
- **Datos estructurados (JSON-LD)**: `Organization`, `Person` (Lina) y `WebSite` en el layout; `ItemList` de productos y de planes en el home. Se generan en [`src/lib/schema.ts`](src/lib/schema.ts) a partir de `src/data`, así que cambiar un precio los actualiza. Validar en <https://validator.schema.org>.
- **`/robots.txt`**, **`/sitemap.xml`** y **`/llms.txt`** (resumen del sitio en Markdown para asistentes de IA) se generan desde código en `src/app/`.

### URL base e indexación

La URL absoluta del sitio se resuelve en el build ([`src/lib/site-url.ts`](src/lib/site-url.ts)): `NEXT_PUBLIC_SITE_URL` si existe → el dominio de producción de Vercel → `localhost`.

**El sitio solo se indexa cuando vive en su dominio definitivo** (`site.url`, hoy `https://belikelina.com`). En la URL de Vercel o en un subdominio de pruebas, cada página lleva `noindex` y `robots.txt` bloquea a todos los rastreadores, para no duplicar ni competir con la web actual. Al conectar el dominio en Vercel se activa solo; para forzar otra URL, define `NEXT_PUBLIC_SITE_URL` en las variables de entorno del proyecto.

## Blog con Sanity

Los artículos se escriben en **Sanity** (CMS) y todos usan la misma plantilla
([`PostArticle`](src/components/blog/PostArticle.tsx)): portada, texto enriquecido, productos relacionados
de la tienda y un botón de WhatsApp propio por artículo. El Studio está en [`studio/`](studio) y su guía de
configuración (proyecto, tokens, webhook, variables de entorno) en [`studio/README.md`](studio/README.md).

- **Sin configurar, el sitio funciona igual**: mientras no exista `NEXT_PUBLIC_SANITY_PROJECT_ID` (o no haya
  artículos publicados) se muestran los 4 títulos de relleno de `src/data/posts.ts` y sus páginas «próximamente».
- **Caché**: las consultas se guardan con tags (`all-post`, `post-<slug>`) y el webhook
  [`/api/revalidate`](src/app/api/revalidate/route.ts) las invalida al publicar; no hace falta redesplegar.
- **Imágenes**: salen del CDN de Sanity con `next/image` ([`SanityImage`](src/components/blog/SanityImage.tsx)).
- **Vista previa de la plantilla** sin Sanity: `/design/articulo` (solo en desarrollo).
- **Productos del Studio**: `pnpm studio:sync` copia la lista de `src/data/products.ts` al Studio.

## Tienda

- [`/tienda`](src/app/tienda/page.tsx): catálogo completo, agrupado en suplementos, guías y endulzantes.
- [`/tienda/[slug]`](src/app/tienda/%5Bslug%5D/page.tsx): una ficha por producto (8 páginas estáticas) con foto, precio, beneficios, ficha técnica y productos relacionados.

El botón **Comprar por WhatsApp** abre una conversación con Lina con el producto y el precio en el mensaje (provisional, mientras se define el checkout propio). Precios, textos y fichas viven en [`src/data/products.ts`](src/data/products.ts) y se reflejan a la vez en la página, en el JSON-LD, en el sitemap y en `llms.txt`.

## Páginas legales y preguntas frecuentes

Cuatro rutas propias, con el texto copiado del sitio anterior: `/terminos-y-condiciones`, `/politica-de-privacidad`, `/pagos-envios-y-devoluciones` y `/preguntas-frecuentes`. El contenido son datos tipados en [`src/data/legal/`](src/data/legal) (se edita ahí, no en JSX) y lo pintan `LegalDocument` (índice lateral + secciones) y `FaqList` (acordeón con `<details>` nativo). El footer sale de `site.legal`. Las URLs del WordPress anterior (`/privacy-policy`, `/refund_returns`, `/elements/accordions`) redirigen con 308 desde `next.config.ts`.

## Estado

Fase 1: página de inicio completa (hero, tienda, recetas, planes, blog, footer) más la tienda con ficha por producto. La compra y los planes se coordinan por WhatsApp; no hay carrito ni pasarela de pago todavía. Las páginas de artículos y recetas muestran «próximamente» (`noindex`) hasta que exista el contenido.
