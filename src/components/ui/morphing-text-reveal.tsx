"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MorphingTextRevealProps {
  /** Strings to cycle through. */
  texts: string[];
  className?: string;
  /** Milliseconds each text stays before morphing to the next. Default 3000. */
  interval?: number;
  /** Re-run the scramble when the user hovers. Default false. */
  glitchOnHover?: boolean;
  /** Glyphs used while a character is still "resolving". */
  charset?: string;
}

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#";

/**
 * Cycles through `texts`, morphing between them with a per-character scramble
 * ("text decode") effect. Zero dependencies, respects prefers-reduced-motion,
 * and is SSR-safe (first paint renders texts[0] verbatim).
 */
export function MorphingTextReveal({
  texts,
  className,
  interval = 3000,
  glitchOnHover = false,
  charset = DEFAULT_CHARSET,
}: MorphingTextRevealProps) {
  const first = texts[0] ?? "";
  const [display, setDisplay] = React.useState(first);

  const displayRef = React.useRef(first);
  const indexRef = React.useRef(0);
  const frameRef = React.useRef(0);
  const rafRef = React.useRef<number>();
  const queueRef = React.useRef<
    { from: string; to: string; start: number; end: number; char?: string }[]
  >([]);
  const reducedRef = React.useRef(false);

  const randChar = React.useCallback(
    () => charset[Math.floor(Math.random() * charset.length)],
    [charset]
  );

  const runFrame = React.useCallback(() => {
    let output = "";
    let complete = 0;
    const queue = queueRef.current;

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (frameRef.current >= item.end) {
        complete++;
        output += item.to;
      } else if (frameRef.current >= item.start) {
        if (!item.char || Math.random() < 0.28) item.char = randChar();
        output += item.char;
      } else {
        output += item.from;
      }
    }

    displayRef.current = output;
    setDisplay(output);

    if (complete !== queue.length) {
      frameRef.current++;
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, [randChar]);

  const scrambleTo = React.useCallback(
    (next: string) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (reducedRef.current) {
        displayRef.current = next;
        setDisplay(next);
        return;
      }

      const oldText = displayRef.current;
      const length = Math.max(oldText.length, next.length);
      const queue: typeof queueRef.current = [];
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from: oldText[i] ?? "", to: next[i] ?? "", start, end });
      }
      queueRef.current = queue;
      frameRef.current = 0;
      rafRef.current = requestAnimationFrame(runFrame);
    },
    [runFrame]
  );

  // Auto-cycle through the texts.
  React.useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (texts.length <= 1) return;

    const id = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % texts.length;
      scrambleTo(texts[indexRef.current]);
    }, interval);

    return () => {
      window.clearInterval(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts, interval, scrambleTo]);

  const handleHover = React.useCallback(() => {
    if (glitchOnHover) scrambleTo(texts[indexRef.current] ?? display);
  }, [glitchOnHover, scrambleTo, texts, display]);

  return (
    <span
      onMouseEnter={handleHover}
      className={cn("inline-block whitespace-pre tabular-nums", className)}
      aria-label={texts[indexRef.current]}
    >
      {display}
    </span>
  );
}

export default MorphingTextReveal;
