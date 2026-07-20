"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * The page's entire scroll/entrance choreography, in one place.
 *
 * Deliberately *not* a per-element wrapper component: sections just mark
 * themselves with `data-reveal`, and a single `ScrollTrigger.batch` animates
 * all of them. That keeps the whole page at one GSAP context and a handful of
 * triggers instead of dozens, and it lets every section stay a server
 * component. See design-system/portfolio-master.md §7.
 *
 * Motion (Framer) owns component state — menus, the theme icon. GSAP owns
 * timelines and scroll. Neither is used for the other's job.
 */
export function MotionRuntime({ children }: { children: React.ReactNode }) {
  const scope = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Registered here, not at module scope: this file is still evaluated on
      // the server during SSR, and plugins touch the DOM.
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduced } = context.conditions as {
            motion: boolean;
            reduced: boolean;
          };

          const heroSteps = gsap.utils.toArray<HTMLElement>("[data-hero-step]");
          const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

          // Reduced motion: no travel, no scrub, no stagger choreography —
          // everything is simply present. Nothing is hidden or lost.
          if (reduced) {
            gsap.set([...heroSteps, ...reveals], { opacity: 1, y: 0 });
            return;
          }

          // Hero entrance — the one cinematic moment, once per load.
          gsap.set(heroSteps, { opacity: 0, y: 18 });
          gsap.to(heroSteps, {
            opacity: 1,
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            stagger: 0.075,
            delay: 0.06,
          });

          // Section reveals — one batched trigger for the whole document.
          gsap.set(reveals, { opacity: 0, y: 14 });
          ScrollTrigger.batch(reveals, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.06,
                overwrite: true,
              }),
          });
        }
      );

      // useGSAP reverts the context on unmount, which kills every tween and
      // ScrollTrigger created inside it.
      return () => mm.revert();
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
