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
├── app/            layout, página de inicio, globals.css, iconos, rutas provisionales
├── components/
│   ├── ui/         shadcn/ui (generados)
│   ├── layout/     Header, MobileMenu, Footer, WhatsAppButton
│   ├── sections/   Hero, StoreSection, RecipesSection, PlansSection, BlogSection
│   └── shared/     Section, SectionHeader, tarjetas, NewsletterForm, Logo…
├── data/           site.ts (config), products, plans, recipes, posts, hero, lina
├── actions/        Server Actions (newsletter)
├── lib/            formatCOP, enlaces de WhatsApp
└── types/
```

Todo lo que es **dato** (textos, precios, enlaces, número de WhatsApp, menú) vive en `src/data/`. Todo lo que es **diseño** vive en `globals.css` y los componentes.

## Imágenes

Las fotos fuente (originales y retocadas) están **fuera del repo**, en la carpeta padre. `pnpm images` las convierte a WebP en los tamaños necesarios y las deja en `public/images/`; falla si alguna supera 300 KB. El manifiesto está en [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs).

## Estado

Fase 1: página de inicio completa (hero, tienda, recetas, planes, blog, footer). Los productos enlazan a la tienda actual (belikelina.com) y los planes abren WhatsApp. Las páginas de artículos y recetas muestran «próximamente» (`noindex`) hasta que exista el contenido.
