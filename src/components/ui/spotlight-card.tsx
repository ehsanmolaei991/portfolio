"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * Card with a pointer-following interactive grid + glow. Tracks the cursor via
 * CSS custom properties (--mx/--my), so the reveal is a pure CSS mask — cheap,
 * and it only paints on hover.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLElement>(null);

  const onMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={cn("spotlight-card group relative overflow-hidden", className)}
      {...props}
    >
      <span className="spotlight-card__grid" aria-hidden />
      <span className="spotlight-card__glow" aria-hidden />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
