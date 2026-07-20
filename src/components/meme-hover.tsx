"use client";

import * as React from "react";
import gsap from "gsap";
import { MEME_ART } from "@/components/meme-art";
import { getMeme, type Meme } from "@/data/memes";

/**
 * Shows a small card — a drawing plus one line — next to the pointer while an
 * element marked `data-meme="<id>"` is hovered.
 *
 * Mounted once, globally, so marking an element is the entire integration.
 * Position is driven by `gsap.quickTo` (no re-render per mousemove); React
 * state changes only when the hovered meme actually changes.
 *
 * Purely decorative and purely additive: `aria-hidden`, fine pointers only,
 * off under reduced motion, and nothing in it is content you would miss.
 */
export function MemeHover() {
  const [enabled, setEnabled] = React.useState(false);
  const [meme, setMeme] = React.useState<Meme | null>(null);

  const layerRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const layer = layerRef.current;
    if (!layer) return;

    const toX = gsap.quickTo(layer, "x", { duration: 0.34, ease: "power3" });
    const toY = gsap.quickTo(layer, "y", { duration: 0.34, ease: "power3" });

    let currentId: string | null = null;
    let placed = false;

    const onMove = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const host = target?.closest?.("[data-meme]") as HTMLElement | null;
      const id = host?.dataset.meme ?? null;

      if (id !== currentId) {
        currentId = id;
        const next = id ? getMeme(id) ?? null : null;
        // Drop the card at the pointer before it fades in, so it never slides
        // across the screen from wherever it was last shown.
        if (next && !placed) {
          gsap.set(layer, { x: event.clientX, y: event.clientY });
          placed = true;
        }
        if (!next) placed = false;
        setMeme(next);
      }

      if (currentId) {
        toX(event.clientX);
        toY(event.clientY);
      }
    };

    const clear = () => {
      currentId = null;
      placed = false;
      setMeme(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", clear);
    window.addEventListener("blur", clear);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", clear);
      window.removeEventListener("blur", clear);
      gsap.killTweensOf(layer);
    };
  }, [enabled]);

  if (!enabled) return null;

  const Art = meme && !meme.src ? MEME_ART[meme.art] : null;

  return (
    <div ref={layerRef} className="meme-layer" aria-hidden>
      <div ref={cardRef} className="meme-card" data-show={meme ? "1" : "0"}>
        {meme?.src ? (
          /* Decorative, fixed 200px card, never part of LCP — next/image would
             add a request pipeline for something that only ever renders on
             hover on a desktop pointer. */
          // eslint-disable-next-line @next/next/no-img-element
          <img className="meme-art" src={meme.src} alt="" />
        ) : Art ? (
          <Art className="meme-art" />
        ) : null}
        <p className="meme-caption">{meme?.caption}</p>
      </div>
    </div>
  );
}
