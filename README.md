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

## Cómo cambiar los colores

Todos los colores del sitio salen de **un solo archivo**: [`src/app/globals.css`](src/app/globals.css).

Tiene tres niveles y **solo se edita el primero**:

```
1 · PALETA DE MARCA        --brand-pink: #ff93ce   ← aquí se cambian los colores
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
├── data/           site.ts (config), products, plans, recipes, posts, hero, lina
├── actions/        Server Actions (newsletter)
├── lib/            formatCOP, enlaces de WhatsApp, URL base, JSON-LD
└── types/
```

Todo lo que es **dato** (textos, precios, enlaces, número de WhatsApp, menú) vive en `src/data/`. Todo lo que es **diseño** vive en `globals.css` y los componentes.

## Imágenes

Las fotos fuente (originales, retocadas y los renders de producto de `Productos/`) están **fuera del repo**, en la carpeta padre. `pnpm images` las convierte a WebP en los tamaños necesarios y las deja en `public/images/`; falla si alguna supera 300 KB. El manifiesto está en [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).

## SEO y motores de IA

- **Metadatos** en [`src/app/layout.tsx`](src/app/layout.tsx): título, descripción, canonical, Open Graph y Twitter (imagen `public/images/lina/og.jpg`). Los textos salen de `site.seo` y `site.description` en [`src/data/site.ts`](src/data/site.ts).
- **Datos estructurados (JSON-LD)**: `Organization`, `Person` (Lina) y `WebSite` en el layout; `ItemList` de productos y de planes en el home. Se generan en [`src/lib/schema.ts`](src/lib/schema.ts) a partir de `src/data`, así que cambiar un precio los actualiza. Validar en <https://validator.schema.org>.
- **`/robots.txt`**, **`/sitemap.xml`** y **`/llms.txt`** (resumen del sitio en Markdown para asistentes de IA) se generan desde código en `src/app/`.

### URL base e indexación

La URL absoluta del sitio se resuelve en el build ([`src/lib/site-url.ts`](src/lib/site-url.ts)): `NEXT_PUBLIC_SITE_URL` si existe → el dominio de producción de Vercel → `localhost`.

**El sitio solo se indexa cuando vive en su dominio definitivo** (`site.url`, hoy `https://belikelina.com`). En la URL de Vercel o en un subdominio de pruebas, cada página lleva `noindex` y `robots.txt` bloquea a todos los rastreadores, para no duplicar ni competir con la web actual. Al conectar el dominio en Vercel se activa solo; para forzar otra URL, define `NEXT_PUBLIC_SITE_URL` en las variables de entorno del proyecto.

## Tienda

- [`/tienda`](src/app/tienda/page.tsx): catálogo completo, agrupado en suplementos, guías y endulzantes.
- [`/tienda/[slug]`](src/app/tienda/%5Bslug%5D/page.tsx): una ficha por producto (8 páginas estáticas) con foto, precio, beneficios, ficha técnica y productos relacionados.

El botón **Comprar ahora** lleva al producto en belikelina.com, donde está el checkout de Mercado Pago; el secundario abre WhatsApp con el producto en el mensaje. Precios, textos y fichas viven en [`src/data/products.ts`](src/data/products.ts) y se reflejan a la vez en la página, en el JSON-LD, en el sitemap y en `llms.txt`.

## Estado

Fase 1: página de inicio completa (hero, tienda, recetas, planes, blog, footer) más la tienda con ficha por producto. La compra se completa en belikelina.com y los planes abren WhatsApp. Las páginas de artículos y recetas muestran «próximamente» (`noindex`) hasta que exista el contenido.
