"use client";

import { Pointer } from "@/components/pointer";
import { MemeHover } from "@/components/meme-hover";

/**
 * The two GSAP-driven layers, in their own chunk. Only <PointerEffects />
 * imports this, and only once it knows the visitor can use them.
 */
export default function PointerLayers() {
  return (
    <>
      <Pointer />
      <MemeHover />
    </>
  );
}
