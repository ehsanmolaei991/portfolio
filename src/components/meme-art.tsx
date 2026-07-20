/**
 * Original line-art for the hover memes.
 *
 * Drawn here rather than downloaded: the recognisable meme images are all
 * someone's copyrighted work, and a personal site is exactly the place that
 * gets away with it right up until it doesn't. These are mine, they are ~1 kB
 * each, they need no network, and they inherit the theme through
 * `currentColor` — a raster meme could do none of that.
 *
 * To use a real image instead, drop it in /public/memes/ and set `src` on the
 * entry in src/data/memes.ts; the registry prefers `src` when present.
 */

type ArtProps = { className?: string };

const svg = {
  viewBox: "0 0 160 120",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A box labelled `any`, quietly on fire. */
export function AnyArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <rect x="34" y="46" width="92" height="52" rx="4" opacity="0.55" />
      <text
        x="80"
        y="79"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="20"
        stroke="none"
        fill="currentColor"
      >
        any
      </text>
      <g className="text-accent">
        <path d="M56 42c0-8 8-10 6-18 7 4 11 10 11 18" />
        <path d="M92 42c0-6 6-8 4-14 6 3 9 8 9 14" />
      </g>
      <path d="M20 104h120" opacity="0.35" />
    </svg>
  );
}

/** Two nodes and a live wire between them. */
export function LiveArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <circle cx="30" cy="60" r="12" opacity="0.6" />
      <circle cx="130" cy="60" r="12" opacity="0.6" />
      <path
        className="text-accent"
        d="M44 60h14l8-14 10 28 10-28 8 14h12"
      />
      <circle className="text-accent" cx="30" cy="60" r="4" fill="currentColor" stroke="none" />
      <circle cx="130" cy="60" r="4" fill="currentColor" stroke="none" opacity="0.5" />
      <path d="M24 92h112" opacity="0.25" />
    </svg>
  );
}

/** Six buttons, all slightly different. */
export function ConflictArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <rect x="18" y="30" width="38" height="20" rx="10" opacity="0.55" />
      <rect x="64" y="30" width="38" height="20" rx="3" opacity="0.55" />
      <rect x="110" y="30" width="34" height="20" rx="6" opacity="0.55" />
      <rect x="18" y="66" width="38" height="20" rx="2" opacity="0.55" />
      <rect
        className="text-accent"
        x="64"
        y="66"
        width="38"
        height="20"
        rx="10"
        strokeDasharray="4 3"
      />
      <rect x="110" y="66" width="34" height="20" rx="9" opacity="0.55" />
    </svg>
  );
}

/** A laptop wearing a medal. */
export function MachineArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <path d="M42 38h76v42H42z" opacity="0.6" />
      <path d="M30 88h100l-8-8H38z" opacity="0.6" />
      <path className="text-accent" d="M60 60l10 10 20-22" />
      <circle className="text-accent" cx="122" cy="34" r="12" />
      <path className="text-accent" d="M118 34l3 3 6-7" />
    </svg>
  );
}

/** Coffee, with a loading spinner for steam. */
export function CoffeeArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <path d="M46 54h56v30a14 14 0 01-14 14H60a14 14 0 01-14-14z" opacity="0.6" />
      <path d="M102 62h10a10 10 0 010 20h-10" opacity="0.6" />
      <g className="text-accent">
        <path d="M64 42c0-6 8-6 8-12" strokeDasharray="3 4" />
        <path d="M82 42c0-6 8-6 8-12" strokeDasharray="3 4" />
      </g>
      <path d="M36 104h88" opacity="0.3" />
    </svg>
  );
}

/** A paper boat, shipping. */
export function ShipArt({ className }: ArtProps) {
  return (
    <svg {...svg} className={className} role="presentation">
      <path className="text-accent" d="M80 26v30" />
      <path className="text-accent" d="M80 30l24 12-24 10z" />
      <path d="M44 60h72l-14 22H58z" opacity="0.65" />
      <path d="M24 92c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0 14-5 22 0" opacity="0.4" />
      <path d="M24 104c8-5 14-5 22 0s14 5 22 0" opacity="0.25" />
    </svg>
  );
}

export const MEME_ART = {
  any: AnyArt,
  live: LiveArt,
  conflict: ConflictArt,
  machine: MachineArt,
  coffee: CoffeeArt,
  ship: ShipArt,
} as const;

export type MemeArtKey = keyof typeof MEME_ART;
