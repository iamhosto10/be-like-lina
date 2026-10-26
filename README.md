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
| `pnpm test:commerce`        | Pruebas del carrito, pagos y correos                        |

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

- **Configuración**: el Project ID y el dataset (públicos) vienen por defecto en [`src/lib/sanityConfig.ts`](src/lib/sanityConfig.ts);
  las variables `NEXT_PUBLIC_SANITY_*` solo hacen falta para apuntar a otro proyecto. Mientras no haya artículos publicados en
  Sanity se muestran los 4 títulos de relleno de `src/data/posts.ts` y sus páginas «próximamente».
- **Caché**: las consultas se guardan con tags (`all-post`, `post-<slug>`) y el webhook
  [`/api/revalidate`](src/app/api/revalidate/route.ts) las invalida al publicar; no hace falta redesplegar.
- **Imágenes**: salen del CDN de Sanity con `next/image` ([`SanityImage`](src/components/blog/SanityImage.tsx)).
- **Vista previa de la plantilla** sin Sanity: `/design/articulo` (solo en desarrollo).
- **Productos del Studio**: `pnpm studio:sync` copia la lista de `src/data/products.ts` al Studio.

## Tienda y pagos (carrito + ePayco)

Carrito persistente (`localStorage`), checkout propio y pago con el **Checkout de ePayco** (el cliente paga en la ventana
segura de ePayco: tarjetas, PSE, Nequi…). **Solo cuando el pago queda aprobado**:

1. se envía un correo a **ventas@belikelina.com** (`ORDER_NOTIFY_EMAIL`) con el pedido, el cliente y la dirección,
2. se envía la confirmación al comprador (ambos con **Resend**),
3. la página de resultado lleva al comprador a **WhatsApp de Lina** con el resumen del pedido ya escrito (cuenta regresiva de
   6 s, cancelable, y solo una vez por pedido; queda el botón).

Los planes de entrenamiento y nutrición siguen por WhatsApp, fuera del carrito.

### Modos (los decide solo el entorno)

| Modo                  | Cuándo                                                          | Qué pasa                                                                                                                                         |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **off** (por defecto) | sin credenciales de ePayco ni `CHECKOUT_DEMO_MODE`              | no hay carrito; las fichas dicen «Comprar por WhatsApp». Es el estado actual del sitio publicado                                                 |
| **demo**              | `CHECKOUT_DEMO_MODE=true` y sin credenciales                    | todo el flujo funciona, pero el pago se simula en `/checkout/demo/…`. Los correos son reales si hay `RESEND_API_KEY` y salen marcados «[PRUEBA]» |
| **epayco**            | están `EPAYCO_PUBLIC_KEY`, `EPAYCO_CUSTOMER_ID`, `EPAYCO_P_KEY` | pagos con ePayco. Con `EPAYCO_TEST=true` (valor por defecto) son de **prueba**; con `EPAYCO_TEST=false` se cobra de verdad                       |

Cambiar de modo exige **redesplegar** (se decide al construir el sitio).

### Poner las credenciales (lo único que falta)

1. **ePayco** (dashboard.epayco.co → Integraciones → Llaves API): copia `P_PUBLIC_KEY` → `EPAYCO_PUBLIC_KEY`,
   `P_CUST_ID_CLIENTE` → `EPAYCO_CUSTOMER_ID` y `P_KEY` → `EPAYCO_P_KEY`. Empieza con `EPAYCO_TEST=true`. La URL de
   confirmación (`https://<dominio>/api/epayco/confirmacion`) la envía el propio botón en cada pago; no hay que configurarla
   en el panel. Para cobrar de verdad: `EPAYCO_TEST=false` y redesplegar.
2. **Resend**: crea la API key (`RESEND_API_KEY`) y verifica el dominio `belikelina.com` (registros DNS que te da Resend) para
   poder enviar desde `pedidos@belikelina.com` (`ORDER_EMAIL_FROM`). Sin `ORDER_NOTIFY_EMAIL`, el aviso va a ventas@belikelina.com.
