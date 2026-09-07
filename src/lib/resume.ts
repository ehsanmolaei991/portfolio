import baseData from "@data/data_en.json";
import romania from "@data/variants/romania.json";
import netherlands from "@data/variants/netherlands.json";
import germany from "@data/variants/germany.json";
import remote from "@data/variants/remote.json";
import full from "@data/variants/full.json";

/**
 * Single source of truth = data_en.json (the "base" resume).
 *
 * A variant is a small overlay that overrides only what changes for a given
 * target (a country, a company, a specific role). This is how we tailor a
 * resume in seconds instead of maintaining N copies of a Word file.
 *
 * A variant may override any top-level field of the base — most commonly:
 *   - applicationAs   (the headline title)
 *   - summary         (the pitch)
 *   - relocationNote  (the availability line)
 *   - skills          (reordered / trimmed keyword set)
 *
 * To add a new variant:
 *   1. create src/data/variants/<name>.json
 *   2. import it and add it to the `variants` map below
 *   3. view it at /?variant=<name>  or  build a PDF with `npm run pdf -- <name>`
 */

export interface RichOption {
  type: "bold" | "link";
  search: string;
  href?: string;
}

export interface RichBlock {
  value: string;
  options?: RichOption[];
}

export interface Contact {
  id: string;
  title: string;
  value: string;
  link: string;
}

export interface Company {
  name: string;
  href?: string;
}

export interface Experience {
  startDate: string;
  endDate?: string;
  company: Company;
  location?: string;
  position: string;
  achievements: RichBlock[];
}

export interface Education {
  startDate: string;
  endDate?: string;
  degree: string;
  location: string;
}

export interface MiscItem {
  title: string;
  level?: string;
}

export interface MiscGroup {
  id: string;
  title: string;
  list: MiscItem[];
}

export interface Resume {
  firstName: string;
  lastName: string;
  applicationAs: string;
  /** Personal location, country-level only. Experience entries keep their own. */
  location: string;
  tagline?: string;
  contacts: Contact[];
  summary: RichBlock;
  experiences: Experience[];
  skills: { frontend: string[]; tools: string[]; ai: string[]; soft: string[] };
  educations: Education[];
  knowledgeAndIntrest?: MiscGroup[];
  /** Variant knobs: trim to a 1-page version. */
  compact?: boolean;
  /** Keep only the N most recent roles. `null` or absent means all of them. */
  limitExperiences?: number | null;
}

const base = baseData as unknown as Resume;

const variants: Record<string, Partial<Resume>> = {
  romania: romania as unknown as Partial<Resume>,
  netherlands: netherlands as unknown as Partial<Resume>,
  germany: germany as unknown as Partial<Resume>,
  remote: remote as unknown as Partial<Resume>,
  full: full as unknown as Partial<Resume>,
};

export function listVariants(): string[] {
  return Object.keys(variants);
}

/** "03/2025" -> 202503. An empty end date means "present", so it sorts highest. */
function monthKey(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const [mm, yyyy] = value.split("/");
  return Number(yyyy) * 100 + Number(mm);
}

/**
 * Newest first, always.
 *
 * The data file happens to be in this order today, but that is a convention
 * nobody enforces — one appended entry and the résumé silently reads
 * oldest-first. Sorting here makes the order a property of the code, and it is
 * what `limitExperiences` depends on: trimming to one page must keep the most
 * recent roles, not whichever ones happen to be listed first.
 */
function byMostRecent(a: Experience, b: Experience): number {
  const end = monthKey(b.endDate, Infinity) - monthKey(a.endDate, Infinity);
  if (end !== 0) return end;
  return monthKey(b.startDate, 0) - monthKey(a.startDate, 0);
}

export function getResume(variant?: string | string[]): Resume {
  const name = Array.isArray(variant) ? variant[0] : variant;
  const overlay = name ? variants[name] : undefined;
  // Shallow overlay: any key present in the variant replaces the base key.
  const merged = overlay ? { ...base, ...overlay } : base;
  return { ...merged, experiences: [...merged.experiences].sort(byMostRecent) };
}
