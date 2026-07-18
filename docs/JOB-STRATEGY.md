# Job Search & Relocation Strategy — Ehsan Molaei

_Senior Frontend Engineer · targeting Romania, wider EU (DE/NL), and remote-first roles._

This document is the "why" and "how" behind the resume system in this repo. The
resume is the tool; this is the plan.

---

## 0. The one idea that changes everything

Your blocker is **not your skill** — it's your **residency**. As an Iran‑resident
engineer you hit three walls that have nothing to do with how good you are:

1. **Sanctions (OFAC).** Many companies won't hire or _pay_ someone resident in
   Iran, and most payment rails (Wise, PayPal, Stripe, many EORs like Deel/Remote)
   don't serve Iran.
2. **Payments.** Even when a company is willing, getting salary _into_ an Iranian
   bank account legally and reliably is hard.
3. **Visa logistics.** Passport appointments, embassy access, and Schengen visas
   are slow and often must be done from a third country.

**All three collapse the moment you are resident somewhere else.** So the entire
strategy is: **get out of the "Iran‑resident" bucket as fast as possible**, ideally
via a job that relocates you. Relocation beats remote contracting for you — a remote
contract you can't get paid for is worthless.

---

## 1. Correct the visa assumption (important)

> "I can get a job visa from Romania through my aunt."

A **work visa / EU Blue Card comes from an employer, not a relative.** Your aunt
cannot sponsor a work visa. What she _can_ do is hugely valuable, just different:

- Give you a **local address** and in‑country support.
- Help you find and vet **Romanian employers**.
- Possibly open a **family‑reunification** route (different rules, usually needs a
  qualifying relationship + her legal status; check with a Romanian immigration
  lawyer whether an aunt→nephew relationship qualifies — often it does **not** for
  reunification, which is why the **employer route is the realistic one**).

So the real task remains: **land a Romanian (or EU) employer who sponsors.**

---

## 2. Two realistic paths (run them in parallel)

### Path A — Direct EU relocation with sponsorship (Romania as the door)

Romania relaxed its EU Blue Card in 2024: valid up to **3 years**, **professional
experience can substitute for a degree**, ~**30‑day** processing, and it's now in
**Schengen (2025)** — so it's a genuine EU foothold you can later move _out of_ to
higher‑paying countries.

- Salary threshold: roughly **1.5× the national average gross wage** for the role
  (very achievable for a senior frontend role).
- Employers known to sponsor: **UiPath, Bitdefender, Endava, Luxoft, Amazon &
  Google Romania**, plus many software outsourcing firms (Softvision, Pentalog,
  Fortech, etc.). Outsourcing firms sponsor the most and are the easiest first door.
- Reference: [EU Blue Card Romania — European Commission](https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/eu-blue-card/eu-blue-card-romania_en)

### Path B — Bridge country first (often the fastest unlock)

Move to **UAE, Turkey, Armenia, or Georgia** to establish **non‑Iran residency +
a working international bank account**. This single move:

- removes the **payment** blocker (you can now be paid),
- massively widens **remote** options (companies can legally onboard you),
- makes EU visa applications far easier (apply from a functioning embassy).

Many Iranian engineers do exactly this, then jump to the EU within 6–12 months.
Georgia/Armenia are cheap and visa‑light for Iranians; UAE has the strongest
banking; Turkey is a common tech hub. Treat this as a **stepping stone**, not a
destination.

### Also worth targeting: Germany & Netherlands

Higher salaries than Romania and strong skilled‑migration routes:

- **Netherlands** — the _Highly Skilled Migrant_ permit + the **30% tax ruling** is
  excellent for React/Next devs. Employer must be a recognized sponsor (most tech
  companies are).
