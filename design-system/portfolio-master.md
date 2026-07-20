# Portfolio Master — Ehsan Molaei

Single source of truth for every design, content, and interaction decision on this
site. If a component contradicts this file, the component is wrong.

Status: **v1 — established during the 2026-07 audit/redesign.**
Scope: `/` (portfolio) and `/resume` (ATS document). The résumé document keeps its
own print-first rules; see [Two documents, one voice](#two-documents-one-voice).

---

## 1. Brand premise

> A senior frontend engineer who takes ownership of the parts of a product where
> **latency and trust are the feature** — trading screens, auth flows, design
> systems — and leaves the codebase easier to work in than he found it.

This is not a "creative developer" site. The evidence in the repository is
infrastructure-shaped: a monorepo architecture decision, an in-house design
system, a WebSocket integration, a B4A→React Native migration, mentoring. The
site should read like the person who did that work: **calm, specific, unhurried,
mildly funny.** Confidence comes from concreteness, never from adjectives.

## 2. Audience

**Primary:** hiring managers and engineering leads at EU (Romania / Netherlands /
Germany) and remote-first product companies, screening a senior frontend
candidate who needs relocation or visa sponsorship. They are skimming, on a
laptop, with eight other tabs open.

**Secondary:** technical recruiters (need title, years, stack, location/visa
status within seconds) and peer engineers (need to believe the depth is real).

**What they need in the first 10 seconds:**

1. Name + Senior Frontend Engineer + ~10 years.
2. React / Next.js / React Native / TypeScript.
3. He led a fintech trading platform's frontend.
4. He is available, and needs sponsorship — stated plainly, not buried.

**Primary CTA:** *Read the résumé* (`/resume`) — this is the artifact that closes
the loop, and it already exists as a first-class page and a PDF.
**Secondary CTA:** *Email* — one click, no form, no friction.
Everything else (LinkedIn, GitHub, PDF download) is footer-tier.

## 3. Narrative

The page is one continuous argument, in this order. Each section earns the next.

| # | Section | Job it does | Trust level required |
|---|---------|-------------|----------------------|
| 1 | **Hero** | Identity, role, availability. One line of value. | none |
| 2 | **Selected work** | Three deep case entries, each with a live URL. | low — this is the proof |
| 3 | **Experience index** | The full timeline, scannable, no cards. | medium |
| 4 | **About** | The human paragraph — how he decides, what he likes. | medium |
| 5 | **Capabilities** | Grouped, prose-led. Not a chip dump. | high |
| 6 | **Contact** | The ask. | high |

**Rejected structures:** a stats band above the work (numbers with no story are
noise), a skills grid in position 2, a separate "Services" section, a blog with
no posts, testimonials we do not have.

**Deleted content:** the four hero stat tiles. `7 companies` was factually wrong
(the data has 7 *entries* across **6** companies — Balinex appears twice), and
the remaining three numbers are already stated with context inside the work
section. Numbers live next to the story that earns them.

## 4. Visual direction

**Name: "Editorial Index."** The site reads like a well-set printed index of
work — rules, margins, tabular dates, generous measure — rendered with the
restraint of a good technical document, then lit differently in each theme.

Principles:

- **Structure comes from hairlines and whitespace**, not from cards, shadows, or
  fills. A 1px border is the primary compositional tool.
- **Typography-led.** Scale, weight, and measure carry the hierarchy. If a
  section needs a box to feel designed, the typography is wrong.
- **Controlled asymmetry.** Desktop uses a two-column editorial grid: a narrow
  left meta rail (dates, role, index numbers, tabular figures) against a wide
  content column. Mobile collapses to one column, meta above content.
- **One accent, used sparingly** — teal. It marks links, the active state, and
  exactly one element per viewport. It is never a glow, never a gradient.
- **Quiet motion.** Motion explains structure; it never performs.
- **Texture** is limited to a single, near-invisible hairline rule system. No
  noise overlays, no mesh, no canvas.

### Anti-patterns — explicitly banned

These are not stylistic preferences; they are the failure modes this redesign
exists to remove. All of them are currently in the codebase.

| Banned | Why | Current offender |
|--------|-----|------------------|
| Full-bleed animated canvas backgrounds | Permanent RAF, generic "AI portfolio" signal | `isometric-wave-grid-background.tsx` |
| Text-scramble on every label, chip, and link | Destroys the accessible name and scanability | `scramble-text.tsx` used ~30× |
| **Emoji** meme bubbles on every hover | Emoji-as-UI; undercuts a senior positioning | `meme-layer.tsx` — superseded, see §7.1 |
| Hover-only content reveal | Invisible to touch and keyboard | `MagneticText` "LET'S TALK" |
| Glow / spotlight cards | Decorative, unearned depth | `spotlight-card.tsx` |
| Rounded cards for everything, heavy shadows | Generic | landing sections |
| Bento grids, gradient mesh, glassmorphism | Trend residue | — |
| Stock imagery | We have none and need none | — |

Humor is **kept** — in the copy, and in a small, deliberate pointer layer
defined in §7.1. What is banned is humour as *ambient noise*: a bubble on every
hover, emoji standing in for interface.

---

## 5. Tokens

All values are CSS custom properties on `:root` / `.dark`, surfaced to Tailwind
via `tailwind.config.ts`. **No raw hex and no repeated magic numbers in
components.**

### 5.1 Color — semantic tokens

Both themes are designed independently. Light is **paper** (warm, printed).
Dark is **ink** (deep slate, never pure black). Neither is an inversion.

| Token | Light (paper) | Dark (ink) | Use |
|-------|---------------|------------|-----|
| `--background` | `40 20% 97%` | `216 24% 7%` | page |
| `--surface` | `40 24% 99%` | `216 20% 10%` | inset panels |
| `--elevated` | `0 0% 100%` | `215 18% 13%` | overlays, menus |
| `--foreground` | `215 25% 12%` | `210 20% 92%` | body text |
| `--muted` | `40 14% 93%` | `215 18% 14%` | quiet fills |
| `--muted-foreground` | `215 12% 38%` | `214 12% 62%` | meta, captions |
| `--border` | `38 12% 87%` | `215 16% 18%` | hairlines |
| `--border-strong` | `38 12% 76%` | `215 14% 27%` | active dividers |
| `--accent` | `187 82% 30%` | `186 70% 58%` | links, marks |
| `--accent-foreground` | `0 0% 100%` | `216 24% 7%` | text on accent fill |
| `--accent-muted` | `187 82% 30% / 0.10` | `186 70% 58% / 0.14` | wash |
| `--selection` | `187 82% 30% / 0.18` | `186 70% 58% / 0.26` | `::selection` |
| `--focus` | `187 82% 30%` | `186 70% 58%` | focus ring |

**Contrast — a fixed defect, not a preference.** The existing light accent
`187 84% 36%` scores **3.29:1** on the light background and is used for body-size
link and company text. That fails WCAG AA (4.5:1). The new light accent
`187 82% 30%` scores **4.53:1**. The résumé's `--resume-accent: #109cad` has the
same defect on white and is corrected to the same value.

Every foreground/background pair in this table must hold **≥4.5:1** for text
below 24px and **≥3:1** for large text, icons, and focus rings, **in both
themes.** Verify before shipping any new pair.

### 5.2 Typography

**Constraint: no network fonts at build time.** Builds must succeed on
restricted networks, so `next/font/google` is prohibited. Character comes from
pairing two *system* stacks — this is a deliberate design choice, not a
limitation:

```
--font-sans:    ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, "Helvetica Neue", Arial, sans-serif
--font-serif:   "Iowan Old Style", "Palatino Linotype", Palatino, Georgia,
                "Times New Roman", serif
--font-mono:    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace
```

- **Serif** — display headings, the hero line, pull quotes. This is what makes
  the site read as editorial rather than as a dashboard.
- **Sans** — body copy, UI, navigation, labels.
- **Mono** — dates, index numbers, stack lists. Always `font-variant-numeric:
  tabular-nums` for anything that aligns in a column.

Scale (fluid, `clamp`):

| Token | Value | Use |
|-------|-------|-----|
| `--text-display` | `clamp(2.75rem, 7vw, 5.25rem)` | hero name |
| `--text-h1` | `clamp(2rem, 4.5vw, 3.25rem)` | page title |
| `--text-h2` | `clamp(1.6rem, 3vw, 2.25rem)` | section opener |
| `--text-h3` | `1.25rem` | work / experience entry |
| `--text-lead` | `clamp(1.05rem, 1.6vw, 1.25rem)` | hero value line, About |
| `--text-body` | `1rem` | prose |
| `--text-small` | `0.875rem` | meta |
| `--text-micro` | `0.75rem` | eyebrows — always `0.18em` tracking, uppercase |

Line height: `1.05` display · `1.2` headings · `1.65` prose · `1.45` meta.
Tracking: `-0.02em` display · `-0.01em` headings · `0` body.
**Measure: 62–70ch for all prose.** Never full-width paragraphs.

### 5.3 Spacing

4px base (Tailwind's default scale). Rhythm tokens for composition:

```
--space-section: clamp(4.5rem, 11vh, 8rem)   /* between top-level sections */
--space-block:   clamp(2rem, 4vh, 3rem)      /* within a section */
--gutter:        clamp(1.25rem, 4vw, 2.5rem) /* page side padding */
```

### 5.4 Layout & containers

```
--container-prose:   68ch    /* paragraphs */
--container-content: 72rem   /* main column */
--container-wide:    88rem   /* hero, full-bleed rules */
```

Editorial grid (≥`lg`): `grid-template-columns: 10rem minmax(0, 1fr)` — meta rail
+ content. Below `lg`: single column, meta stacked above.

Breakpoints: Tailwind defaults (`sm 640 · md 768 · lg 1024 · xl 1280`).
**Mobile-first: every component is authored at 360px and enhanced upward.**

### 5.5 Radius

Deliberately tight — this is a document, not an app shell.

```
--radius-sm: 2px · --radius-md: 4px · --radius-lg: 8px · --radius-full: 9999px
```

`--radius-full` is reserved for the availability dot and icon buttons. Nothing
gets a 16px+ corner.

### 5.6 Border & elevation

Borders do the work shadows normally would.

| Level | Definition | Use |
|-------|-----------|-----|
| `flat` | no border, no shadow | most content |
| `rule` | `1px solid hsl(var(--border))` | section and list dividers — **the default** |
| `raised` | `1px solid hsl(var(--border-strong))` | active/hovered entry |
| `overlay` | `0 8px 32px -12px hsl(215 25% 12% / 0.18)` + border | menus, dialogs only |

There is no card shadow. Ever.

### 5.7 Motion tokens

```
--dur-instant:   120ms   /* state flips: toggle, checkbox */
--dur-fast:      180ms   /* hover, focus, small feedback */
--dur-normal:    280ms   /* enter/exit, disclosure */
--dur-slow:      500ms   /* section reveal, layout shift */
--dur-cinematic: 900ms   /* hero entrance only — once per session */

--ease-standard: cubic-bezier(0.2, 0, 0, 1)
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)
```

Three easings total. Springs are permitted only for pointer-driven
micro-interaction, with `stiffness ≤ 400`, `damping ≥ 30` — no visible bounce.

### 5.8 Z-index

```
--z-base: 0 · --z-sticky: 20 · --z-header: 30 · --z-overlay: 40
--z-dialog: 50 · --z-pointer: 60 · --z-toast: 70
```

No `z-index: 9999`. The current cursor layers use `9999`/`10000`; they resolve to
`--z-pointer` or are removed.

---

## 6. Component principles

- **Data in, markup out.** Components never hardcode content. Everything comes
  from `src/data/*` through `src/lib/resume.ts`.
- **Server by default.** `"use client"` requires a reason: pointer events, theme
  state, or an animation that cannot be expressed in CSS. The hero, work, and
  experience sections are server components.
- **One responsibility per file.** A component that both fetches shape and paints
  chrome gets split.
- **No premature abstraction.** Extract on the third occurrence, not the first.
- **Public APIs are stable.** Existing prop contracts don't change without cause.
- Every interactive element: `≥44×44px` hit area, visible focus, keyboard
  operable, and functional **without hover**.

---

## 7. Motion principles

Motion exists to answer one of four questions: *what changed?*, *where did it
come from?*, *what is now active?*, *did my input register?* If an animation
answers none of these, it is deleted.

**Tool split — never both for one problem:**

| Concern | Tool |
|---------|------|
| Component state, hover/tap feedback, enter/exit, layout, dialogs | **Motion (Framer Motion)** |
| Multi-step timelines, hero choreography, scroll-linked sequences | **GSAP + `@gsap/react`** |

React/GSAP rules: `useGSAP()` only; every selector scoped to a container ref;
`contextSafe` for deferred callbacks; `ctx.revert()` in cleanup; never at module
scope or during SSR; `ScrollTrigger.kill()` on unmount.

**Performance rules:** animate `transform`/`opacity` only — `x`/`y`, never
`top`/`left`; never animate `width`, `height`, `margin`, or `padding`
(`MagneticText` currently animates width/height and must be rewritten or
removed); `gsap.quickTo()` for any pointer follower, never a new timeline per
`mousemove`; pause off-screen work; `will-change` only on genuinely moving
elements; one RAF loop maximum on the page.

**Budget: at most 6 distinct animated behaviours on the landing page.** The
current build has ~4 permanent RAF loops and a scramble on nearly every text
node; that is the thing being fixed.

### 7.1 The pointer layer

A custom pointer and hover memes are **sanctioned**, under strict conditions.
They are the site's personality budget; spending it anywhere else is over-spending.

**Custom pointer** (`pointer.tsx`) — an accent dot with a trailing ring:

- Three states only: default, `link` (over any interactive element), and `label`
  (over `data-cursor="<word>"`, which turns the ring into an accent disc with
  that word inside).
- Driven by two `gsap.quickTo` setters created once. No timeline per
  `mousemove`, and GSAP's shared ticker means **one** RAF for the page.
- `data-cursor` labels go on **large targets only**. The disc is 84px and will
  cover a small button, hiding the label the visitor is about to click.
- Mounted only for `(hover: hover) and (pointer: fine)` and only when reduced
  motion is off; both queries stay live. The native cursor is hidden **only
  while the layer is actually running**, and never over text-entry elements.
  This is a deliberate, guarded exception to the usual rule against hiding the
  system cursor — the guards are the reason it is acceptable.

**Hover memes** (`meme-hover.tsx` + `data/memes.ts`) — a small card with a
drawing and one line:

- Confined to the light-hearted regions: capability headings, the email CTA, the
  PDF link. **Never** on a case study, an outcome figure, or a job title. A joke
  next to a number reads as a hedge.
- Artwork is **original line-art** (`meme-art.tsx`), inheriting the theme through
  `currentColor`. No copyrighted meme images ship. Real images may be dropped in
  `/public/memes/` and referenced with `src`.
- `aria-hidden`, decorative, and additive: nothing in the card is content anyone
  could miss. Same pointer/reduced-motion guards as above.
- React state changes only when the hovered meme changes — never per mousemove.

**`prefers-reduced-motion: reduce`:** no parallax, no scrub, no pointer
follower, entrances collapse to a ≤150ms opacity fade, autoplay stops, page
transitions become instant. **Nothing is hidden and no functionality is lost** —
reduced motion is a different presentation, not a degraded site.

---

## 8. Sound principles

Sound is an enhancement and never a requirement.

- **Default: muted.** Enabled only after a deliberate user gesture (browser
  autoplay policy makes this mandatory anyway).
- One visible, labelled toggle — accessible name states the action and the
  state, e.g. *"Sound effects: off"*. Not "speaker icon".
- Preference persists in `localStorage`.
- Sound is attached to **at most three** events: opening a selected-work entry,
  switching theme, and the primary CTA. **Never on generic hover.**
- ≥180ms cooldown between plays; a single reused `Audio`/`AudioContext` node, no
  overlapping instances; pause on `visibilitychange`; full cleanup on unmount.
- Disabled entirely on coarse pointers.
- Assets: self-authored or verifiably licensed only. **No copyrighted audio.** If
  no cleared asset exists, ship the provider and the toggle with no sound file
  rather than a placeholder — architecture without fake assets.

---

## 9. Accessibility rules

Non-negotiable, checked every loop — not deferred to the end.

- Exactly one `<h1>` per page; no skipped levels. *(The landing page currently
  has **no** `h1` and jumps straight to `h3`.)*
- Landmarks: `header`, `nav`, `main`, `footer`. `<footer>` is a sibling of
  `<main>`, not a descendant.
- Skip-to-content link, first in tab order, visible on focus.
- Focus ring: `2px solid hsl(var(--focus))` + `2px` offset, on every focusable
  element, in both themes. Never `outline: none` without a replacement.
- Full keyboard operability; logical tab order; no traps.
- Touch targets ≥44×44px.
- Accessible names describe purpose ("Download résumé (PDF)"), not appearance.
- Decorative SVG/graphics: `aria-hidden="true"` + `focusable="false"`.
- Text that animates its own characters must expose a **stable** accessible name.
- Native cursor is never hidden.
- No horizontal overflow at 320px.
- Zoom is never disabled; layout survives 200% text zoom.
- `aria-live="polite"` for asynchronous feedback only — never for decoration.

---

## 10. Theme rules

- Both themes are first-class and independently designed.
- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- No flash: theme resolves before first paint; `suppressHydrationWarning` on
  `<html>`; `disableTransitionOnChange` so the initial load never animates.
- Theme-color `<meta>` per scheme so browser chrome matches.
- Choice persists across sessions.
- The toggle is **reachable from anywhere** — currently it lives only in the hero
  and scrolls out of view. It moves into a persistent header.
- Toggle is keyboard operable with a stateful accessible name
  (*"Switch to light theme"*), not "sun icon".
- Toggle motion: a **circular View Transition reveal** expanding from the button
  itself, so the new theme visibly comes *from* the control that was pressed
  (620ms, `--ease-out`), plus a short icon crossfade. Progressive enhancement:
  browsers without `document.startViewTransition`, and anyone with reduced
  motion, get an instant swap. The theme is always set through `next-themes` —
  never by toggling the class by hand — so persistence and the system
  preference stay correct.
- Every image, logo, and illustration is checked in both themes.

---

## 11. Content voice

**Tone:** plain, specific, quietly self-aware. Short sentences. First person.
Technical without posturing. A dry joke is welcome once or twice — never in the
hero value line, never in a heading.

**Rules:**

1. **Evidence over adjectives.** Not "passionate about performance" — "cut data
   fetch times 40% by moving the order book to WebSockets."
2. Lead with the decision, follow with the outcome.
3. Cut every sentence that would be true of any frontend engineer.
4. No corporate jargon: *leverage, synergy, cutting-edge, robust, seamless,
   passionate, rockstar, ninja.*
5. Numbers keep their context. A number with no story is deleted.
6. Uncertainty is stated, not inflated.

**Banned openers:** *Welcome to my portfolio · Passionate developer · I build
amazing digital experiences · Turning ideas into reality · Crafting innovative
solutions · Pixel-perfect experiences · Let's build something amazing together.*

**Hero must contain, in order:** an opening line with a point of view; the role;
one concrete value proposition; one sentence naming the kind of problem he
solves; primary CTA; secondary CTA. Availability/sponsorship is stated in the
hero — it is a filter, and hiding it wastes everyone's time.

**Section transitions** get one short line of microcopy each, maximum. Microcopy
is a signpost, not a performance.

### Facts policy — hard rule

Every claim traces to `src/data/data_en.json` or an existing `docs/*.md`.
**Nothing about Ehsan is invented** — no fabricated metrics, clients, dates,
titles, or outcomes. Missing-but-wanted content is marked `[NEEDS INPUT]` in the
data file with the structure ready to receive it. Known gaps today:

- No project/case-study entity exists. Projects (Balinex trading platform,
  Mdotcar, iAuth, Rsoon+, Madomotor, Retone, Verna, Unitour) live only as inline
  links inside achievement strings and need a typed `projects` model.
- No visuals for any project. No screenshots, no diagrams.
- No writing/notes content — **so no Writing section ships.** An empty section is
  worse than a missing one.

---

## 12. Copy rules (mechanical)

- Sentence case for headings. No Title Case, no ALL CAPS except `--text-micro`
  eyebrows.
- Oxford comma. Em dashes unspaced — like this.
- "résumé" with accents in prose; `resume` in code, routes, and filenames.
- Dates: `Mar 2025 — Present`, mono, tabular.
- Link text describes the destination. Never "click here", never a bare "↗" as
  the whole accessible name.
- Stack lists use `·` separators, not commas, and never exceed 6 items in a
  preview.

---

## 13. Responsive rules

- Authored mobile-first from **360px**.
- Content order in the DOM matches reading priority — mobile is never a
  reordered afterthought.
- No horizontal scroll at any width. Long strings (URLs, stack lists) wrap or
  scroll **inside their own container**.
- Touch: no hover-dependent affordance; pointer-driven effects are `@media
  (hover: hover) and (pointer: fine)` only.
- The editorial two-column grid collapses to one column below `lg`.
- Type never drops below `1rem` for body copy on any viewport.

---

## Two documents, one voice

`/` and `/resume` are intentionally different artifacts and keep separate
stylesheets:

- **`/resume`** is a print document. Its `--resume-*` / `--ink` palette, A4
  geometry, and print stylesheet are **preserved as-is** — they are what makes
  the PDF ATS-parseable, and that pipeline works. The only change permitted here
  is the accent contrast fix and removing `text-align: justify` from body copy.
- **`/`** is the narrative site and follows this document.

They share: the accent hue, the name, and the facts. They do not share layout,
scale, or component code.

---

---

## Appendix A — Interaction map (as built)

Every animated behaviour on the site. Budget was ≤6 on the landing page; this is
six. Anything added must earn a row here first.

| Interaction | Purpose | Tool | Duration | Reduced mode |
|---|---|---|---|---|
| Hero entrance (staggered lines) | Establishes reading order on arrival | GSAP timeline | 620ms, 75ms stagger | Not hidden, no travel — renders in place |
| Section reveal on scroll | Signals "new section", batched for the whole page | GSAP `ScrollTrigger.batch`, `once: true` | 500ms, 60ms stagger | Disabled; content always visible |
| Work-entry hover/focus (rule + arrow) | Confirms the row is a target | CSS `background-size` + `transform` | 280ms / 180ms | Instant (global transition override) |
| Mobile nav disclosure | Explains where the panel came from | Motion `AnimatePresence` | 180ms | Instant |
| Theme reveal | New theme comes *from* the button pressed | View Transitions + WAAPI | 620ms | Instant swap |
| Theme icon swap | Confirms the theme flipped | Motion `AnimatePresence` | 160ms | Instant |
| Custom pointer | Confirms what is targetable, and labels large targets | GSAP `quickTo` | 90ms dot / 420ms ring | Not mounted |
| Hover meme card | Personality, on a handful of marked elements | GSAP `quickTo` + CSS | 180–280ms | Not mounted |
| Skip-link reveal on focus | Makes the first tab stop visible | CSS `transform` | 180ms | Instant |

Deliberately **not** built: parallax, pinned sections, scrub timelines, page
transitions, `SplitText`. None answered a question the reader was asking.

## Appendix B — Implementation status

Anti-patterns from §4 — all removed in the 2026-07 refactor:

| Pattern | Disposition |
|---|---|
| `isometric-wave-grid-background.tsx` (canvas RAF) | deleted |
| `scramble-text.tsx` (~30 call sites) | deleted |
| `morphing-text-reveal.tsx` (stale `aria-label`) | deleted |
| `morphing-cursor.tsx` (`MagneticText`, animated width/height) | deleted |
| `meme-layer.tsx` (emoji-on-every-hover) | replaced by `meme-hover.tsx` — original art, 8 marked elements, §7.1 |
| `custom-cursor.tsx` + `.cursor-none-all` | replaced by `pointer.tsx` — `quickTo`-driven, guarded, §7.1 |
| `spotlight-card.tsx` (glow cards) | deleted |
| Hero stat band (`7 companies` was wrong — 6 companies, 7 entries) | deleted; numbers now sit beside the work that earned them |

Result: four permanent RAF loops → one (GSAP's shared ticker, which idles when
nothing is tweening). Landing First Load JS 99.1 kB → 92.5 kB, *including* GSAP
and Motion.

### Selected work — the three, and why only three

Featured work is **Balinex**, **Mdotcar**, and **Madomotor**: the projects with a
live URL anyone can open right now. That is the selection criterion — a link
that resolves beats a metric nobody can check.

Each preview shows its live surfaces as **plain text** (`app.balinex.com`,
`/client`, `/expert`). The whole row is already one link to the case study, and
nesting `<a>` inside `<a>` is invalid HTML; the clickable versions live in the
case study's **Live** block.

Everything else with real evidence — Dijlah's app fleet, iAuth, Unitour — sits
under *Also shipped* and keeps its own case study. Demoted, not deleted:
Dijlah still carries the strongest numbers on the site (500+ store reviews,
6+ apps), it just has no URL to open.

A project with no outcome figures (Mdotcar today) is still featured. The premise
and the live link carry it, and inventing a number to fill the gap is the one
thing this document forbids outright.

### Availability & location policy

Relocation and visa-sponsorship copy is **removed from everything public**:
the hero, contact, résumé header, base summary, page description, and OG card.
Personal location is a single `location` field in `data_en.json`, currently
`"Yerevan, Armenia"`. Experience entries keep their own `location`, because
those are employment facts — where the work happened — not a statement about
where the author is now.

The country-targeted résumé variants (`romania`, `netherlands`, `germany`,
`remote`) still carry relocation copy by design: they are opt-in tools reached
only via `/resume?variant=<name>` and exist precisely to be sent to one employer.

Still open, tracked in `needsInput` per project in `src/data/projects.ts`:
no project imagery of any kind, no team-size or scale figures, no writing
content (so no Writing section ships).

## Change log

- **v1 (2026-07-20)** — Established from the Loop 0 audit. Defines the "Editorial
  Index" direction, semantic tokens for both themes, the AA accent-contrast fix,
  the motion/sound budgets, and the anti-pattern list that governs removal of the
  canvas background, global scramble text, meme layer, and hidden native cursor.
  Implemented across Loops 3–9; appendices A and B record what shipped.
