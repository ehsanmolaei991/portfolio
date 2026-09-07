/**
 * Inlines the stylesheet into every exported HTML page. Runs after `next build`.
 *
 * A `<link rel="stylesheet">` is render-blocking: nothing paints until the
 * browser has made a second round trip for it. The whole sheet is ~6 kB
 * compressed (Tailwind, purged), so the cheapest fix is to ship it inside the
 * HTML and skip the round trip. Next 15 has `experimental.inlineCss` for
 * exactly this; on 14 it is this post-build step.
 *
 * The `<link>` stays in the document because React's hydration looks the
 * stylesheet up by href — if it is missing, React inserts a fresh one and
 * fetches the CSS again. Its `type` becomes text/plain: the HTML spec defines
 * the type attribute as a hint that lets a browser skip fetching a resource
 * it cannot use for that link relation, and Chromium indeed makes no request
 * (whereas `disabled`, which sounds like the obvious choice, still fetches).
 * React's lookup ignores `type`, so hydration and client-side navigation
 * carry on as if nothing changed.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "out");

// Exactly what Next 14 emits. Anchored on purpose: if a Next upgrade changes
// the markup this stops matching and the build fails loudly below, rather than
// silently shipping a render-blocking stylesheet again.
const STYLESHEET_LINK =
  /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+\.css)"([^>]*)\/>/g;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

const sheets = new Map();
function stylesheet(href) {
  if (!sheets.has(href)) {
    const css = readFileSync(join(OUT, href), "utf8").trim();
    if (css.includes("</style")) {
      throw new Error(`${href} contains "</style" and cannot be inlined`);
    }
    sheets.set(href, css);
  }
  return sheets.get(href);
}

let pages = 0;
for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  let hits = 0;
  const inlined = html.replace(STYLESHEET_LINK, (_tag, href, attrs) => {
    hits++;
    return `<style>${stylesheet(href)}</style><link rel="stylesheet" href="${href}"${attrs} type="text/plain"/>`;
  });
  if (hits === 0) continue;
  writeFileSync(file, inlined);
  pages++;
}

if (pages === 0) {
  console.error(
    "inline-css: no stylesheet <link> found in out/ — did Next change its HTML?"
  );
  process.exit(1);
}
console.log(
  `inline-css: inlined ${sheets.size} stylesheet(s) into ${pages} page(s)`
);
