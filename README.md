# Ehsan Molaei — Resume / CV

A data-driven, ATS-friendly résumé built with Next.js + Tailwind. One source of
truth (`src/data/data_en.json`) renders to **web** and to a **selectable-text PDF**,
and can be **tailored per job** in seconds via variant overlays.

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

## Editing your content

Everything lives in **`src/data/data_en.json`** — contacts, summary, experience,
skills, education, languages. Inline emphasis (bold / teal link) is data-driven via
each block's `options` array:

```jsonc
{
  "value": "Optimized the iAuth system, boosting efficiency by 20%.",
  "options": [
    { "type": "bold", "search": "iAuth" },
    { "type": "bold", "search": "20%" },
    { "type": "link", "search": "iAuth", "href": "https://example.com" }
  ]
}
```

## Tailoring per job (variants)

A **variant** overrides only what changes for a target (a country, a company, a role).
Ready-made variants: **`romania`**, **`netherlands`**, **`germany`**, **`remote`**, and
**`short`** (a 1-page `compact` version). View any at **`/resume?variant=<name>`**.

To add your own:

1. Copy `src/data/variants/romania.json` → `src/data/variants/<name>.json`.
2. Override `applicationAs`, `summary`, `relocationNote` (and `compact` / `limitExperiences` for a 1-pager).
3. Register it in `src/lib/resume.ts` (`variants` map).
4. View it at **`/resume?variant=<name>`**.

## Generating the PDF (ATS-safe, selectable text)

```bash
npx playwright install chromium   # one time
npm run build
npm run pdf                 # base résumé, A4  -> public/Ehsan-Molaei-Frontend.pdf
npm run pdf -- romania      # the romania variant, A4
npm run pdf -- romania letter   # US Letter (for US-style roles)
npm run pdf:all             # base + every variant
```

The PDF has **real, selectable text** (not an image) so Applicant Tracking Systems
parse it correctly. No network is required at build time (system font stack).

> No Playwright? You can also open the résumé in a browser and use
> **Cmd/Ctrl + P → Save as PDF** — the print stylesheet produces a clean A4 page.

## Application kit & strategy

- **[`docs/JOB-STRATEGY.md`](docs/JOB-STRATEGY.md)** — Romania Blue Card, EU/remote routes, the sanctions/payment reality, and a 30/60/90-day plan.
- **[`docs/COVER-LETTER.md`](docs/COVER-LETTER.md)** — reusable cover-letter template + a filled example.
- **[`docs/LINKEDIN.md`](docs/LINKEDIN.md)** — headline, About, and top-skills text to paste into LinkedIn.

## Structure

```
src/
  app/page.tsx         # the résumé (server component, reads ?variant=)
  app/layout.tsx       # metadata / SEO
  data/data_en.json    # ← single source of truth
  data/variants/*.json # tailored overlays
  lib/resume.ts        # base + variant merge, types
  styles/globals.css   # design + print/PDF stylesheet
scripts/generate-pdf.mjs
docs/JOB-STRATEGY.md
```
