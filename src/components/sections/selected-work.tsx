import { ArrowUpRight } from "lucide-react";
import { SoundLink } from "@/components/sound-link";
import {
  getFeaturedProjects,
  getOtherProjects,
  getProjectTarget,
  type Project,
} from "@/data/projects";

/**
 * Evidence, not cards. Each entry states what the thing is, my role, the
 * measured outcome, and the stack — then gets out of the way.
 *
 * Where an entry goes depends on whether there is anything to go *to*:
 * a project with a real case study opens its page; everything else opens the
 * live site directly. A thin case study invites a click and spends it on
 * nothing, so those simply do not exist (see `caseStudy` in data/projects.ts).
 * The destination is always visible in the row — either "Case study" or the
 * domain — so nobody is surprised by where they land.
 */

/** Wraps the row in whichever kind of link the project warrants. */
function ProjectRow({
  project,
  className,
  children,
}: {
  project: Project;
  className: string;
  children: React.ReactNode;
}) {
  const target = getProjectTarget(project);

  if (target.kind === "internal") {
    return (
      <SoundLink href={target.href} data-cursor="case study" className={className}>
        {children}
      </SoundLink>
    );
  }

  if (target.kind === "external") {
    return (
      <a
        href={target.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="visit site"
        className={className}
      >
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
}

/** "Case study" or the destination domain — never an unlabelled arrow. */
function Destination({ project }: { project: Project }) {
  const target = getProjectTarget(project);
  if (target.kind === "none") return null;

  return (
    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-micro uppercase text-accent">
      {target.kind === "internal" ? "Case study" : target.label}
      <ArrowUpRight
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-fast ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </span>
  );
}

export function SelectedWork() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <>
      <ul className="border-t border-border">
        {featured.map((project, i) => (
          <li key={project.slug} data-reveal className="border-b border-border">
            <ProjectRow
              project={project}
              className="group flex flex-col gap-5 py-8 transition-colors duration-fast ease-standard sm:flex-row sm:gap-10"
            >
              <span
                aria-hidden
                className="font-mono text-micro tabular-nums text-muted-foreground sm:pt-1.5"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex-1">
                <span className="font-serif text-h3 text-foreground link-rule">
                  {project.name}
                </span>

                <span className="mt-2 block max-w-prose text-body text-muted-foreground">
                  {project.premise}
                </span>

                <span className="mt-4 block font-mono text-micro uppercase text-muted-foreground">
                  {project.role}
                  <span aria-hidden className="mx-2 text-border-strong">
                    ·
                  </span>
                  <span className="tabular-nums">{project.period}</span>
                </span>

                {project.outcomes.length > 0 ? (
                  <span className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                    {project.outcomes.slice(0, 3).map((outcome) => (
                      <span key={outcome.label} className="block">
                        <span className="block font-mono text-h3 tabular-nums text-accent">
                          {outcome.value}
                        </span>
                        <span className="mt-0.5 block max-w-[22ch] text-small text-muted-foreground">
                          {outcome.label}
                        </span>
                      </span>
                    ))}
                  </span>
                ) : null}

                <span className="mt-5 block font-mono text-micro text-muted-foreground">
                  {project.stack.slice(0, 6).join("  ·  ")}
                </span>

                <Destination project={project} />
              </span>
            </ProjectRow>
          </li>
        ))}
      </ul>

      {others.length > 0 ? (
        <div data-reveal className="mt-block">
          <h3 className="font-mono text-micro uppercase text-muted-foreground">
            Also shipped
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {others.map((project) => {
              const target = getProjectTarget(project);
              const body = (
                <>
                  <span className="link-rule">{project.name}</span>
                  <span className="text-small text-muted-foreground">
                    {project.premise}
                  </span>
                  {target.kind === "external" ? (
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-fast ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  ) : null}
                </>
              );
              const className =
                "group inline-flex min-h-[44px] flex-wrap items-center gap-x-3 text-body text-foreground";

              // No live URL and no case study — say the name, don't fake a link.
              if (target.kind === "none") {
                return (
                  <li key={project.slug}>
                    <span className="flex min-h-[44px] flex-wrap items-center gap-x-3 text-body text-foreground">
                      <span>{project.name}</span>
                      <span className="text-small text-muted-foreground">
                        {project.premise}
                      </span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={project.slug}>
                  {target.kind === "internal" ? (
                    <SoundLink href={target.href} className={className}>
                      {body}
                    </SoundLink>
                  ) : (
                    <a
                      href={target.href}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                    >
                      {body}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
