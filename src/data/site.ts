/**
 * Site copy — the narrative layer that the résumé data cannot express.
 *
 * Voice rules live in design-system/portfolio-master.md §11. Every factual
 * claim here is traceable to src/data/data_en.json. Opinions and phrasing are
 * mine to write; facts are not.
 */

export const siteCopy = {
  hero: {
    /** Opening line with a point of view — not a greeting. */
    opener:
      "Most of my work has been on the parts of a product people never mention unless they break.",
    /** One concrete value proposition. */
    value:
      "9+ years of frontend, most of it on products where latency and trust are the feature — trading screens, sign-in flows, and the design systems that keep them consistent.",
    /** The kind of problem I get handed. */
    problem:
      "I usually get handed the slow, load-bearing part of an app and asked to make it boring again.",
    primaryCta: { label: "Read the résumé", href: "/resume" },
    secondaryCtaLabel: "Email me",
  },

  /** One signpost per section. A signpost, not a performance. */
  microcopy: {
    work: "Three that are worth the detail.",
    experience: "The rest of the timeline, in order.",
    about: "The part a résumé has no field for.",
    capabilities: "What I reach for, and roughly why.",
    contact: "Still reading? Then we should probably talk.",
  },

  about: {
    heading: "About",
    paragraphs: [
      "I'm based in Yerevan and I've been writing frontend since 2016 — agency work first, then product teams, now leading one.",
      "The thread through all of it is a preference for the load-bearing parts: the data layer that decides whether a number on screen can be trusted, the sign-in flow every product depends on and nobody owns, the design system that stops six people from inventing six buttons. That work is rarely the thing in the demo. It is usually the thing that makes the demo possible.",
      "For six months I taught it instead of doing it — 15+ students through a bootcamp at Quera. Explaining a decision to someone with no reason to trust you is the fastest way to find out whether it was a good one.",
      "Away from the screen: football, jogging, and more tech YouTube than I would defend in court. Persian natively, English comfortably, German at A2 — which is a polite way of saying I can order breakfast.",
    ],
  },

  /**
   * Capabilities, grouped and given a reason — not a chip dump.
   * Every listed item appears in data_en.json's skills lists.
   */
  capabilities: [
    {
      title: "Product frontend",
      note: "The core. Web and mobile from one mental model.",
      meme: "any",
      items: ["TypeScript", "React.js", "Next.js", "React Native", "JavaScript (ES6+)"],
    },
    {
      title: "State & data",
      note: "Picked per problem. Most screens do not need a store.",
      meme: "live",
      items: ["Redux", "RTK Query", "Zustand", "React Query", "REST APIs", "WebSockets"],
    },
    {
      title: "Design systems & styling",
      note: "So that six engineers ship one product, not six.",
      meme: "buttons",
      items: [
        "Storybook",
        "Tailwind CSS",
        "Styled-components",
        "Emotion",
        "CSS3 (SASS, SCSS)",
        "Material-UI",
        "Accessibility (WCAG)",
      ],
    },
    {
      title: "Performance",
      note: "Measured before and after, or it did not happen.",
      meme: "machine",
      items: ["Web Vitals", "Code Splitting", "Lazy Loading", "Lighthouse"],
    },
    {
      title: "Build & quality",
      note: "Tooling I have set up rather than inherited.",
      meme: "pipeline",
      items: [
        "Vite",
        "Webpack",
        "Jest",
        "Playwright",
        "React Testing Library",
        "GitHub Actions (CI/CD)",
        "Docker",
      ],
    },
    {
      title: "Ways of working",
      note: "Team lead and mentor, not only an implementer.",
      meme: "ship",
      items: ["Agile / Scrum", "Design Tools (Figma, XD)", "Management Tools (Jira, Trello, Kanban)"],
    },
  ],

  contact: {
    heading: "Contact",
    lead: "The fastest route is email. I read everything and reply to anything specific.",
  },
} as const;
