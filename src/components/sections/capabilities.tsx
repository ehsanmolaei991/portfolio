import { siteCopy } from "@/data/site";

/**
 * Grouped and given a reason, rather than a flat wall of chips. The note under
 * each heading is the point: it says how the tools are chosen, which is the
 * part a list of logos cannot communicate.
 */
export function Capabilities() {
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {siteCopy.capabilities.map((group) => (
        <li
          key={group.title}
          data-reveal
          className="border-t border-border pt-5"
        >
          <h3
            data-meme={group.meme}
            className="inline-block font-sans text-body font-semibold tracking-normal text-foreground"
          >
            {group.title}
          </h3>
          <p className="mt-1 max-w-prose text-small text-muted-foreground">
            {group.note}
          </p>
          <p className="mt-3 font-mono text-micro leading-relaxed text-muted-foreground">
            {group.items.join("  ·  ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
