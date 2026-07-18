"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}=+*^?#";

interface ScrambleTextProps {
  /** The final text; it decodes to this on hover. */
  text: string;
  className?: string;
  /** Also decode once on mount. Default false (hover only). */
  revealOnMount?: boolean;
}

/**
 * Decodes its text with a per-character scramble whenever hovered — the same
 * playful effect as the hero tagline, packaged for links, labels and chips.
 * Respects prefers-reduced-motion and is SSR-safe (renders `text` verbatim).
 */
export function ScrambleText({
  text,
  className,
  revealOnMount = false,
}: ScrambleTextProps) {
  const [display, setDisplay] = React.useState(text);
  const rafRef = React.useRef<number>();
  const frameRef = React.useRef(0);
  const queueRef = React.useRef<
    { char: string; start: number; end: number; scrambled?: string }[]
  >([]);
  const reduceRef = React.useRef(false);

  const run = React.useCallback(() => {
    let out = "";
    let done = 0;
    const queue = queueRef.current;
    for (const item of queue) {
      if (frameRef.current >= item.end) {
        done++;
        out += item.char;
      } else if (frameRef.current >= item.start) {
        if (!item.scrambled || Math.random() < 0.28) {
          item.scrambled = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        out += item.scrambled;
      } else {
        out += item.char;
      }
    }
    setDisplay(out);
    if (done !== queue.length) {
      frameRef.current++;
      rafRef.current = requestAnimationFrame(run);
    }
  }, []);

  const start = React.useCallback(() => {
    if (reduceRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    queueRef.current = Array.from(text, (char) => {
      const s = Math.floor(Math.random() * 16);
      return { char, start: s, end: s + Math.floor(Math.random() * 22) };
    });
    frameRef.current = 0;
    rafRef.current = requestAnimationFrame(run);
  }, [text, run]);

  React.useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setDisplay(text);
    if (revealOnMount) start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      onMouseEnter={start}
      className={cn("inline-block whitespace-pre", className)}
    >
      {display}
    </span>
  );
}

export default ScrambleText;
