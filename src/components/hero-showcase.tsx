"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import IsoLevelWarp from "@/components/ui/isometric-wave-grid-background";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { MorphingTextReveal } from "@/components/ui/morphing-text-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrambleText } from "@/components/ui/scramble-text";
import { cn } from "@/lib/utils";

export interface HeroCta {
  label: string;
  href: string;
  primary?: boolean;
  meme?: string;
}

interface HeroShowcaseProps {
  brand: string;
  name: string;
  hoverText: string;
  eyebrow: string;
  taglines: string[];
  relocationNote?: string;
  ctas: HeroCta[];
}

export function HeroShowcase({
  brand,
  name,
  hoverText,
  eyebrow,
  taglines,
  relocationNote,
  ctas,
}: HeroShowcaseProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Wave line color follows the theme's teal (matches --primary in each mode).
  const waveColor =
    mounted && resolvedTheme === "light" ? "15, 151, 168" : "43, 196, 212";

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <IsoLevelWarp color={waveColor} density={46} speed={1.1} />

      {/* Foreground */}
      <div className="relative z-10 flex flex-1 flex-col px-6">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-6">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
          >
            <ScrambleText text={brand} />
          </a>
          <ThemeToggle />
        </div>

        {/* Center */}
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {eyebrow}
          </p>

          <div
            data-cursor="hide"
            className="scale-[0.7] sm:scale-90 md:scale-110 lg:scale-125"
          >
            <MagneticText text={name} hoverText={hoverText} />
          </div>

          <div className="text-xl font-light text-foreground sm:text-2xl md:text-3xl">
            <MorphingTextReveal texts={taglines} interval={2800} glitchOnHover />
          </div>

          {relocationNote ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.22)]" />
              {relocationNote}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                data-meme={cta.meme}
                className={cn(
                  "inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  cta.primary
                    ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
                    : "border-border bg-background/60 text-foreground backdrop-blur hover:border-primary hover:text-primary"
                )}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mx-auto w-full max-w-5xl pb-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}
