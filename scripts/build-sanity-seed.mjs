/**
 * Genera los artículos de PRUEBA para importar en Sanity:
 *
 *   node scripts/build-sanity-seed.mjs
 *   cd studio && pnpm exec sanity dataset import seed/posts.ndjson production --replace
 *
 * Crea studio/seed/posts.ndjson (4 artículos completos) y studio/seed/images/ (portadas e
 * imágenes del texto, tomadas de las fotos del proyecto). Cada artículo ejercita un caso
 * distinto de la plantilla: con y sin productos relacionados, con CTA completo, parcial o vacío.
 *
 * Es contenido de ejemplo para probar el sitio: hay que reemplazarlo por los textos reales de Lina.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const seedDir = path.join(root, "web/studio/seed");
const imgDir = path.join(seedDir, "images");
await mkdir(imgDir, { recursive: true });

/* ── Imágenes ─────────────────────────────────────────────────────────── */
const images = [
  // portadas 16:9
  // la portada de la guía es vertical y trae márgenes transparentes: se centra sobre su propio fondo difuminado
  { out: "cover-comidas.jpg", src: "Productos/guia.webp", w: 1400, h: 788, blur: true },
  {
    out: "cover-constancia.jpg",
    src: "Stitch/Retrato realista ChatGPT Sept 2 2026 (2).png",
    w: 1400,
    h: 788,
    pos: "left",
  },
  { out: "cover-batido.jpg", src: "Productos/recetario.webp", w: 1400, h: 788, pos: "centre" },
  {
    out: "cover-mentalidad.jpg",
    src: "Stitch/Retrato realista ChatGPT Sept 2 2026.png",
    w: 1400,
    h: 788,
    pos: "north",
  },
  // imágenes dentro del texto (3:2)
  { out: "texto-comidas.jpg", src: "Productos/guia.webp", w: 1200, h: 800, pos: "attention" },
  {
    out: "texto-batido.jpg",
    src: "Productos/shaker-chocolate.webp",
    w: 1200,
    h: 800,
    pos: "attention",
  },
];
for (const i of images) {
  const input = path.join(root, i.src);
  let pipeline;
  if (i.blur) {
    const trimmed = await sharp(input).trim().toBuffer();
    const backdrop = await sharp(trimmed)
      .resize(i.w, i.h, { fit: "cover" })
      .blur(40)
      .modulate({ brightness: 0.3, saturation: 0.4 })
      .toBuffer();
    const front = await sharp(trimmed).resize(i.w, i.h, { fit: "inside" }).toBuffer();
    pipeline = sharp(backdrop).composite([{ input: front, gravity: "centre" }]);
  } else {
    pipeline = sharp(input).resize(i.w, i.h, { fit: "cover", position: i.pos });
  }
  await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(imgDir, i.out));
}

/* ── Constructores de Portable Text ───────────────────────────────────── */
let n = 0;
const key = () => `k${(++n).toString(36).padStart(4, "0")}`;

/** "texto con **negrita**, *cursiva* y [enlace](/ruta)" → spans + markDefs. */
function inline(text) {
  const children = [];
  const markDefs = [];
  for (const part of text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/)) {
    if (!part) continue;
    let m;
    if ((m = part.match(/^\*\*([^*]+)\*\*$/)))
      children.push({ _type: "span", _key: key(), text: m[1], marks: ["strong"] });
    else if ((m = part.match(/^\*([^*]+)\*$/)))
      children.push({ _type: "span", _key: key(), text: m[1], marks: ["em"] });
    else if ((m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: m[2] });
      children.push({ _type: "span", _key: k + "s", text: m[1], marks: [k] });
    } else children.push({ _type: "span", _key: key(), text: part, marks: [] });
  }
  return { children, markDefs };
}
const block = (style, text, extra = {}) => ({
  _type: "block",
  _key: key(),
  style,
  ...inline(text),
  ...extra,
});
const p = (t) => block("normal", t);
const h2 = (t) => block("h2", t);
const h3 = (t) => block("h3", t);
const quote = (t) => block("blockquote", t);
const bullets = (items) => items.map((t) => block("normal", t, { listItem: "bullet", level: 1 }));
const numbered = (items) => items.map((t) => block("normal", t, { listItem: "number", level: 1 }));
const image = (file, alt, caption) => ({
  _type: "image",
  _key: key(),
  _sanityAsset: `image@file://./images/${file}`,
  alt,
  ...(caption && { caption }),
});
const cover = (file, alt) => ({
  _type: "image",
  _sanityAsset: `image@file://./images/${file}`,
  alt,
});

const doc = (slug, fields) => ({
  _id: `post-${slug}`, // sin «drafts.»: queda publicado
  _type: "post",
  slug: { _type: "slug", current: slug },
  ...fields,
});

