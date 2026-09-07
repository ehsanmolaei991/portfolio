"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/** Mirrors --ease-out in globals.css; WAAPI cannot read a custom property. */
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Theme toggle with a circular View Transition reveal expanding from the
 * button itself, so the new theme visibly comes *from* the control you pressed.
 *
 * Progressive enhancement, in this order:
 *   1. reduced motion, or no View Transition support → plain instant swap
 *   2. otherwise → clip-path circle wipe over ::view-transition-new(root)
 *
 * The theme is always set through next-themes (never by toggling the class by
 * hand), so persistence, the system preference, and SSR stay consistent —
 * `flushSync` forces React to commit inside the transition callback so the
 * snapshot captures the new theme.
 *
 * Both icons are always in the markup and `.theme-icon` in globals.css shows
 * the one for the current theme class, so the right icon is there at first
 * paint with no script. The swap is a WAAPI animation rather than a CSS
 * transition because next-themes suppresses transitions while it flips the
 * class (`disableTransitionOnChange`).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { play } = useSound();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const sunRef = React.useRef<HTMLSpanElement>(null);
  const moonRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} theme`
    : "Switch color theme";

  const onToggle = React.useCallback(() => {
    const next = isDark ? "light" : "dark";
    play("toggle");

    const doc = document as ViewTransitionDocument;
    const button = buttonRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The old icon turns out one way while the new one turns in from the other.
    const swapIcons = () => {
      const [outgoing, incoming] = isDark
        ? [sunRef.current, moonRef.current]
        : [moonRef.current, sunRef.current];
      const timing = { duration: 160, easing: EASE_OUT };
      outgoing?.animate(
        [
          { opacity: 1, transform: "none" },
          { opacity: 0, transform: "rotate(35deg) scale(0.7)" },
        ],
        timing
      );
      incoming?.animate(
        [
          { opacity: 0, transform: "rotate(-35deg) scale(0.7)" },
          { opacity: 1, transform: "none" },
        ],
        timing
      );
    };

    if (!doc.startViewTransition || reduced || !button) {
      setTheme(next);
      if (!reduced) swapIcons();
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
      swapIcons();
    });

    transition.ready
      .then(() => {
        const { top, left, width, height } = button.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        // Farthest viewport corner from the button — the circle must cover it.
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: EASE_OUT,
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* transition was skipped — the theme is already applied */
      });
  }, [isDark, play, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      onClick={onToggle}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-md",
        "text-foreground transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-accent",
        className
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <span ref={moonRef} className="theme-icon theme-icon--moon">
          <Moon className="h-[18px] w-[18px]" aria-hidden />
        </span>
        <span ref={sunRef} className="theme-icon theme-icon--sun">
          <Sun className="h-[18px] w-[18px]" aria-hidden />
        </span>
      </span>
    </button>
  );
}
