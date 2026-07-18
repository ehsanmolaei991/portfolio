"use client";

import * as React from "react";

/**
 * Playful hover memes: any element with a `data-meme="🦕|caption"` attribute
 * pops an emoji + caption bubble that trails the cursor while hovered.
 * Global (mounted once), pointer-fine only, and it positions instantly for
 * reduced-motion users. Format: "<emoji>|<caption>".
 */
export function MemeLayer() {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const bubbleRef = React.useRef<HTMLDivElement>(null);
  const emojiRef = React.useRef<HTMLSpanElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const layer = layerRef.current;
    const bubble = bubbleRef.current;
    const emojiEl = emojiRef.current;
    const textEl = textRef.current;
    if (!layer || !bubble || !emojiEl || !textEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.2;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lx = mx;
    let ly = my;
    let raf = 0;
    let started = false;
    let lastEl: Element | null = null;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        lx = mx;
        ly = my;
      }
      const el = (e.target as Element)?.closest?.("[data-meme]") ?? null;
      if (el !== lastEl) {
        lastEl = el;
        if (el) {
          const raw = el.getAttribute("data-meme") ?? "";
          const i = raw.indexOf("|");
          emojiEl.textContent = i >= 0 ? raw.slice(0, i) : "😎";
          textEl.textContent = i >= 0 ? raw.slice(i + 1) : raw;
          bubble.dataset.show = "1";
        } else {
          bubble.dataset.show = "0";
        }
      }
    };

    const hide = () => {
      lastEl = null;
      bubble.dataset.show = "0";
    };

    const animate = () => {
      lx += (mx - lx) * ease;
      ly += (my - ly) * ease;
      layer.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="meme-layer" aria-hidden>
      <div ref={bubbleRef} className="meme-bubble" data-show="0">
        <span ref={emojiRef} className="meme-emoji" />
        <span ref={textRef} />
      </div>
    </div>
  );
}
