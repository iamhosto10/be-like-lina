/**
 * Genera la imagen que se ve al compartir el sitio (WhatsApp, Facebook, X, iMessage…).
 *
 *   pnpm og
 *
 * Tarjeta de 1200×630 con la marca: fondo #150915, logo, titular del hero con la línea
 * central en rosa y a Lina a la derecha. Usa el mismo motor que `next/og` (satori).
 * Salida: public/images/lina/og-compartir.jpg  (≤ 300 KB; WhatsApp ignora imágenes más pesadas).
 *
 * Los colores salen de globals.css para que un cambio de paleta se refleje al regenerar.
 */
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public/images/lina/og-compartir.jpg");

/** Lee un token de la paleta (--brand-*) de globals.css. */
const css = await readFile(path.join(root, "src/app/globals.css"), "utf8");
const brand = (name) => {
  const m = css.match(new RegExp(`--brand-${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!m) throw new Error(`No encuentro --brand-${name} en globals.css`);
  return m[1];
};
const PINK = brand("pink");
const NIGHT = brand("night");
const MUTED = brand("text-on-dark-muted");

const png = async (file, resize) =>
  `data:image/png;base64,${(await sharp(path.join(root, file)).resize(resize).png().toBuffer()).toString("base64")}`;

const lina = await png("public/images/hero/lina-cutout.webp", { height: 640 });
const logo = await png("public/images/logo/logo-blanco.webp", { height: 150 });
const fonts = [
  {
    name: "Figtree",
    data: await readFile(path.join(root, "scripts/fonts/figtree-800.woff")),
    weight: 800,
  },
  {
    name: "Figtree",
    data: await readFile(path.join(root, "scripts/fonts/figtree-500.woff")),
    weight: 500,
  },
];

const h = (type, style, children) => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});
const line = (text, color = "#ffffff") =>
  h("div", { fontSize: 74, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, color }, text);

const tree = h(
  "div",
  {
    width: 1200,
    height: 630,
    position: "relative",
    overflow: "hidden",
    fontFamily: "Figtree",
    backgroundColor: NIGHT,
    backgroundImage: `radial-gradient(circle at 78% 55%, ${PINK}55 0%, ${PINK}00 46%)`,
  },
  [
    // Lina, pegada al borde inferior derecho
    {
      type: "img",
      props: { src: lina, style: { position: "absolute", right: -30, bottom: 0, height: 640 } },
    },
    // Columna de texto
    h(
      "div",
      {
        position: "absolute",
        left: 72,
        top: 0,
        bottom: 0,
        width: 640,
        flexDirection: "column",
        justifyContent: "center",
      },
      [
        {
          type: "img",
          props: {
            src: logo,
            style: {
              height: 78,
              width: 215,
              marginLeft: -32,
              marginBottom: 26,
              objectFit: "contain",
              objectPosition: "left",
            },
          },
        },
        line("Construye una"),
        line("versión de ti", PINK),
        line("que te haga"),
        line("sentir bien."),
        h(
          "div",
          { marginTop: 28, fontSize: 30, fontWeight: 500, color: MUTED },
          "Entrenamiento y nutrición para mujeres",
        ),
      ],
    ),
  ],
);

const res = new ImageResponse(tree, { width: 1200, height: 630, fonts });
const jpg = await sharp(Buffer.from(await res.arrayBuffer()))
  .flatten({ background: NIGHT })
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();
await writeFile(OUT, jpg);

const kb = Math.round((await stat(OUT)).size / 1024);
console.log(`${kb > 300 ? "✗" : "✓"} ${path.relative(root, OUT)}  1200×630  ${kb} KB`);
if (kb > 300) process.exit(1);
