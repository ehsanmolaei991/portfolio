"use client";

import * as React from "react";
import dynamic from "next/dynamic";

/**
 * Gate for the decorative pointer layers (custom pointer + hover meme card).
 *
 * They only make sense on a fine pointer with motion allowed, so that is the
 * only case in which their code — and GSAP, which nothing else on the page
 * needs — is downloaded at all. Both media queries are live, so plugging in a
 * mouse or turning reduced motion on takes effect immediately.
 */
const PointerLayers = dynamic(() => import("@/components/pointer-layers"), {
  ssr: false,
});

export function PointerEffects() {
  const [enabled, setEnabled] = React.useState(false);

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

  return enabled ? <PointerLayers /> : null;
}
