import Link from "next/link";
import { Download } from "lucide-react";
import { siteCopy } from "@/data/site";
import { RESUME_PDF } from "@lib/site-config";

/**
 * Server-rendered so the LCP text is in the HTML. The entrance timeline is run
 * by <MotionRuntime /> against the `data-hero-step` marks — no client
 * component, no hydration cost for the first thing a visitor reads.
 */
export function Hero({
  name,
  role,
  location,
  email,
}: {
  name: string;
  role: string;
  location: string;
  email?: string;
}) {
  const { opener, value, problem, primaryCta, secondaryCtaLabel } =
    siteCopy.hero;

  return (
    <section aria-labelledby="hero-heading" className="pb-section pt-12 sm:pt-20">
      <p
        data-hero-step
        className="max-w-prose font-mono text-micro uppercase text-muted-foreground"
      >
        {role}
      </p>

      <h1
        id="hero-heading"
        data-hero-step
        className="mt-6 max-w-[16ch] text-display text-foreground"
      >
        {name}
      </h1>

      <p
        data-hero-step
        className="mt-8 max-w-prose text-lead text-foreground"
      >
        {opener}
      </p>

      <p data-hero-step className="mt-4 max-w-prose text-body text-muted-foreground">
        {value}
      </p>

      <p data-hero-step className="mt-4 max-w-prose text-body text-muted-foreground">
        {problem}
      </p>

      <div data-hero-step className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href={primaryCta.href}
          className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 text-small font-semibold text-accent-foreground transition-opacity duration-fast ease-standard hover:opacity-90"
        >
          {primaryCta.label}
        </Link>

        <a
          href={RESUME_PDF}
          download
          data-meme="pdf"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-border-strong px-5 text-small font-semibold text-foreground transition-colors duration-fast ease-standard hover:border-accent hover:text-accent"
        >
          <Download aria-hidden className="h-4 w-4" />
          Download PDF
        </a>

        {email ? (
          <a
            href={email}
            data-meme="email"
            className="inline-flex min-h-[44px] items-center rounded-md border border-border-strong px-5 text-small font-semibold text-foreground transition-colors duration-fast ease-standard hover:border-accent hover:text-accent"
          >
            {secondaryCtaLabel}
          </a>
        ) : null}
      </div>

      <p
        data-hero-step
        className="mt-8 flex max-w-prose items-start gap-2.5 text-small text-muted-foreground"
      >
        <span
          aria-hidden
          className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
        />
        {location}
      </p>
    </section>
  );
}
