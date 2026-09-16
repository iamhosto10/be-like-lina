import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Flame, Heart, Salad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { HeroVideoButton } from "@/components/sections/hero/HeroVideoButton";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

const pillarIcons = {
  dumbbell: Dumbbell,
  salad: Salad,
  heart: Heart,
} as const;

export function Hero() {
  const { headline, subtitle, primaryCta, videoCta, pillars, floatingCard, signature, images } =
    hero;

  return (
    <Section tone="dark" flush contained={false} id="inicio" className="relative overflow-hidden">
      <div className="relative container-site grid items-end gap-x-10 lg:min-h-[min(92svh,960px)] lg:grid-cols-[1.05fr_1fr]">
        {/* ── Texto ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 pt-28 pb-12 md:pt-36 lg:self-center lg:pb-24">
          <h1 className="text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
            {headline.lines.map((line, i) => (
              <span
                key={line}
                className={i === headline.highlightIndex ? "block text-primary" : "block"}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted-foreground md:text-xl">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button size="xl" nativeButton={false} render={<Link href={primaryCta.href} />}>
              {primaryCta.label}
            </Button>
            {site.heroVideoUrl && (
              <HeroVideoButton url={site.heroVideoUrl} label={videoCta.label} />
            )}
          </div>

          <ul className="mt-10 grid max-w-[38rem] grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {pillars.map(({ icon, label }) => {
              const Icon = pillarIcons[icon];
              return (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="size-7 shrink-0 text-primary" strokeWidth={1.6} aria-hidden />
                  <span className="text-[0.9375rem] leading-snug font-medium">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Imagen ────────────────────────────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[34rem] self-end lg:mx-0 lg:max-w-none lg:self-stretch">
          {/* Halo rosa detrás de la figura */}
          <div
            aria-hidden
            className="absolute top-[6%] left-1/2 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-brand-pink/30 blur-[90px] lg:top-[10%] lg:w-[min(80%,620px)]"
          />
          {/* Patrón de puntos */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-[26%] z-20 hidden size-28 opacity-40 lg:block"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--brand-pink) 1.5px, transparent 1.6px)",
              backgroundSize: "14px 14px",
            }}
          />
          {/* Firma decorativa */}
          <p
            aria-hidden
            className="pointer-events-none absolute top-[16%] right-0 z-20 hidden origin-right -rotate-6 font-script text-6xl leading-[0.95] text-primary lg:block xl:text-7xl"
          >
            {signature.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </p>

          <Image
            src={images.cutout.src}
            alt={images.cutout.alt}
            width={images.cutout.width}
            height={images.cutout.height}
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 34rem, 100vw"
            quality={85}
            loading="eager"
            fetchPriority="high"
            className="relative z-10 mx-auto block h-auto w-[86%] max-w-[560px] lg:absolute lg:bottom-0 lg:left-[-14%] lg:mx-0 lg:h-[93%] lg:w-auto lg:max-w-none"
          />

          {/* Tarjeta flotante */}
          <div className="absolute bottom-[10%] left-0 z-20 flex items-center gap-3 rounded-xl bg-brand-white px-4 py-3 text-brand-night shadow-lg shadow-black/25 lg:right-0 lg:bottom-[9%] lg:left-auto lg:px-5 lg:py-4">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flame className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-bold">{floatingCard.title}</span>
              <span className="text-brand-text-on-light-muted block text-sm">
                {floatingCard.subtitle}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