/* ── Artículos ────────────────────────────────────────────────────────── */
const posts = [
  // 1 · CTA completo + 2 productos + imagen en el texto
  doc("5-comidas-saludables-y-faciles-para-tu-semana", {
    title: "5 comidas saludables y fáciles para tu semana",
    category: "nutricion",
    excerpt:
      "Cinco ideas sencillas para organizar tu semana sin pasar horas en la cocina y sin aburrirte de comer lo mismo.",
    publishedAt: "2026-10-18T14:00:00.000Z",
    coverImage: cover(
      "cover-comidas.jpg",
      "Portada de la Guía de Alimentación Saludable con un plato de pollo, brócoli y aguacate",
    ),
    body: [
      p(
        "Comer bien no tiene que ser complicado ni costoso. Lo que más ayuda es tener **ideas simples que se repitan** durante la semana, para no decidir desde cero cada vez que tienes hambre.",
      ),
      h2("Antes de empezar: la base del plato"),
      p("Para armar casi cualquier comida equilibrada puedes guiarte por esta proporción:"),
      ...bullets([
        "**La mitad del plato:** vegetales y frutas.",
        "**Un cuarto:** proteína (pollo, pescado, huevo, legumbres).",
        "**Un cuarto:** carbohidrato (arroz, papa, avena, plátano).",
        "**Un poco de grasa saludable:** aguacate, aceite de oliva o frutos secos.",
      ]),
      h2("Las 5 comidas"),
      ...numbered([
        "**Bowl de avena nocturna con frutos rojos:** se prepara la noche anterior y por la mañana solo lo sacas de la nevera.",
        "**Pollo a la plancha con ensalada y aguacate:** rápido, completo y se puede preparar en cantidad.",
        "**Arroz con lentejas y vegetales salteados:** una combinación económica que rinde para varios días.",
        "**Tortilla de huevo con espinaca y queso fresco:** lista en diez minutos para una cena ligera.",
        "**Pescado al horno con papa criolla y brócoli:** se cocina todo en una sola bandeja.",
      ]),
      image(
        "texto-comidas.jpg",
        "Plato de pollo a la plancha con aguacate y brócoli",
        "El plato equilibrado: proteína, vegetales y grasa saludable.",
      ),
      h2("Cómo organizarlas"),
      p(
        "Elige **un día para cocinar lo básico** (la proteína, el arroz y los vegetales) y guárdalo en recipientes. Así, durante la semana solo combinas y calientas.",
      ),
      quote(
        "Si lo dejas para decidir en el momento, casi siempre gana lo más rápido, no lo más saludable.",
      ),
      p(
        "Si quieres más ideas con cantidades y recetas paso a paso, revisa la [Guía de Alimentación Saludable](/tienda/guia-alimentacion-saludable).",
      ),
    ],
    relatedProducts: ["guia-alimentacion-saludable", "stevia-250"],
    cta: {
      title: "¿Quieres un plan hecho para ti?",
      buttonLabel: "Quiero mi plan nutricional",
      message:
        "Hola Lina, leí el artículo de las 5 comidas saludables y quiero información sobre el Plan Nutricional.",
    },
  }),

  // 2 · CTA parcial (solo texto del botón), subtítulos h3, sin imagen en el texto
  doc("como-mantener-la-constancia", {
    title: "Cómo mantener la constancia y ver resultados reales",
    category: "entrenamiento",
    excerpt:
      "La constancia no depende de la motivación sino de hábitos pequeños que puedas sostener incluso en los días difíciles.",
    publishedAt: "2026-10-15T14:00:00.000Z",
    coverImage: cover("cover-constancia.jpg", "Lina Fuentes en una sesión de entrenamiento"),
    body: [
      p(
        "Casi todo el mundo empieza con muchas ganas. Lo difícil es seguir cuando la motivación baja, y baja para todos. La buena noticia es que la constancia **se construye**, no se tiene o no se tiene.",
      ),
      h2("La constancia no es motivación"),
      p(
        "La motivación va y viene. Lo que te sostiene son los hábitos: acciones tan pequeñas y claras que hacerlas cuesta menos que evitarlas.",
      ),
      h2("4 hábitos que sí funcionan"),
      h3("1. Hazlo pequeño"),
      p(
        "Si tu meta es entrenar cinco veces por semana y llevas meses sin moverte, empieza con tres sesiones cortas. Es mejor **cumplir una meta modesta** que abandonar una exagerada.",
      ),
      h3("2. Agenda tu entrenamiento"),
      p(
        "Ponlo en tu calendario como cualquier otra cita: día, hora y duración. Lo que no se agenda se negocia con el cansancio.",
      ),
      h3("3. Mide algo más que el peso"),
      p(
        "La báscula no cuenta toda la historia. Fíjate también en cómo duermes, cuánta energía tienes, cuánto peso levantas o cómo te queda la ropa.",
      ),
      h3("4. Prepara el día anterior"),
      p(
        "Deja lista la ropa, la botella de agua y tu comida. Cada decisión que tomas de antemano es una excusa menos.",
      ),
      quote("No necesitas hacerlo perfecto, necesitas no abandonarlo."),
      h2("Si fallas un día"),
      p("Va a pasar, y no borra tu progreso. Lo que importa es lo que haces después:"),
      ...bullets([
        "Retoma al día siguiente, sin compensar ni castigarte.",
        "Haz una versión más corta, aunque sean diez minutos.",
        "Recuerda por qué empezaste y vuelve a ese motivo.",
      ]),
    ],
    relatedProducts: ["pre-entreno-fishz", "proteina-shaker-vainilla"],
    cta: { buttonLabel: "Quiero entrenar con Lina" },
  }),

  // 3 · CTA completo + 3 productos (máximo) + imagen en el texto + lista numerada y con viñetas
  doc("batido-post-entreno", {
    title: "Batido post-entreno para recuperar y crecer",
    category: "recetas",
    excerpt:
      "Una receta de cinco minutos con proteína, fruta y avena para después de entrenar, sin azúcares añadidos.",
    publishedAt: "2026-10-12T14:00:00.000Z",
    coverImage: cover(
      "cover-batido.jpg",
      "Batido rojo de fresa servido en una botella de vidrio con fresas y cerezas",
    ),
    body: [
      p(
        "Después de entrenar es buen momento para aportarle a tu cuerpo **proteína y carbohidratos**. Este batido lo hace en un vaso, en menos de cinco minutos y con ingredientes fáciles de conseguir.",
      ),
      h2("Ingredientes"),
      p("Para una porción:"),
      ...bullets([
        "1 scoop de proteína (sabor chocolate o vainilla).",
        "1 banano maduro, mejor si está congelado.",
        "3 cucharadas de avena en hojuelas.",
        "250 ml de leche vegetal o agua.",
        "Unas gotas de stevia, si quieres más dulzor.",
      ]),
      h2("Preparación"),
      ...numbered([
        "Pon todos los ingredientes en la licuadora.",
        "Licúa durante 30 a 40 segundos, hasta que quede sin grumos.",
        "Prueba y ajusta el dulzor con stevia.",
        "Sírvelo frío y tómalo dentro de los 30 minutos siguientes a tu entrenamiento.",
      ]),
      image(
        "texto-batido.jpg",
        "Bote de Proteína Shaker sabor chocolate junto a trozos de chocolate",
        "La proteína en sabor chocolate combina muy bien con el banano.",
      ),
      h3("Variaciones"),
      ...bullets([
        "**Más cremoso:** cambia el agua por leche de almendras.",
        "**Con fruta roja:** reemplaza el banano por fresas congeladas.",
        "**Más energía:** agrega una cucharadita de mantequilla de maní.",
      ]),
      quote("Un buen batido hoy vale más que una dieta perfecta que abandonas el viernes."),
      p(
        "Si te gustan los batidos, el [Recetario de Batidos Orgánicos con Función](/tienda/recetario-batidos) trae más recetas para distintos objetivos.",
      ),
    ],
    relatedProducts: ["proteina-shaker-chocolate", "stevia-250", "recetario-batidos"],
    cta: {
      title: "¿Quieres tu plan de nutrición completo?",
      buttonLabel: "Escribirle a Lina",
      message:
        "Hola Lina, probé el batido post-entreno y quiero información sobre el Plan Nutricional.",
    },
  }),

  // 4 · sin productos relacionados y sin CTA → usa los valores por defecto de la plantilla
  doc("mentalidad-el-primer-paso", {
    title: "Mentalidad: el primer paso de tu transformación",
    category: "mentalidad",
    excerpt:
      "Antes de cambiar tu alimentación o tu rutina, cambia la forma en que hablas de ti. Todo empieza ahí.",
    publishedAt: "2026-10-08T14:00:00.000Z",
    coverImage: cover("cover-mentalidad.jpg", "Retrato de Lina Fuentes"),
    body: [
      p(
        "Muchas transformaciones fracasan antes de empezar, no por falta de disciplina sino por la forma en que la persona **se habla a sí misma**. Antes de cambiar tu plan, vale la pena cambiar tu punto de partida.",
      ),
      h2("Empieza por decidir"),
      p(
        "Decidir no es esperar a sentirte lista. Es elegir un día, un primer paso pequeño y comprometerte con él. La claridad llega haciendo, no pensando.",
      ),
      h2("Tres preguntas para comenzar"),
      ...numbered([
        "**¿Por qué quiero cambiar?** Un motivo propio, no el de otra persona, te sostiene cuando se complica.",
        "**¿Qué estoy dispuesta a dejar de hacer?** Todo cambio exige renunciar a algo, aunque sea poco.",
        "**¿Cuál es el primer paso más pequeño que puedo dar hoy?** Que sea tan fácil que no haya excusa.",
      ]),
      quote(
        "No se trata de ser otra persona. Se trata de construir una versión de ti que te haga sentir bien.",
      ),
      h2("Sé amable contigo"),
      p(
        "Habrá días buenos y días regulares. Tratarte con la misma paciencia que le tendrías a una amiga es parte del proceso, no un lujo.",
      ),
    ],
  }),
];

await writeFile(
  path.join(seedDir, "posts.ndjson"),
  posts.map((d) => JSON.stringify(d)).join("\n") + "\n",
);
console.log(`✓ studio/seed/posts.ndjson  ${posts.length} artículos`);
console.log(`✓ studio/seed/images/       ${images.length} imágenes`);
