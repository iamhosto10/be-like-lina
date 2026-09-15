import { notFound } from "next/navigation";
import { Section, type Tone } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenSwatch } from "./TokenSwatch";

const BRAND_TOKENS: Array<[string, string]> = [
  ["--brand-pink", "Rosa Digital"],
  ["--brand-pink-deep", "Rosa Profundo"],
  ["--brand-plum", "Ciruela"],
  ["--brand-violet", "Violeta"],
  ["--brand-night", "Morado Noche"],
  ["--brand-wine", "Morado Vino"],
  ["--brand-elevated", "Morado Elevado"],
  ["--brand-deep", "Morado Profundo"],
  ["--brand-ice", "Rosa Hielo"],
  ["--brand-mist", "Niebla"],
  ["--brand-white", "Blanco"],
  ["--brand-text-on-dark-muted", "Texto tenue / oscuro"],
  ["--brand-text-on-light-muted", "Texto tenue / claro"],
  ["--brand-border-on-dark", "Borde / oscuro"],
  ["--brand-border-on-light", "Borde / claro"],
  ["--brand-whatsapp", "WhatsApp"],
];

const TONES: Tone[] = ["dark", "wine", "light", "plum", "deep"];

function ToneSample({ tone }: { tone: Tone }) {
  return (
    <Section tone={tone} className="py-10 md:py-12">
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            data-tone=&quot;{tone}&quot;
          </p>
          <h2 className="text-3xl md:text-4xl">
            Construye una <span className="text-primary">versión de ti</span> que te haga sentir
            bien.
          </h2>
          <p className="max-w-prose text-muted-foreground">
            Entrenamientos inteligentes, nutrición real y mentalidad para transformar tu cuerpo y tu
            vida. Este párrafo usa <code className="font-mono text-xs">text-muted-foreground</code>.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Empieza hoy</Button>
            <Button variant="outline">Ver video</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Ver receta →</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secundario</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="max-w-sm">
            <Input placeholder="Tu correo electrónico" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Plan Nutricional</CardTitle>
            <CardDescription>Plan de alimentación personalizado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-mono text-2xl font-semibold">$350.000</p>
            <Button className="w-full">Elegir plan</Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export default function DesignPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main>
      <Section tone="dark" className="py-12">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Sistema de diseño · página interna de verificación
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl">Be Like Lina</h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Todos los colores salen de <code className="font-mono text-xs">src/app/globals.css</code>.
          Cambia <code className="font-mono text-xs">--brand-pink</code> allí y vuelve a esta
          página.
        </p>
        <p className="mt-6 font-script text-5xl text-accent md:text-6xl">Be Like Lina</p>
      </Section>

      <Section tone="deep" className="py-10">
        <h2 className="mb-5 text-xl">1 · Paleta de marca (nivel 1)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BRAND_TOKENS.map(([token, label]) => (
            <TokenSwatch key={token} token={token} label={label} />
          ))}
        </div>
      </Section>

      <Section tone="light" className="py-10">
        <h2 className="mb-2 text-xl">2 · Tipografía</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Figtree (variable) · titulares con{" "}
          <code className="font-mono text-xs">tracking-tight</code> y{" "}
          <code className="font-mono text-xs">text-wrap: balance</code>.
        </p>
        <div className="space-y-4">
          <p className="text-6xl leading-none font-extrabold tracking-tight">Titular 6xl / 800</p>
          <p className="text-5xl leading-none font-bold tracking-tight">Titular 5xl / 700</p>
          <p className="text-4xl font-bold tracking-tight">Titular 4xl / 700</p>
          <p className="text-3xl font-bold tracking-tight">Titular 3xl / 700</p>
          <p className="text-2xl font-semibold">Subtítulo 2xl / 600</p>
          <p className="text-xl font-semibold">Subtítulo xl / 600</p>
          <p className="text-lg">Cuerpo lg / 400</p>
          <p className="text-base">
            Cuerpo base / 400 — Entrenamientos inteligentes, nutrición real.
          </p>
          <p className="text-sm text-muted-foreground">Pequeño sm / 400 · muted</p>
          <p className="font-mono text-2xl font-semibold tabular-nums">$203.000 · $145.000</p>
        </div>
      </Section>

      <div>
        <Section tone="dark" className="pb-0">
          <h2 className="text-xl">3 · Tonos de sección (nivel 2)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Los mismos componentes de shadcn, sin ninguna clase de color propia, en cada tono.
          </p>
        </Section>
        {TONES.map((tone) => (
          <ToneSample key={tone} tone={tone} />
        ))}
      </div>
    </main>
  );
}