3. **Upstash Redis**: en Vercel → Storage → Marketplace → _Upstash Redis_ → conectar al proyecto (crea las variables solas).
   Guarda los pedidos y evita correos duplicados cuando ePayco repite una confirmación. **Sin Redis el checkout se
   bloquea en Vercel** (la memoria no se comparte entre peticiones).
4. Cargar las variables en Vercel (Production) y **volver a desplegar**.

### Cómo funciona

`/checkout` crea el pedido en el servidor (los precios se recalculan desde `src/data/products.ts`; nada que venga del
navegador se toma como precio) y lleva a `/checkout/pagar/<pedido>`, que abre la ventana de ePayco. Luego hay **dos caminos
independientes** que confirman el pago, y ambos consultan la transacción a ePayco (`/validation/v1/reference/<ref>`) en vez de
fiarse de lo recibido:

- la **confirmación** de ePayco a `/api/epayco/confirmacion` (valida la firma `x_signature`), y
- el **regreso del cliente** a `/checkout/resultado/<pedido>?ref_payco=…`.

Se comprueba que el monto coincida con el del pedido y recién entonces se da por pagado y salen los correos (una sola vez,
aunque lleguen ambas confirmaciones o se repitan). Si un correo falla, la confirmación responde 500 y ePayco reintenta solo
ese envío.

- **Envío**: tarifa fija en [`src/data/shipping.ts`](src/data/shipping.ts) (provisional: $15.000; confirmar con Lina). Los productos
  digitales (Guía y Recetario) no cobran envío ni piden dirección: quien despacha recibe la orden de enviarlos por correo.
- **Pruebas**: `pnpm test:commerce` (precios, firma, estados de ePayco, idempotencia, fallos de envío, mensaje de WhatsApp, escape de HTML).
- Código: `src/lib/commerce/` (lógica), `src/actions/checkout.ts` (crea el pedido), `src/app/api/epayco/confirmacion/`,
  `src/components/cart/` (carrito, checkout, ventana de ePayco, paso a WhatsApp), `src/app/checkout/` (páginas).
- Reembolsos y cambios de estado en ePayco actualizan el pedido, pero **no** envían correos; el reembolso en sí se hace
  desde el panel de ePayco.

## Tienda

- [`/tienda`](src/app/tienda/page.tsx): catálogo completo, agrupado en suplementos, guías y endulzantes.
- [`/tienda/[slug]`](src/app/tienda/%5Bslug%5D/page.tsx): una ficha por producto (8 páginas estáticas) con foto, precio, beneficios, ficha técnica y productos relacionados.

El botón **Comprar por WhatsApp** abre una conversación con Lina con el producto y el precio en el mensaje (provisional, mientras se define el checkout propio). Precios, textos y fichas viven en [`src/data/products.ts`](src/data/products.ts) y se reflejan a la vez en la página, en el JSON-LD, en el sitemap y en `llms.txt`.

## Páginas legales y preguntas frecuentes

Cuatro rutas propias, con el texto copiado del sitio anterior: `/terminos-y-condiciones`, `/politica-de-privacidad`, `/pagos-envios-y-devoluciones` y `/preguntas-frecuentes`. El contenido son datos tipados en [`src/data/legal/`](src/data/legal) (se edita ahí, no en JSX) y lo pintan `LegalDocument` (índice lateral + secciones) y `FaqList` (acordeón con `<details>` nativo). El footer sale de `site.legal`. Las URLs del WordPress anterior (`/privacy-policy`, `/refund_returns`, `/elements/accordions`) redirigen con 308 desde `next.config.ts`.

## Estado

Fase 1: página de inicio completa (hero, tienda, recetas, planes, blog, footer) más la tienda con ficha por producto. La compra y los planes se coordinan por WhatsApp; no hay carrito ni pasarela de pago todavía. Las páginas de artículos y recetas muestran «próximamente» (`noindex`) hasta que exista el contenido.
