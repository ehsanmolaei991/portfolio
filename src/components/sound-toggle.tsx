"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/sound-provider";
import { cn } from "@/lib/utils";

/**
 * The only control for the sound system. Hidden entirely when sound is not
 * offered (coarse pointer, reduced motion, or no Web Audio) rather than shown
 * disabled — a dead control is worse than no control.
 */
export function SoundToggle({ className }: { className?: string }) {
  const { enabled, ready, available, setEnabled, play } = useSound();

  if (!ready || !available) return null;

  const label = `Sound effects: ${enabled ? "on" : "off"}. Turn ${
    enabled ? "off" : "on"
  }.`;

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      onClick={() => {
        const next = !enabled;
        setEnabled(next);
        // Confirm the new state audibly, but only when turning sound *on*.
        if (next) window.setTimeout(() => play("confirm"), 40);
      }}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-md",
        "transition-colors duration-fast ease-standard hover:bg-muted hover:text-accent",
        enabled ? "text-accent" : "text-muted-foreground",
        className
      )}
    >
      {enabled ? (
        <Volume2 className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <VolumeX className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
