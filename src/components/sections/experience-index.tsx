import { formatRange } from "@lib/date";
import type { Experience } from "@lib/resume";

/**
 * The full timeline as an index, not a grid of cards: dates in the meta rail,
 * role and company in the content column, one line of substance each. Anything
 * deeper belongs in the case study or the résumé.
 */
export function ExperienceIndex({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <ol className="border-t border-border">
      {experiences.map((exp, i) => (
        <li
          key={`${exp.company.name}-${exp.startDate}-${i}`}
          data-reveal
          className="border-b border-border py-6"
        >
          <div className="grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
            <p className="font-mono text-micro uppercase tabular-nums text-muted-foreground sm:pt-1">
              {formatRange(exp.startDate, exp.endDate, "Now", "short")}
            </p>

            <div>
              <h3 className="font-sans text-body font-semibold tracking-normal text-foreground">
                {exp.position}
              </h3>

              <p className="mt-1 text-small text-muted-foreground">
                {exp.company.href ? (
                  <a
                    href={exp.company.href}
                    className="link-rule text-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {exp.company.name}
                  </a>
                ) : (
                  <span className="text-foreground">{exp.company.name}</span>
                )}
                {exp.location ? (
                  <>
                    <span aria-hidden className="mx-2 text-border-strong">
                      ·
                    </span>
                    {exp.location}
                  </>
                ) : null}
              </p>

              {exp.achievements[0] ? (
                <p className="mt-3 max-w-prose text-small text-muted-foreground">
                  {exp.achievements[0].value}
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
