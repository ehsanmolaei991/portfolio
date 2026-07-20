import { ArrowUpRight } from "lucide-react";
import { SoundLink } from "@/components/sound-link";
import { getFeaturedProjects, getOtherProjects } from "@/data/projects";

/**
 * Evidence, not cards. Each entry states what the thing is, my role, the
 * measured outcome, and the stack — then gets out of the way. The whole row is
 * one link target, but the visible affordance never depends on hover.
 */
export function SelectedWork() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <>
      <ul className="border-t border-border">
        {featured.map((project, i) => (
          <li key={project.slug} data-reveal className="border-b border-border">
            <SoundLink
              href={`/work/${project.slug}`}
              data-cursor="case study"
              className="group flex flex-col gap-5 py-8 transition-colors duration-fast ease-standard sm:flex-row sm:gap-10"
            >
              <span
                aria-hidden
                className="font-mono text-micro tabular-nums text-muted-foreground sm:pt-1.5"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-serif text-h3 text-foreground link-rule">
                    {project.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
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

                {/* Live URLs are hidden in the preview for now — the section
                    reads as description only. The links are still rendered on
                    each case study's "Live" block, and `project.links` still
                    carries them, so restoring this is uncommenting it.

                {project.links.length > 0 ? (
                  <span className="mt-5 flex flex-wrap items-center gap-x-2 font-mono text-micro text-accent">
                    {project.links.map((link, n) => (
                      <span key={link.href}>
                        {n > 0 ? (
                          <span aria-hidden className="mr-2 text-border-strong">
                            ·
                          </span>
                        ) : null}
                        {link.label}
                      </span>
                    ))}
                  </span>
                ) : null}

                */}

                <span className="mt-5 block font-mono text-micro text-muted-foreground">
                  {project.stack.slice(0, 6).join("  ·  ")}
                </span>
              </span>
            </SoundLink>
          </li>
        ))}
      </ul>

      {others.length > 0 ? (
        <div data-reveal className="mt-block">
          <h3 className="font-mono text-micro uppercase text-muted-foreground">
            Also shipped
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {others.map((project) => (
              <li key={project.slug}>
                <SoundLink
                  href={`/work/${project.slug}`}
                  className="group inline-flex min-h-[44px] flex-wrap items-center gap-x-3 text-body text-foreground"
                >
                  <span className="link-rule">{project.name}</span>
                  <span className="text-small text-muted-foreground">
                    {project.premise}
                  </span>
                </SoundLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
