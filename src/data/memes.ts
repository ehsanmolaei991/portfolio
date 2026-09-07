import type { MemeArtKey } from "@/components/meme-art";

/**
 * Hover memes — the personality budget for the whole site.
 *
 * Deliberately small and confined to the light-hearted regions: capability
 * headings, the email CTA, the PDF link. They never appear on the case studies
 * or the outcome figures, because a joke next to a number reads as a hedge.
 *
 * Add an entry here, then mark an element with `data-meme="<id>"`.
 *
 * Related: `data-cursor="<word>"` turns the pointer into a labelled disc. Only
 * put it on *large* targets — the disc is 84px and will sit on top of a small
 * button, hiding the label you are about to click.
 * To use a real image instead of the built-in line art, drop the file in
 * /public/memes/ and set `src` — it wins over `art`.
 */
export interface Meme {
  id: string;
  caption: string;
  art: MemeArtKey;
  /** e.g. "/memes/deploy-friday.png". Overrides `art` when set. */
  src?: string;
  /** Required whenever `src` is set. */
  alt?: string;
}

export const memes: Meme[] = [
  {
    id: "any",
    art: "any",
    caption: "`any` — the fastest way to ship a bug with full type coverage.",
  },
  {
    id: "live",
    art: "live",
    caption: "The socket is fine. The socket is fine. The socket is fine.",
  },
  {
    id: "buttons",
    art: "conflict",
    caption: "Six engineers. Six buttons. One of them is a div.",
  },
  {
    id: "machine",
    art: "machine",
    caption: "Ships at 60fps. On my laptop. Plugged in. In airplane mode.",
  },
  {
    id: "pipeline",
    art: "coffee",
    caption: "The pipeline is green and nobody is entirely sure why.",
  },
  {
    id: "ship",
    art: "ship",
    caption: "Standup was ten minutes. That's the win I'm claiming today.",
  },
  {
    id: "agent",
    art: "machine",
    caption: "Prompt: \"make it work\". Diff: 4,000 lines. Review: still my job.",
  },
  {
    id: "email",
    art: "ship",
    caption: "No cover letter required. Replies faster than most CI runs.",
  },
  {
    id: "pdf",
    art: "machine",
    caption: "A real PDF with selectable text. Not a screenshot of a .docx.",
  },
];

const byId = new Map(memes.map((m) => [m.id, m]));

export function getMeme(id: string): Meme | undefined {
  return byId.get(id);
}
