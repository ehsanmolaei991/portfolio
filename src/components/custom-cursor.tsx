"use client";

import * as React from "react";

/**
 * Global custom cursor: a precise dot + a smooth trailing ring.
 * - Ring lerps toward the pointer and expands over interactive targets.
 * - Uses mix-blend-difference, so white marks invert against any background
 *   (works in both light and dark themes).
 * - Only enabled for fine pointers (mouse) and when reduced-motion is off;
 *   falls back to the native cursor otherwise.
 * - Add `data-cursor="hide"` to any element to suppress it (e.g. the hero name,
 *   which has its own magnetic reveal), or `data-cursor="pointer"` to force the
 *   hover/expanded state.
 */
export function CustomCursor() {
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  // Decide whether to run at all (mouse present, motion allowed).
  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
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
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add("cursor-none-all");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const applyTarget = (target: Element | null) => {
      const hidden = !!target?.closest('[data-cursor="hide"]');
      const interactive = !!target?.closest(
        'a, button, [role="button"], label, summary, input, textarea, select, [data-cursor="pointer"]'
      );
      const state = hidden ? "hidden" : interactive ? "hover" : "default";
      ring.dataset.state = state;
      dot.dataset.state = hidden ? "hidden" : "default";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (!shown) {
        shown = true;
        ring.dataset.show = "1";
        dot.dataset.show = "1";
      }
      applyTarget(e.target as Element);
    };
    const hide = () => {
      ring.dataset.show = "0";
      dot.dataset.show = "0";
    };
    const show = () => {
      ring.dataset.show = "1";
      dot.dataset.show = "1";
    };
    const onDown = () => (ring.dataset.down = "1");
    const onUp = () => (ring.dataset.down = "0");

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-none-all");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} data-show="0" className="cursor-ring-layer">
        <i />
      </div>
      <div ref={dotRef} data-show="0" className="cursor-dot-layer">
        <i />
      </div>
    </>
  );
}
