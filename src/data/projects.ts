/**
 * Project / case-study content.
 *
 * A typed module rather than JSON so the schema is checked at build time.
 * Everything here traces back to src/data/data_en.json — no metric, client,
 * date, or outcome is invented. Where a case study wants a fact the résumé
 * does not contain, it is listed in `needsInput` and the corresponding UI
 * section is simply not rendered. Nothing ships as visible placeholder text.
 */

export interface Outcome {
  /** The measured figure, exactly as stated in the résumé data. */
  value: string;
  /** What it measured. */
  label: string;
}

/**
 * A live surface belonging to the project. Rendered as plain text in the
 * landing preview (the whole row is already one link, so nesting anchors there
 * would be invalid) and as real links in the case study.
 */
export interface ProjectLink {
  /** Short and recognisable — "app.balinex.com", "/expert". */
  label: string;
  href: string;
  /** Longer description, used only in the case study. */
  note?: string;
}

export interface Project {
  slug: string;
  /** Ordering weight for the landing page; lower comes first. */
  order: number;
  featured: boolean;
  /**
   * Does this project have enough written material to justify its own page?
   *
   * When false (the default) no case-study route is generated and the entry
   * links straight to the live site instead. A thin case study — a premise, one
   * bullet and no numbers — is worse than no case study: it invites a click and
   * spends it on nothing. Set this to true only once `problem`, `decisions`,
   * `implementation` and ideally `outcomes` all carry real content.
   */
  caseStudy?: boolean;
  name: string;
  /** One line. What this thing is, in plain words. */
  premise: string;
  role: string;
  period: string;
  employer: string;
  /** Two or three sentences of situation. */
  context: string;
  stack: string[];
  outcomes: Outcome[];
  /** Live surfaces. First one is treated as the primary. */
  links: ProjectLink[];
  /** Case-study body. Missing sections are omitted from the page entirely. */
  problem?: string;
  decisions?: string[];
  implementation?: string[];
  reflection?: string;
  /** Facts the résumé does not contain. Fill these in and the page grows. */
  needsInput: string[];
}

