/**
 * Optimiza las imágenes fuente (fuera del repo) y las deja listas en public/images/.
 *
 *   pnpm images
 *
 * - Fuente: la carpeta padre del proyecto (donde están las fotos originales y retocadas).
 * - Salida: WebP (o JPG para la imagen Open Graph), redimensionadas sin ampliar,
 *   con el canal alfa conservado cuando existe.
 * - Falla si algún archivo supera el presupuesto de peso.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../..");
const OUT = path.resolve(__dirname, "../public/images");
const BUDGET_KB = 300;

/** @type {Array<{src:string, out:string, width?:number, height?:number, fit?:"cover"|"inside", position?:string, crop?:{left:number,top:number,width:number,height:number}, format?:"webp"|"jpeg", quality?:number}>} */
const jobs = [
  // ── Hero ───────────────────────────────────────────────────────────────
  { src: "Stitch/ChatGPT Imagen Sept 2 2026 Edición.png", out: "hero/lina-full.webp", width: 1200 },
  {
    src: "Stitch/ChatGPT Imagen Sept 2 2026 Edición (1).png",
    out: "hero/lina-wide.webp",
    width: 1920,
  },
  {
    src: "Stitch/ChatGPT Imagen Sept 2 2026 Edición (2).png",
    out: "hero/lina-cutout.webp",
    width: 1200,
    quality: 88,
  },

  // ── Lina (Sobre Lina, avatar, Open Graph) ──────────────────────────────
  { src: "Stitch/Retrato realista ChatGPT Sept 2 2026.png", out: "lina/retrato.webp", width: 1000 },
  {
    src: "Stitch/Retrato realista ChatGPT Sept 2 2026 (1).png",
    out: "lina/avatar.webp",
    width: 600,
    height: 600,
    fit: "cover",
  },
  {
    src: "Stitch/Retrato realista ChatGPT Sept 2 2026 (2).png",
    out: "lina/og.jpg",
    width: 1200,
    height: 630,
    fit: "cover",
    position: "top",
    format: "jpeg",
    quality: 82,
  },

  // ── Productos (renders con fondo transparente) ─────────────────────────
  { src: "Chocolate 1100x1100.webp", out: "productos/shaker-chocolate.webp", width: 800 },
  { src: "Vainilla 1100x1100.webp", out: "productos/shaker-vainilla.webp", width: 800 },
  { src: "Pre Entreno 1100x1100.webp", out: "productos/fishz.webp", width: 800 },
  { src: "SANTTINA.webp", out: "productos/santtina.webp", width: 800 },
  { src: "Batido Funcion 5.webp", out: "productos/recetario.webp", width: 800 },
  // La stevia no tiene render propio: se recorta la botella del banner.
  {
    src: "5 1600x901.webp",
    out: "productos/stevia.webp",
    crop: { left: 290, top: 0, width: 285, height: 901 },
    width: 800,
  },

  // ── Logo (blanco sobre transparente; header y footer son siempre oscuros) ──
  { src: "LOGO-BE-LIKE-LINA.png", out: "logo/logo-blanco.webp", quality: 95 },

  // ── Iconos de marca ────────────────────────────────────────────────────
  { src: "Mujer 1-1.webp", out: "iconos/mujer.webp" },
  { src: "Pesa 1.webp", out: "iconos/pesa.webp" },
  { src: "Carta de Amor.webp", out: "iconos/carta.webp" },
];

const kb = (bytes) => Math.round(bytes / 1024);

let failed = false;
for (const job of jobs) {
  const input = path.join(SRC, job.src);
  const output = path.join(OUT, job.out);
  await mkdir(path.dirname(output), { recursive: true });

  let pipeline = sharp(input);
  if (job.crop) pipeline = pipeline.extract(job.crop);
  if (job.width || job.height) {
    pipeline = pipeline.resize({
      width: job.width,
      height: job.height,
      fit: job.fit ?? "inside",
      position: job.position ?? "centre",
      withoutEnlargement: true,
    });
  }
  const format = job.format ?? "webp";
  pipeline =
    format === "jpeg"
      ? pipeline
          .flatten({ background: "#241323" })
          .jpeg({ quality: job.quality ?? 82, mozjpeg: true })
      : pipeline.webp({ quality: job.quality ?? 82, effort: 6 });

  const info = await pipeline.toFile(output);
  const size = (await stat(output)).size;
  const over = kb(size) > BUDGET_KB;
  if (over) failed = true;
  console.log(
    `${over ? "✗" : "✓"} ${job.out.padEnd(34)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(5)} ${String(kb(size)).padStart(4)} KB${over ? `  ← supera ${BUDGET_KB} KB` : ""}`,
  );
}

if (failed) {
  console.error(`\nAlguna imagen supera el presupuesto de ${BUDGET_KB} KB.`);
  process.exit(1);
}
console.log("\nImágenes listas en public/images/");
