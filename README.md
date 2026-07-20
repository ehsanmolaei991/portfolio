# Ehsan Molaei — portfolio & résumé

Two artifacts from one dataset:

- **`/`** — a narrative portfolio. Editorial layout, first-class light and dark
  themes, opt-in sound, GSAP-driven entrance and scroll choreography.
- **`/resume`** — an ATS-parseable résumé document that also renders to a
  **selectable-text PDF**, and can be **tailored per job** in seconds via
  variant overlays.

Design, content, and interaction decisions are governed by
**[`design-system/portfolio-master.md`](design-system/portfolio-master.md)**. If a
component contradicts that file, the component is wrong.

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run pdf` | Résumé → `public/*.pdf` (Playwright, renders `out/`) |
| `npm run pdf:all` | Base résumé + every variant |
| `npm run og` | Regenerate `public/og.png` social card |
| `npm run ci` | lint + typecheck + build — what Cloudflare runs |
| `npm run deploy` | Manual deploy to Cloudflare Pages |
| `npm run preview` | Serve the built site locally via wrangler |

**No network is required at build time.** Fonts are system stacks, not
`next/font/google` — a deliberate constraint so builds succeed on restricted
networks. Please keep it that way.

## Architecture

```
src/
  app/
    layout.tsx              # <html>, theme provider, metadata, Person JSON-LD
    (site)/                 # route group: everything with site chrome
      layout.tsx            #   skip link, header, motion runtime, footer
      page.tsx              #   the landing narrative
      work/[slug]/page.tsx  #   case studies (SSG, one per project)
    resume/page.tsx           # the print document — deliberately outside (site)
    resume/[variant]/page.tsx #   one static page per tailored résumé
    not-found.tsx  sitemap.ts  robots.ts
  components/
    section.tsx             # the editorial section shell
    sections/               # hero, selected-work, experience-index,
                            #   about, capabilities, contact
    site-header.tsx  site-footer.tsx
    motion-runtime.tsx      # ALL GSAP choreography, in one place
    sound-provider.tsx  sound-toggle.tsx  sound-link.tsx
    theme-provider.tsx  theme-toggle.tsx
    resume-document.tsx     # the résumé, shared by /resume and /resume/[variant]
    pointer.tsx  meme-hover.tsx  meme-art.tsx
  data/
    data_en.json            # ← résumé source of truth
    variants/*.json         # per-target overlays
    projects.ts             # ← project / case-study source of truth (typed)
    site.ts                 # ← site copy: hero, about, capabilities, microcopy
    memes.ts                # ← hover-meme registry
  lib/
    resume.ts               # base + variant merge, types
    projects helpers        # (in data/projects.ts)
    date.ts  site-config.ts  utils.ts
  styles/globals.css        # tokens, base, and the résumé print stylesheet
public/_headers  public/_redirects   # Cloudflare security headers & redirects
wrangler.jsonc  .node-version        # Cloudflare Pages project + Node pin
scripts/generate-pdf.mjs  scripts/generate-og.mjs
```

**Rendering.** Everything is a server component except four client islands:
the header, the theme and sound toggles, `SoundLink`, and `MotionRuntime`. The
hero and all content sections are server-rendered — the first thing a visitor
reads costs no hydration.

**Motion.** One GSAP context for the whole page, in `motion-runtime.tsx`.
Sections opt in by marking themselves `data-reveal`; a single
`ScrollTrigger.batch` animates all of them, so the page runs a handful of
triggers rather than dozens. Motion (Framer) is used only for component state —
the mobile menu and the theme icon. Neither library does the other's job.

**Pointer & memes.** `pointer.tsx` replaces the cursor with an accent dot and a
trailing ring, driven by two `gsap.quickTo` setters. Mark any *large* element
with `data-cursor="case study"` to turn the ring into a labelled disc — not
small buttons, the 84px disc covers them.

`meme-hover.tsx` shows a small card with a drawing and one line next to the
pointer. Mark an element with `data-meme="<id>"` and add the entry to
`src/data/memes.ts`. Artwork is original line-art in `meme-art.tsx` that
inherits the theme via `currentColor`; **to use a real image**, drop it in
`public/memes/` and set `src` on the entry — it wins over `art`. Keep memes off
the case studies and outcome figures.

Both layers mount only for fine pointers with reduced motion off, and both are
`aria-hidden` decoration.

**Sound.** Muted by default, unlocked only by a real click, persisted in
`localStorage`, cooled down, suspended when the tab is hidden, and hidden
entirely on coarse pointers or under reduced motion. Tones are *synthesised*
with the Web Audio API — zero bytes shipped, no licensing question.

## Customising

### Content

| To change | Edit |
|-----------|------|
| Experience, skills, education, contacts | `src/data/data_en.json` |
| Projects and case studies | `src/data/projects.ts` |
| Hero copy, About, capabilities, microcopy | `src/data/site.ts` |
| Canonical URL, PDF filename | `src/lib/site-config.ts` |

Inline emphasis in résumé text is data-driven via each block's `options` array:

```jsonc
{
  "value": "Optimized the iAuth system, boosting efficiency by 20%.",
  "options": [
    { "type": "bold", "search": "20%" },
    { "type": "link", "search": "iAuth", "href": "https://example.com" }
  ]
}
```

Case-study sections render **only when they have content** — a project with no
`problem` simply has no Problem block. Facts the résumé does not contain are
listed per project in `needsInput`; fill one in and the page grows. Nothing
ships as visible placeholder text.

### Design

All colour, type, spacing, radius, motion, and z-index values are CSS custom
properties in `src/styles/globals.css`, surfaced to Tailwind in
`tailwind.config.ts`. Change a token, not a component. **No raw hex in
components.**

Light and dark are designed independently — neither is an inversion of the
other. Any new foreground/background pair must hold **≥4.5:1** for text under
24px and **≥3:1** for large text and icons, **in both themes**.

### Tailoring the résumé per job (variants)

A **variant** overrides only what changes for a target. Ready-made:
`romania`, `netherlands`, `germany`, `remote`, and `short` (a genuinely 1-page
`compact` version). View any at **`/resume/<name>/`** — these are static routes,
and they are `noindex`, because they are documents you send to one employer,
not public pages competing with the canonical résumé.

1. Copy `src/data/variants/romania.json` → `src/data/variants/<name>.json`.
2. Override `applicationAs` and `summary` (plus `compact` /
   `limitExperiences` for a 1-pager).
3. Register it in the `variants` map in `src/lib/resume.ts` — that map is also
   what `generateStaticParams` builds the routes from.

> The `short` variant is tuned to land on exactly one A4 page (it currently has
> ~12px of headroom at the print width of 680px). Add content to it and
> re-measure, or it silently becomes a two-pager again.

### Generating the PDF (ATS-safe, selectable text)

```bash
npx playwright install chromium   # one time
npm run build
npm run pdf                       # base résumé, A4 -> public/Ehsan-Molaei-Frontend.pdf
npm run pdf -- romania            # a variant
npm run pdf -- romania letter     # US Letter
npm run pdf:all                   # base + every variant
```

The PDF carries real, selectable text so Applicant Tracking Systems parse it.
No Playwright? Open `/resume` and use **Cmd/Ctrl + P → Save as PDF**; the print
stylesheet produces a clean A4 page.

## Accessibility & motion contract

Non-negotiable, and checked on every change:

- One `<h1>` per page, no skipped heading levels, real landmarks.
- Skip-to-content link first in the tab order.
- Visible `2px` focus ring on every focusable element, in both themes.
- Every interactive target ≥44×44px; no functionality behind hover.
- No horizontal overflow at 320px; zoom is never disabled.
- `prefers-reduced-motion` removes travel and scrub but **hides nothing**.
- Without JavaScript, all content is visible (`<noscript>` restores it).

## Deployment

**Cloudflare Pages, as static files.** `next build` emits `out/`; Pages serves
it from the edge with no Worker code, no server runtime, and nothing to keep
patched.

Deploys are **Git-connected**: Pages watches the GitHub repo and rebuilds on
push. There is deliberately no GitHub Actions workflow and no API token stored
anywhere — the build command below is the quality gate, so a lint or type error
fails the deploy rather than shipping.

| Pages setting | Value |
|---|---|
| Build command | `npm run ci` (lint → typecheck → build) |
| Build output directory | `out` |
| Node version | from `.node-version` (20) |

```bash
npm run deploy     # manual deploy from your machine (needs `wrangler login`)
npm run preview    # serve the built out/ locally through wrangler
```

Config lives in `wrangler.jsonc` (project name, output dir) and in two files
that ride along in `public/` and land in `out/`:

- **`public/_headers`** — CSP, HSTS, frame/referrer/permissions policy, and
  cache lifetimes. The CSP allows **no external origin**, because the site
  loads none. Adding any third-party script, font, or image means editing it.
- **`public/_redirects`** — path-only redirects. Note that Pages matches on
  **path alone**: rules keyed on hostname or query string sit in the file
  looking correct and never fire. `www` → apex is therefore a dashboard
  **Redirect Rule**, not a line in this file.

Custom domains (`ehsanmolaei.ir`, and `www` which 301s to it) are attached in
the Pages dashboard under **Custom domains**.

### Why static, and what would break it

Every route is knowable at build time, so nothing needs a server. The
constraint that buys: **no `searchParams` in server components, no route
handlers, no ISR**. Résumé variants used to be `/resume?variant=romania` and
are now static routes at `/resume/romania/` precisely for this reason. If a
real dynamic need ever appears, `output: "export"` in `next.config.mjs` is the
line to change — and the deploy target changes with it.

## Application kit

- **[`docs/JOB-STRATEGY.md`](docs/JOB-STRATEGY.md)** — Romania Blue Card, EU/remote routes, and a 30/60/90-day plan.
- **[`docs/COVER-LETTER.md`](docs/COVER-LETTER.md)** — reusable template + a filled example.
- **[`docs/LINKEDIN.md`](docs/LINKEDIN.md)** — headline, About, and top-skills text.
