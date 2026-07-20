import { cn } from "@/lib/utils";

/**
 * The editorial section shell: a hairline rule, a numbered eyebrow, one line of
 * microcopy, and the content column. Structure comes from the rule and the
 * whitespace — there is no card, no fill, no shadow.
 */
export function Section({
  id,
  index,
  title,
  note,
  children,
  className,
}: {
  id: string;
  /** Two-digit index shown in the meta rail, e.g. "01". */
  index: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("border-t border-border pt-block", className)}
    >
      <div className="grid gap-block lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        <div data-reveal className="lg:pt-1">
          {/* Stacked rather than inline: "01 / SELECTED WORK" wrapped badly in
              the 10rem rail, and a deliberate two-line mark reads better than
              an accidental one. */}
          <p className="font-mono text-micro uppercase text-muted-foreground">
            <span className="tabular-nums">{index}</span>
            <span className="mt-1.5 block">{title}</span>
          </p>
        </div>

        <div>
          <h2
            id={`${id}-heading`}
            data-reveal
            className="max-w-prose text-h2 text-foreground"
          >
            {note ?? title}
          </h2>
          <div className="mt-block">{children}</div>
        </div>
      </div>
    </section>
  );
}
