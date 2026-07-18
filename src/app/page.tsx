import { getResume } from "@lib/resume";
import { HeroShowcase, type HeroCta } from "@/components/hero-showcase";
import { ScrambleText } from "@/components/ui/scramble-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const iconFor: Record<string, string> = {
  MAIL: "Email",
  LINKEDIN: "LinkedIn",
  GITHUB: "GitHub",
  WEBSITE: "Website",
  MOBILE: "Phone",
};

// Hover memes — "<emoji>|<caption>". Consumed by <MemeLayer /> via data-meme.
const skillMemes: Record<string, string> = {
  "TypeScript": "🦕|any? I hardly know her",
  "React.js": "⚛️|hooks go brrr",
  "React Native": "📱|write once, debug everywhere",
  "Next.js": "▲|'use client' (again)",
  "Redux": "🌀|boilerplate as a lifestyle",
  "Zustand": "🐻|state, but chill",
  "RTK Query": "🎣|caching so you don't have to",
  "React Query": "🔁|refetch go brrr",
  "HTML5": "📄|technically a programming language",
  "CSS3 (SASS, SCSS)": "🎨|wait, why is it centered now",
  "Webpack": "📦|it compiles, ship it",
  "Vite": "⚡|npm run dev at ludicrous speed",
  "NPM": "🧶|node_modules has entered the chat",
  "Yarn": "🧵|same thing, fewer bugs (allegedly)",
  "Git": "🌳|git commit -m 'fix'",
  "GitHub": "🐙|merge conflicts build character",
  "JavaScript (ES6+)": "🃏|NaN === NaN // false",
  "Storybook": "📚|it works in isolation",
  "Jest": "🃏|expect(bugs).toBe(0)",
  "Playwright": "🎭|flaky? never heard of her",
  "Docker": "🐳|but it works in the container",
  "Node.js": "💚|callback hell survivor",
};
const memeFallbacks = [
  "🚀|ship it",
  "💾|works on my machine",
  "🔥|this is fine",
  "🧠|big brain time",
  "☕|powered by coffee",
];
function memeFor(skill: string): string {
  if (skillMemes[skill]) return skillMemes[skill];
  let sum = 0;
  for (let i = 0; i < skill.length; i++) sum += skill.charCodeAt(i);
  return memeFallbacks[sum % memeFallbacks.length];
}
const statMemes: Record<string, string> = {
  "years of experience": "🧓|senior since before hooks",
  "companies shipped for": "🚢|ship it 🚀",
  "cross-platform apps": "📲|works on my machine",
  "app-store reviews": "⭐|please rate 5 stars",
};

/** Section eyebrow — same visual vocabulary as the hero (teal tick + tracked label). */
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="group mb-8 flex items-center gap-3">
      <span className="h-px w-8 origin-left bg-primary transition-transform duration-300 group-hover:scale-x-150" />
      <ScrambleText
        text={children}
        className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-primary"
      />
    </div>
  );
}

export default function Landing() {
  const data = getResume();
  const featured = data.experiences.slice(0, 4);

  const chips = [
    ...data.skills.frontend.slice(0, 10),
    ...data.skills.tools.slice(0, 6),
  ];

  const stats = [
    { n: "9+", label: "years of experience" },
    { n: "7", label: "companies shipped for" },
    { n: "6+", label: "cross-platform apps" },
    { n: "500+", label: "app-store reviews" },
  ];

  const links = data.contacts.filter((c) => c.id !== "MOBILE");
  const mail = data.contacts.find((c) => c.id === "MAIL")?.link;

  // Rotating hero taglines — derived from the resume data so they stay in sync.
  const taglines = [
    data.applicationAs,
    data.skills.frontend.slice(0, 3).join("  ·  "),
    data.skills.frontend.slice(3, 6).join("  ·  "),
    data.skills.tools.slice(0, 3).join("  ·  "),
  ].filter((t) => t && t.trim().length > 0);

  const ctas: HeroCta[] = [
    { label: "View résumé", href: "/resume", primary: true, meme: "📄|no cap, just skills" },
    { label: "Download PDF", href: "/Ehsan-Molaei-Frontend.pdf", meme: "⬇️|not a virus, promise" },
    ...(mail ? [{ label: "Email me", href: mail, meme: "📧|replies within 24h (usually)" }] : []),
  ];

  return (
    <>
      <HeroShowcase
        brand={`${data.firstName} ${data.lastName}`}
        name={`${data.firstName} ${data.lastName}`.toUpperCase()}
        hoverText="LET'S TALK"
        eyebrow={data.applicationAs}
        taglines={taglines}
        relocationNote={data.relocationNote}
        ctas={ctas}
      />

      <main className="relative isolate overflow-hidden bg-background text-foreground">
        {/* Grid motif carried down from the hero, fading out */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,#000_35%,transparent_100%)]"
        />
        {/* Teal bridge glow connecting to the hero above */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 [background:radial-gradient(ellipse_at_top,hsl(var(--primary)/0.10),transparent_60%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl space-y-24 px-6 pb-28 pt-16">
          {/* Stats */}
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                data-meme={statMemes[s.label]}
                className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_44px_-24px_hsl(var(--primary)/0.5)]"
              >
                <div className="text-3xl font-bold tracking-tight text-primary">
                  {s.n}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </section>

          {/* Selected work */}
          <section>
            <SectionLabel>Selected experience</SectionLabel>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {featured.map((exp, i) => (
                <SpotlightCard
                  key={`${exp.company.name}-${i}`}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_50px_-24px_hsl(var(--primary)/0.5)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.position}
                    </h3>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {exp.endDate ? exp.endDate.split("/")[1] : "Now"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {exp.company.href ? (
                      <a className="hover:underline" href={exp.company.href}>
                        {exp.company.name}
                      </a>
                    ) : (
                      exp.company.name
                    )}
                    {exp.location ? (
                      <span className="text-muted-foreground">{` · ${exp.location}`}</span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.achievements[0]?.value}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <SectionLabel>Core stack</SectionLabel>
            <ul className="flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <li
                  key={c}
                  data-meme={memeFor(c)}
                  className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                >
                  <ScrambleText text={c} />
                </li>
              ))}
            </ul>
          </section>

          {/* Contact / footer */}
          <footer className="border-t border-border pt-12">
            <SectionLabel>Let&apos;s talk</SectionLabel>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Open to relocation &amp; visa sponsorship. The fastest way to reach
              me:
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              {links.map((c) => (
                <a
                  key={c.id}
                  href={c.link}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                >
                  <ScrambleText text={iconFor[c.id] ?? c.title} />
                  <span className="text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-10 text-sm text-muted-foreground">
              © {data.firstName} {data.lastName} · Built with Next.js
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
