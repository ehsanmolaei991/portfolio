"use client";

import * as React from "react";
import gsap from "gsap";

/**
 * Custom pointer: a precise accent dot plus a ring that trails it and reacts to
 * what is underneath.
 *
 *   default          → thin ring + dot
 *   interactive      → ring opens to 62px, takes the accent
 *   [data-cursor]    → ring becomes an accent disc with that word inside
 *   pressed          → ring fills briefly
 *
 * Motion is driven by two `gsap.quickTo` setters created once — no timeline is
 * built per mousemove, and there is a single RAF (GSAP's own ticker) rather
 * than one per layer. Everything else is a CSS transition on a data attribute,
 * so state changes cost nothing.
 *
 * Guards: fine pointers only, never under `prefers-reduced-motion`, and both
 * media queries are live so plugging in a mouse (or turning reduced motion on)
 * takes effect immediately. The native cursor is only hidden while this is
 * actually running, and never over text-entry elements.
 */
export function Pointer() {
  const [enabled, setEnabled] = React.useState(false);
  const layerRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

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
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!layer || !ring || !dot || !label) return;

    document.documentElement.classList.add("has-pointer-fx");

    // Created once; called on every move. This is the whole animation engine.
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.09, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.09, ease: "power2" });

    let shown = false;

    const onMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      ringX(x);
      ringY(y);
      dotX(x);
      dotY(y);

      if (!shown) {
        shown = true;
        // Jump the ring to the pointer on first sight so it does not fly in.
        gsap.set(ring, { x, y });
        layer.dataset.visible = "1";
      }

      const target = event.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;

      if (labelled) {
        const text = labelled.dataset.cursor ?? "";
        if (label.textContent !== text) label.textContent = text;
        layer.dataset.state = "label";
        return;
      }

      const interactive = target?.closest?.(
        'a, button, [role="button"], summary, label, input, textarea, select'
      );
      layer.dataset.state = interactive ? "link" : "default";
    };

    const hide = () => {
      layer.dataset.visible = "0";
      shown = false;
    };
    const show = () => {
      layer.dataset.visible = "1";
    };
    const onDown = () => (layer.dataset.pressed = "1");
    const onUp = () => (layer.dataset.pressed = "0");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      gsap.killTweensOf([ring, dot]);
      document.documentElement.classList.remove("has-pointer-fx");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="pointer-layer" data-visible="0" aria-hidden>
      <div ref={ringRef} className="pointer-ring">
        <span ref={labelRef} className="pointer-label" />
      </div>
      <div ref={dotRef} className="pointer-dot" />
    </div>
  );
}
