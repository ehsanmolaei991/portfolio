import { siteCopy } from "@/data/site";
import type { Education, MiscGroup } from "@lib/resume";

export function About({
  educations,
  misc,
}: {
  educations: Education[];
  misc?: MiscGroup[];
}) {
  const languages = misc?.find((group) => group.id === "LANG");

  return (
    <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
      <div data-reveal className="max-w-prose">
        {siteCopy.about.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="mb-5 text-body text-muted-foreground last:mb-0 [&:first-child]:text-lead [&:first-child]:text-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <aside data-reveal className="lg:border-l lg:border-border lg:pl-8">
        <dl className="text-small">
          <dt className="font-mono text-micro uppercase text-muted-foreground">
            Education
          </dt>
          {educations.map((edu) => (
            <dd key={edu.degree} className="mt-2 mb-6 text-foreground">
              {edu.degree}
              <span className="mt-0.5 block text-muted-foreground">
                {edu.location}
              </span>
            </dd>
          ))}

          {languages ? (
            <>
              <dt className="font-mono text-micro uppercase text-muted-foreground">
                {languages.title}
              </dt>
              {languages.list.map((item) => (
                <dd key={item.title} className="mt-2 text-foreground">
                  {item.title}
                  {item.level ? (
                    <span className="text-muted-foreground">{` — ${item.level}`}</span>
                  ) : null}
                </dd>
              ))}
            </>
          ) : null}
        </dl>
      </aside>
    </div>
  );
}