- **Germany** — EU Blue Card, huge demand, [Make it in Germany](https://www.make-it-in-germany.com/en/)
  is the official portal.

---

## 3. Where to apply (relocation / sponsorship‑filtered)

| Channel | Why |
| --- | --- |
| [relocate.me](https://relocate.me) | Explicitly relocation + visa jobs |
| [Landing.jobs](https://landing.jobs) | EU (esp. PT/EU), relocation‑friendly |
| [arbeitnow.com](https://www.arbeitnow.com) (visa‑sponsor filter) | Germany, sponsorship filter |
| [Honeypot](https://www.honeypot.io) | Germany/NL, devs get approached |
| EU Blue Card boards / [apply.eu](https://www.apply.eu) | Blue Card‑specific roles |
| Company career pages (UiPath, Bitdefender, Endava, Adyen, Booking, Miro…) | Direct = best conversion |
| LinkedIn (`Easy Apply` off; filter "visa sponsorship") | Recruiter reach + referrals |

**Referrals convert 5–10× better than cold applications.** Your aunt in Romania and
any ex‑colleagues already abroad are your highest‑leverage channel. Ask them to
refer you internally, not just "share a job link."

---

## 4. How to use this repo to tailor per job

The resume is data‑driven, so tailoring is fast and doesn't degrade quality.

- **Base resume:** `src/data/data_en.json` → view at `/`.
- **A tailored variant:** copy `src/data/variants/romania.json` to
  `src/data/variants/<company-or-market>.json`, override the `applicationAs`,
  `summary`, and (optionally) `relocationNote`, register it in
  `src/lib/resume.ts`, then view at `/?variant=<name>`.
- **Generate the PDF** (selectable text, ATS‑safe):
  ```bash
  npm install && npx playwright install chromium   # one time
  npm run build
  npm run pdf                 # base, A4  -> public/Ehsan-Molaei-Frontend.pdf
  npm run pdf -- romania      # romania variant, A4
  npm run pdf -- romania letter   # US Letter (for US‑style remote roles)
  npm run pdf:all             # base + every variant
  ```

**Tailoring rule of thumb:** read the job post, and make sure the exact keywords it
uses (e.g. "micro‑frontends", "design system", "TypeScript", "testing") appear
verbatim in your summary/skills if they're true for you. ATS ranks on keyword match.

---

## 5. Application hygiene (senior‑level details that matter)

- **One PDF, real text, ≤2 pages.** Never a screenshot/exported image — ATS can't
  read it. This repo's PDF is real text; good.
- **File name = `Ehsan-Molaei-Frontend.pdf`**, not `resume-final-v3.pdf`.
- **Lead with the relocation signal.** "Open to relocation & visa sponsorship" is
  already in the header — it pre‑answers the recruiter's first worry.
- **Quantify.** You already have %s (30%, 40%, 50%) — keep them; they're your edge.
- **LinkedIn must mirror the resume** (same title, same top skills). Recruiters
  search LinkedIn first. Set "Open to work" → relocation, and location to your
  target region if allowed.
- **Short cover note** (3 short paragraphs): who you are, one proof point, why _this_
  company + that you're relocation‑ready. Reuse per company with light edits.

---

## 6. 30 / 60 / 90 day plan

**Days 0–30 — set the base**
- Finalize this resume + LinkedIn (mirror it).
- Fix payments/logistics: start the **bridge‑country** research (Georgia/Armenia/UAE
  banking) in parallel — even if you aim for Romania, non‑Iran banking de‑risks
  everything.
- Ask your aunt for a shortlist of Romanian employers + any referral contacts.
- Apply to 5 outsourcing firms in Romania (highest sponsor rate) as calibration.

**Days 30–60 — volume + referrals**
- 5–10 tailored applications/week via the variant system.
- Turn on relocate.me / arbeitnow / Honeypot; get on recruiters' radar.
- Chase referrals hard (aunt, ex‑colleagues abroad, LinkedIn 2nd‑degree).

**Days 60–90 — convert**
- Interview loop: expect a take‑home / live coding — brush up React internals,
  performance, and system design for frontend.
- When an offer comes, get the **work authorization + Blue Card** process started
  immediately; keep the bridge‑country option warm as a fallback.

---

## 7. A note on legality / caution

Sanctions rules are real and change. Nothing here is legal advice. Before signing a
remote contract while still Iran‑resident, confirm the company/EOR can legally pay
you; and for any visa route, confirm current rules with the consulate or a licensed
immigration lawyer.

**Sources:**
[EU Blue Card Romania (EC)](https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/eu-blue-card/eu-blue-card-romania_en) ·
[Highly‑qualified worker in Romania (EC)](https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/highly-qualified-worker-romania_en) ·
[OFAC Iran sanctions program](https://ofac.treasury.gov/sanctions-programs-and-country-information/iran-sanctions) ·
[What US sanctions actually block for Iranian devs](https://www.abhs.in/blog/iran-sanctions-developers-github-npm-blocked-2026) ·
[Make it in Germany](https://www.make-it-in-germany.com/en/)
