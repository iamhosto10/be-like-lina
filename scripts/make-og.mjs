/**
 * Genera la imagen que se ve al compartir el sitio (WhatsApp, Facebook, X, iMessage…).
 *
 *   pnpm og
 *
 * Es el favicon (src/app/icon.png) centrado en un lienzo de 1200×630 del color de fondo de
 * la marca. Así el símbolo se ve completo en cualquier red, también en las que recortan al
 * formato panorámico. El color sale de globals.css: si cambia la paleta, se vuelve a correr.
 * Salida: public/images/lina/og-logo.jpg  (≤ 300 KB; WhatsApp ignora imágenes más pesadas).
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public/images/lina/og-logo.jpg");
const SIZE = 560; // lado del favicon dentro del lienzo

const css = await readFile(path.join(root, "src/app/globals.css"), "utf8");
const night = css.match(/--brand-night:\s*(#[0-9a-fA-F]{3,8})/)?.[1];
if (!night) throw new Error("No encuentro --brand-night en globals.css");

const icon = await sharp(path.join(root, "src/app/icon.png")).resize(SIZE, SIZE).png().toBuffer();

await sharp({ create: { width: 1200, height: 630, channels: 3, background: night } })
  .composite([{ input: icon, gravity: "centre" }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

const kb = Math.round((await stat(OUT)).size / 1024);
console.log(`${kb > 300 ? "✗" : "✓"} ${path.relative(root, OUT)}  1200×630  ${kb} KB`);
if (kb > 300) process.exit(1);
