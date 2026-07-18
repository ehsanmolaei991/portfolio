"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IsoLevelWarpProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line color as an "R, G, B" string (no rgb() wrapper). */
  color?: string;
  /** Animation speed multiplier. Default 1. */
  speed?: number;
  /** Grid density. Lower = larger cells. Default 40. */
  density?: number;
  /** Radius (px) the pointer influences. Default 280. */
  interactionRadius?: number;
}

/**
 * Animated line grid that warps smoothly toward the pointer. No glow / light —
 * purely the geometry of the lines easing under the cursor, plus a faint
 * ambient breathing so it stays alive when idle. Reduced-motion => static.
 */
const IsoLevelWarp = ({
  className,
  color = "14, 165, 233",
  speed = 1,
  density = 40,
  interactionRadius = 280,
  ...props
}: IsoLevelWarpProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let animationFrameId = 0;
    const gap = density;
    const maxDist = interactionRadius;
    let time = 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pointer state in canvas CSS pixels. `s` eases 0..1 so the warp fades in
    // and out smoothly as the pointer enters / leaves.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false, s: 0 };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let cols = 0;
    let rows = 0;
    let rowPts: Float32Array[] = [];
    const rebuild = () => {
      cols = Math.ceil(width / gap) + 5;
      rows = Math.ceil(height / gap) + 5;
      rowPts = Array.from(
        { length: rows + 1 },
        () => new Float32Array((cols + 1) * 2)
      );
    };

    // Window-level tracking so the grid reacts even under the hero content.
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    const computeGrid = () => {
      for (let y = 0; y <= rows; y++) {
        const row = rowPts[y];
        for (let x = 0; x <= cols; x++) {
          const baseX = x * gap - gap * 2;
          const baseY = y * gap - gap * 2;
          const wave = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 10;

          let fx = baseX;
          let fy = baseY + wave;

          if (mouse.s > 0.001) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDist) {
              const t = 1 - dist / maxDist;
              const f = t * t * t * mouse.s; // smooth eased falloff
              const ang = Math.atan2(dy, dx);
              fx += Math.cos(ang) * f * 14;
              fy += Math.sin(ang) * f * 14 - f * 85;
            }
          }
          const i = x * 2;
          row[i] = fx;
          row[i + 1] = fy;
        }
      }
    };

    const tracePath = () => {
      ctx.beginPath();
      for (let y = 0; y <= rows; y++) {
        const row = rowPts[y];
        ctx.moveTo(row[0], row[1]);
        for (let x = 1; x <= cols; x++) {
          ctx.lineTo(row[x * 2], row[x * 2 + 1]);
        }
      }
    };

    const strokeGrid = (alphaCenter: number) => {
      tracePath();
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, `rgba(${color}, 0)`);
      grad.addColorStop(0.5, `rgba(${color}, ${alphaCenter})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const draw = () => {
      // Smooth, eased following — no snapping.
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.s += ((mouse.on ? 1 : 0) - mouse.s) * 0.08;
      time += 0.01 * speed;

      ctx.clearRect(0, 0, width, height);
      computeGrid();
      strokeGrid(0.5);

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    rebuild();

    if (reduce) {
      const render = () => {
        resize();
        rebuild();
        computeGrid();
        strokeGrid(0.4);
      };
      render();
      window.addEventListener("resize", render);
      return () => window.removeEventListener("resize", render);
    }

    const onResize = () => {
      resize();
      rebuild();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed, density, interactionRadius]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden bg-background", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Vignette fades to the current theme background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)] opacity-80 pointer-events-none" />
    </div>
  );
};

export default IsoLevelWarp;
