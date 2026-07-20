import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, getProjectSlugs, type Project } from "@/data/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.premise,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.premise,
      url: `/work/${project.slug}`,
    },
  };
}

/** A block only exists if it has real content — nothing renders as a placeholder. */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal className="border-t border-border pt-6">
      <div className="grid gap-3 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        <h2 className="font-mono text-micro uppercase text-muted-foreground lg:pt-1.5">
          {title}
        </h2>
        <div className="max-w-prose">{children}</div>
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-body text-muted-foreground">
          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project: Project | undefined = getProject(params.slug);
  if (!project) notFound();

  return (
    <article className="pb-section pt-10">
      <Link
        href="/#work"
        className="inline-flex min-h-[44px] items-center gap-2 text-small text-muted-foreground transition-colors duration-fast ease-standard hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        All work
      </Link>

      <header className="mt-6">
        <h1 data-hero-step className="max-w-[18ch] text-h1 text-foreground">
          {project.name}
        </h1>
        <p data-hero-step className="mt-5 max-w-prose text-lead text-muted-foreground">
          {project.premise}
        </p>

        <dl
          data-hero-step
          className="mt-8 grid gap-x-10 gap-y-4 border-t border-border pt-6 sm:grid-cols-3"
        >
          <div>
            <dt className="font-mono text-micro uppercase text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 text-small text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-micro uppercase text-muted-foreground">
              Period
            </dt>
            <dd className="mt-1 text-small tabular-nums text-foreground">
              {project.period}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-micro uppercase text-muted-foreground">
              Organisation
            </dt>
            <dd className="mt-1 text-small text-foreground">
              {project.employer}
            </dd>
          </div>
        </dl>
      </header>

      {project.outcomes.length > 0 ? (
        <section
          data-reveal
          aria-label="Measured outcomes"
          className="mt-block flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-6"
        >
          {project.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <p className="font-mono text-h2 tabular-nums text-accent">
                {outcome.value}
              </p>
              <p className="mt-1 max-w-[26ch] text-small text-muted-foreground">
                {outcome.label}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      <div className="mt-block flex flex-col gap-8">
        <Block title="Context">
          <p className="text-body text-muted-foreground">{project.context}</p>
        </Block>

        {project.problem ? (
          <Block title="Problem">
            <p className="text-body text-muted-foreground">{project.problem}</p>
          </Block>
        ) : null}

        {project.decisions?.length ? (
          <Block title="Decisions">
            <List items={project.decisions} />
          </Block>
        ) : null}

        {project.implementation?.length ? (
          <Block title="Implementation">
            <List items={project.implementation} />
          </Block>
        ) : null}

        {project.reflection ? (
          <Block title="Reflection">
            <p className="text-body text-muted-foreground">
              {project.reflection}
            </p>
          </Block>
        ) : null}

        <Block title="Stack">
          <p className="font-mono text-micro leading-relaxed text-muted-foreground">
            {project.stack.join("  ·  ")}
          </p>
        </Block>

        {project.links.length > 0 ? (
          <Block title="Live">
            <ul className="flex flex-col gap-1">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[44px] flex-wrap items-center gap-x-3 text-body text-foreground"
                  >
                    <span className="link-rule font-mono text-small">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-fast ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                    {link.note ? (
                      <span className="text-small text-muted-foreground">
                        {link.note}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}
      </div>

      <nav
        data-reveal
        aria-label="Next step"
        className="mt-section border-t border-border pt-8"
      >
        <Link
          href="/#contact"
          className="link-rule inline-flex min-h-[44px] items-center text-lead text-foreground"
        >
          Talk about work like this
        </Link>
      </nav>
    </article>
  );
}
