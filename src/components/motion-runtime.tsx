"use client";

import * as React from "react";

/** Reveal when an element's top clears the bottom 12% of the viewport. */
const ROOT_MARGIN = "0px 0px -12% 0px";
const STAGGER_MS = 60;

/**
 * The page's scroll-reveal choreography, in one place.
 *
 * Sections mark themselves `data-reveal`; one IntersectionObserver flips each
 * to `data-reveal="in"` as it enters, and the CSS in globals.css does the
 * actual motion. Elements that cross the line in the same observer callback
 * are one batch and get a staggered transition-delay — which is what
 * `ScrollTrigger.batch` used to do here, for the price of a 20 kB plugin. It
 * keeps every section a server component.
 *
 * The hero entrance is pure CSS and is not driven from here at all.
 */
export function MotionRuntime({ children }: { children: React.ReactNode }) {
  const scope = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let slot = 0;
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          // Already scrolled past (a deep link, a reload mid-page): just show it.
          const above = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !above) continue;
          el.style.transitionDelay = above ? "0ms" : `${slot++ * STAGGER_MS}ms`;
          el.dataset.reveal = "in";
          observer.unobserve(el);
        }
      },
      { rootMargin: ROOT_MARGIN }
    );

    root
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={scope}>{children}</div>;
}