export const projects: Project[] = [
  {
    slug: "balinex-trading-platform",
    order: 1,
    featured: true,
    // The only project with enough written material to be worth a page:
    // two measured outcomes, three decisions, three implementation notes.
    caseStudy: true,
    name: "Balinex",
    premise:
      "A trading platform where the screen has to stay accurate while the market moves underneath it.",
    // The progression is told in `context`; the label stays short so the
    // meta line does not wrap on the landing page.
    role: "Frontend Team Lead",
    period: "Jan 2024 — Present",
    employer: "Balinex",
    context:
      "I joined as a senior engineer on the trading platform and now lead the frontend team. The work has run in two phases: first making the existing interface faster and clearer, then setting the architecture the team builds on — a monorepo, an in-house design system, and a real-time data layer.",
    stack: ["React.js", "Next.js", "TypeScript", "Redux", "WebSockets", "Jest"],
    outcomes: [
      { value: "30%", label: "increase in user engagement after the UI redesign" },
      { value: "40%", label: "reduction in data fetching times via WebSockets" },
    ],
    links: [
      {
        label: "app.balinex.com",
        href: "https://app.balinex.com/",
        note: "The trading platform itself",
      },
      {
        label: "balinex.com",
        href: "https://balinex.com/",
        note: "The public site",
      },
    ],
    problem:
      "Trading interfaces fail in two directions at once: data arrives too slowly to trust, and the interface around it grows faster than any one person can keep coherent. Both needed fixing, and the second one is the reason the first keeps coming back.",
    decisions: [
      "Moved data fetching to WebSockets with the backend team rather than tightening the polling interval — the latency was structural, not a tuning problem.",
      "Built an in-house design system instead of adopting a component library, so the trading-specific primitives had somewhere to live.",
      "Chose a monorepo and set the folder structure and stack (React, Next.js, TypeScript, Jest, Redux, WebSockets) so scaling the team did not mean re-litigating the architecture each time.",
    ],
    implementation: [
      "Led the redesign and optimisation of the trading interface, working directly with the design and product team.",
      "Rebuilt identity-verification video capture with real-time guidance and quality checks, so submissions are usable on the first attempt.",
      "Mentored the frontend team against the shared design system and architecture.",
    ],
    needsInput: [
      "Team size and how it changed",
      "Platform scale — users, instruments, peak throughput",
      "Before/after Web Vitals for the redesign",
      "Whether the design system is public or shareable",
      "Screenshots or a short screen capture (none exist in the repo)",
    ],
  },
  {
    slug: "mdotcar",
    order: 2,
    featured: true,
    name: "Mdotcar",
    premise:
      "A roadside rescue platform with two front doors — one for drivers who need help, one for the operators who answer.",
    // "Led its development" is stated in `context`; the label stays short so
    // the meta line does not wrap on the landing page.
    role: "Senior Frontend Engineer",
    period: "May 2023 — Jan 2024",
    employer: "Tafarda Studio",
    context:
      "Mdotcar connects stranded drivers with tow services. I led its development. Two audiences share the platform and want opposite things from it, so each got a dedicated surface instead of one interface trying to serve both.",
    stack: ["React.js", "Next.js", "TypeScript"],
    outcomes: [],
    links: [
      { label: "mdotcar.com", href: "https://mdotcar.com/", note: "The platform" },
      {
        label: "/client",
        href: "https://mdotcar.com/client",
        note: "For drivers requesting rescue",
      },
      {
        label: "/expert",
        href: "https://mdotcar.com/expert",
        note: "For expert tow services responding to them",
      },
    ],
    problem:
      "One product, two users whose definition of a good interface is the opposite of each other's. Someone stranded on a road measures the product in taps and seconds. A tow operator working a full shift measures it in how much fits on one screen.",
    decisions: [
      "Built two dedicated surfaces — /client and /expert — rather than a single interface that changes shape by role.",
    ],
    implementation: [
      "Led the frontend development of both surfaces on a shared React and Next.js codebase.",
    ],
    needsInput: [
      "Launch outcome or usage figures — rescues completed, operators onboarded",
      "Whether the dispatch/matching logic was frontend-owned",
      "Whether there is a native app alongside the web platform",
      "Screenshots (none exist in the repo)",
    ],
  },
  {
    slug: "madomotor",
    order: 3,
    featured: true,
    name: "Madomotor",
    premise:
      "A responsive site and store that gave the Mado brand somewhere to actually sell.",
    role: "Frontend Developer (freelance)",
    period: "Mar 2021 — Dec 2022",
    employer: "Rah Agency",
    context:
      "Mado had a brand and almost no online presence. The build had to do two jobs at once — be a shop window and be a working store — and be fully responsive from the start rather than adapted afterwards.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    outcomes: [{ value: "12%", label: "increase in online sales" }],
    links: [
      { label: "madomotor.ir", href: "https://www.madomotor.ir/", note: "The store" },
    ],
    problem:
      "A brand with no online presence has no baseline to improve on. Whatever shipped would be the brand for anyone who found it, so it had to sell and introduce at the same time.",
    implementation: [
      "Implemented the site and store as a single fully responsive build.",
    ],
    needsInput: [
      "Platform / CMS behind the store",
      "Timeframe the 12% sales figure covers, and what it was measured against",
      "Screenshots (none exist in the repo)",
    ],
  },
  {
    slug: "dijlah-mobile-fleet",
    order: 4,
    featured: false,
    name: "Dijlah cross-platform app fleet",
    premise:
      "Moving a mobile product line off B4A and onto a single React Native codebase.",
    role: "Frontend Developer",
    period: "May 2019 — Dec 2021",
    employer: "Dijlah",
    context:
      "Dijlah shipped mobile apps built in B4A, which meant Android-only and a toolchain few people could work in. I led the R&D to decide whether React Native could replace it, then shipped the fleet on the new stack — alongside a redesign of the management dashboard.",
    stack: ["React Native", "Android", "iOS", "JavaScript"],
    outcomes: [
      { value: "6+", label: "cross-platform apps shipped on Android and iOS" },
      { value: "500+", label: "positive App Store and Google Play reviews" },
      { value: "40%", label: "reduction in development time after the migration" },
      {
        value: "~50%",
        label: "fewer support and training tickets after the dashboard redesign",
      },
    ],
    problem:
      "Every feature had to be built twice, or not built for iOS at all. The dashboard had a second, quieter cost: it generated enough confusion to keep a support queue busy.",
    decisions: [
      "Ran the B4A → React Native migration as R&D first, with the cross-platform requirement as the deciding criterion rather than developer preference.",
      "Treated the dashboard redesign as a support-cost problem, and measured it as one.",
    ],
    implementation: [
      "Shipped 6+ multi-language apps to both stores on the shared codebase.",
      "Redesigned and deployed the management dashboard.",
    ],
    links: [
      {
        label: "Apple App Store",
        href: "https://apps.apple.com/us/developer/ali-al-saedi/id1453676827",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/developer?id=Dijlah+it",
      },
    ],
    needsInput: [
      "Names of the individual apps",
      "Download or install numbers",
      "Which languages the apps were localised into",
      "Screenshots (none exist in the repo)",
    ],
  },
  {
    slug: "iauth-shared-authentication",
    order: 5,
    featured: false,
    name: "iAuth — shared authentication",
    premise:
      "One sign-in shared across a studio's products, refactored until it stopped being the slow part.",
    role: "Senior Frontend Engineer",
    period: "May 2023 — Jan 2024",
    employer: "Tafarda Studio",
    context:
      "Tafarda ran several products behind a joint authentication system. It worked, but it was the first thing every user touched and the slowest step in every flow. I refactored it on Next.js.",
    stack: ["Next.js", "React.js", "TypeScript"],
    outcomes: [
      { value: "20%", label: "improvement in efficiency" },
      { value: "25%", label: "reduction in response time" },
    ],
    links: [],
    problem:
      "A shared auth layer is the one component every product depends on and nobody owns. Its latency is charged to every product's first impression.",
    decisions: [
      "Refactored on Next.js rather than patching the existing flow, so the rendering strategy could carry part of the cost.",
    ],
    needsInput: [
      "Which products consumed iAuth",
      "Auth protocol / provider (OAuth, OIDC, custom)",
      "What the response-time figure was measured against",
      "Screenshots (none exist in the repo)",
    ],
  },
  {
    slug: "unitour",
    order: 6,
    featured: false,
    name: "Unitour",
    premise:
      "A virtual tour of Mazandaran University, for students and visitors who could not walk the campus.",
    role: "Frontend Developer",
    period: "Jun 2016 — Feb 2019",
    employer: "Unierr Agency",
    context: "A contributor role on an interactive campus tour.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    outcomes: [],
    links: [{ label: "tour.unierr.ir", href: "https://tour.unierr.ir" }],
    needsInput: [
      "Which parts were mine versus the team's",
      "Whether the tour is still online and current",
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getOtherProjects(): Project[] {
  return projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Only projects with a real case study get a route and a sitemap entry. */
export function getProjectSlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}

/**
 * Where a project entry should send the visitor.
 *
 * `internal` — its own case study.
 * `external` — straight to the live site, because there is no page worth
 *              opening yet.
 * `none`     — nothing to link to at all; render as plain text rather than a
 *              link that goes nowhere.
 */
export function getProjectTarget(
  project: Project
): { kind: "internal"; href: string } | { kind: "external"; href: string; label: string } | { kind: "none" } {
  if (project.caseStudy) return { kind: "internal", href: `/work/${project.slug}` };
  const primary = project.links[0];
  if (primary) return { kind: "external", href: primary.href, label: primary.label };
  return { kind: "none" };
}
