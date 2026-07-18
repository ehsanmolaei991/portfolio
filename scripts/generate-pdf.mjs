#!/usr/bin/env node
/**
 * Deterministic, ATS-friendly PDF generator.
 *
 * It boots the Next.js production server, opens the resume in *print* media,
 * and writes a PDF with real, selectable text (not an image) — which is what
 * Applicant Tracking Systems need to parse your CV correctly.
 *
 * Usage:
 *   npm run pdf                     # base resume, A4  -> public/Ehsan-Molaei-Frontend.pdf
 *   npm run pdf -- romania          # the "romania" variant, A4
 *   npm run pdf -- romania letter   # the "romania" variant, US Letter
 *   npm run pdf -- all              # base + every variant in src/data/variants
 *
 * Prereqs (once):
 *   npm install
 *   npx playwright install chromium
 *   npm run build            # produce the production build the server serves
 */
import { spawn } from "node:child_process";
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORT = Number(process.env.PDF_PORT || 3210);
const BASE = `http://127.0.0.1:${PORT}`;
const OUT_DIR = join(ROOT, "public");

const NAME = "Ehsan-Molaei-Frontend";

function listVariants() {
  const dir = join(ROOT, "src", "data", "variants");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const format = args.includes("letter") ? "letter" : "a4";
  const rest = args.filter((a) => a !== "letter" && a !== "a4");
  const target = rest[0] || "base";
  return { format, target };
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not start within ${timeoutMs}ms at ${url}`);
}

async function renderOne(browser, variant, format) {
  const suffix = variant ? `-${variant}` : "";
  const query = variant ? `?variant=${encodeURIComponent(variant)}` : "";
  const outFile = join(OUT_DIR, `${NAME}${suffix}.pdf`);

  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(`${BASE}/resume${query}`, { waitUntil: "networkidle" });

  const pdfOpts =
    format === "letter"
      ? {
          path: outFile,
          format: "Letter",
          printBackground: true,
          margin: { top: "13mm", bottom: "13mm", left: "15mm", right: "15mm" },
        }
      : { path: outFile, printBackground: true, preferCSSPageSize: true };

  await page.pdf(pdfOpts);
  await page.close();
  console.log(`  ✓ ${outFile.replace(ROOT + "/", "")}  [${format.toUpperCase()}]`);
}

async function main() {
  const { format, target } = parseArgs();
  const variants = listVariants();

  let toRender; // null entry = base resume
  if (target === "all") toRender = [null, ...variants];
  else if (target === "base") toRender = [null];
  else if (variants.includes(target)) toRender = [target];
  else {
    console.error(
      `Unknown variant "${target}". Available: ${["base", ...variants].join(", ")}`,
    );
    process.exit(1);
  }

  if (!existsSync(join(ROOT, ".next"))) {
    console.error('No production build found. Run "npm run build" first.');
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Starting Next.js server on ${BASE} ...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
    env: process.env,
  });

  let browser;
  try {
    await waitForServer(BASE);
    const { chromium } = await import("playwright");
    browser = await chromium.launch();
    console.log(`Rendering ${toRender.length} PDF(s):`);
    for (const v of toRender) await renderOne(browser, v, format);
    console.log("Done.");
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
