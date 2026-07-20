"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

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
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { play } = useSound();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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

    if (!doc.startViewTransition || reduced || !button) {
      setTheme(next);
      return;
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
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
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
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
        <AnimatePresence initial={false} mode="wait">
          {mounted ? (
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 block"
            >
              {isDark ? (
                <Sun className="h-[18px] w-[18px]" aria-hidden />
              ) : (
                <Moon className="h-[18px] w-[18px]" aria-hidden />
              )}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </button>
  );
}
