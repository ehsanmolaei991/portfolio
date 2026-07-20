"use client";

import * as React from "react";

/**
 * Opt-in sound identity. See design-system/portfolio-master.md §8.
 *
 * Tones are *synthesised* with the Web Audio API rather than loaded from files:
 * zero bytes shipped, zero licensing question, and nothing to preload. The
 * palette is deliberately tiny — a soft sine blip through a lowpass, at low
 * gain — so it reads as a UI tick, not a jingle.
 *
 * Rules enforced here: muted by default, unlocked only by a real user gesture,
 * persisted, cooled down, suspended when the tab is hidden, disabled on coarse
 * pointers and under reduced-motion, and fully torn down on unmount.
 */

export type SoundEvent = "toggle" | "open" | "confirm";

interface SoundContextValue {
  enabled: boolean;
  /** null until the client has read localStorage — avoids a hydration mismatch. */
  ready: boolean;
  available: boolean;
  setEnabled: (next: boolean) => void;
  play: (event: SoundEvent) => void;
}

const SoundContext = React.createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "em.sound";
const COOLDOWN_MS = 180;

/** Frequencies in Hz, durations in seconds. Kept short and quiet on purpose. */
const VOICES: Record<SoundEvent, { freq: number[]; dur: number; gain: number }> =
  {
    toggle: { freq: [523.25, 783.99], dur: 0.09, gain: 0.05 },
    open: { freq: [392.0], dur: 0.07, gain: 0.04 },
    confirm: { freq: [659.25, 987.77], dur: 0.11, gain: 0.055 },
  };

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [available, setAvailable] = React.useState(false);

  const ctxRef = React.useRef<AudioContext | null>(null);
  const lastPlayedRef = React.useRef(0);

  // Decide whether sound is offered at all, then restore the saved preference.
  React.useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supported =
      typeof window.AudioContext !== "undefined" ||
      typeof (window as { webkitAudioContext?: unknown }).webkitAudioContext !==
        "undefined";

    const offer = finePointer && !reduced && supported;
    setAvailable(offer);

    if (offer) {
      try {
        setEnabledState(window.localStorage.getItem(STORAGE_KEY) === "on");
      } catch {
        /* private mode — stay muted */
      }
    }
    setReady(true);
  }, []);

  // Suspend audio while the tab is in the background.
  React.useEffect(() => {
    const onVisibility = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden) void ctx.suspend();
      else if (enabled) void ctx.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  // Tear the graph down on unmount.
  React.useEffect(() => {
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  const setEnabled = React.useCallback((next: boolean) => {
    setEnabledState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    // Browsers only allow an AudioContext to start inside a user gesture, and
    // this setter is only ever called from a click handler.
    if (next && !ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    if (next) void ctxRef.current?.resume();
    else void ctxRef.current?.suspend();
  }, []);

  const play = React.useCallback(
    (event: SoundEvent) => {
      const ctx = ctxRef.current;
      if (!enabled || !ctx || ctx.state === "closed") return;

      const now = performance.now();
      if (now - lastPlayedRef.current < COOLDOWN_MS) return;
      lastPlayedRef.current = now;

      const voice = VOICES[event];
      const t0 = ctx.currentTime;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2400;
      filter.connect(ctx.destination);

      voice.freq.forEach((frequency, i) => {
        const start = t0 + i * 0.055;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = frequency;

        // Fast attack, exponential decay — a tick, never a beep.
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(voice.gain, start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + voice.dur);

        osc.connect(gain);
        gain.connect(filter);
        osc.start(start);
        osc.stop(start + voice.dur + 0.02);
        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      });
    },
    [enabled]
  );

  const value = React.useMemo(
    () => ({ enabled, ready, available, setEnabled, play }),
    [enabled, ready, available, setEnabled, play]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = React.useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used inside <SoundProvider>");
  }
  return ctx;
}
