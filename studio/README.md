# Studio de Be Like Lina

Panel de Sanity donde se escriben los artículos del blog. Es un proyecto aparte del sitio
(tiene sus propias dependencias) y se despliega en `https://be-like-lina.sanity.studio`.

## Configuración (una sola vez)

1. **Crear el proyecto** en <https://www.sanity.io/manage> → *New project* (nombre: Be Like Lina,
   dataset `production`). Copia el **Project ID**.
2. **Variables del Studio**: copia `.env.example` a `.env` y pega el Project ID.
3. **Instalar y probar**:
   ```bash
   cd studio
   pnpm install --ignore-workspace
   pnpm dev            # http://localhost:3333
   ```
4. **Subir 4 artículos de prueba completos** (opcional, para ver el blog funcionando):
   ```bash
   pnpm exec sanity login
   pnpm exec sanity dataset import seed/posts.ndjson production --replace
   ```
   Importa 4 artículos **ya publicados** con portada, texto, imágenes, productos relacionados y botón de
   WhatsApp (cada uno prueba un caso distinto: con y sin productos, con CTA completo, parcial o vacío).
   Es contenido de ejemplo: hay que reemplazarlo por los textos reales de Lina. Si antes importaste los
   borradores viejos (solo título), bórralos en el Studio (menú `⋯` → *Delete*) para no tener duplicados.
   Para regenerar el archivo: `node scripts/build-sanity-seed.mjs` desde la raíz del sitio.
5. **Publicar el Studio**: `pnpm run deploy` y elegir el nombre `be-like-lina`.
6. **Invitar a Lina**: manage → proyecto → *Members* → *Invite*, con rol *Editor*.

## Conectar el sitio (variables en Vercel → Settings → Environment Variables)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | el Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | token con rol **Viewer** (manage → API → Tokens). Solo hace falta si el dataset es privado |
| `SANITY_REVALIDATE_SECRET` | una cadena larga y aleatoria (la inventas tú) |

Después de guardarlas hay que **volver a desplegar** en Vercel.

## Webhook (para que un artículo nuevo aparezca sin redesplegar)

manage → proyecto → API → *Webhooks* → *Create*:

- **URL**: `https://<dominio-del-sitio>/api/revalidate`
- **Dataset**: `production` · **Trigger on**: Create, Update, Delete
- **Projection**: `{_type, "slug": slug.current}`
- **HTTP method**: POST
- **Secret**: el mismo valor de `SANITY_REVALIDATE_SECRET`

Si el dominio cambia (de `vercel.app` a `belikelina.com`), hay que actualizar la URL del webhook.

## Escribir un artículo

Todos los campos obligatorios están validados: el botón *Publish* no se habilita mientras falte
alguno. Cada artículo tiene título, enlace, categoría, resumen, fecha, **portada** (con texto
alternativo), contenido, **productos relacionados** (hasta 3) y un **botón de WhatsApp** propio
(título, texto del botón y mensaje). Lo que no se llene en el botón de WhatsApp usa un mensaje genérico.

Los artículos publicados aparecen en el home, en `/blog` y en `/blog/<enlace>`, con su propia imagen
para compartir, y se agregan solos al sitemap.

## Cuando cambian los productos de la tienda

La lista que se elige en *Productos relacionados* se copia de `src/data/products.ts`:

```bash
pnpm studio:sync                   # desde la raíz del sitio
cd studio && pnpm run deploy       # volver a publicar el Studio
```
