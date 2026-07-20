/**
 * Renders the social preview card to public/og.png (1200×630).
 *
 * Deliberately a build-time script rather than next/og at runtime: the image is
 * static, so there is no reason to pay for it on every request — and this keeps
 * the "no network at build time" rule intact, since it renders local HTML with
 * system fonts only.
 *
 *   npm run og
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  readFileSync(resolve(root, "src/data/data_en.json"), "utf8")
);

const name = `${data.firstName} ${data.lastName}`;
const role = data.applicationAs;
const note = data.location ?? "";

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px;
    background: hsl(216 24% 7%);
    color: hsl(210 20% 92%);
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
  }
  .eyebrow {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 20px; letter-spacing: 0.18em; text-transform: uppercase;
    color: hsl(214 12% 62%);
  }
  h1 {
    font-family: "Iowan Old Style", Palatino, Georgia, serif;
    font-weight: 400; font-size: 104px; line-height: 1.02;
    letter-spacing: -0.02em; margin-top: 28px;
  }
  .value { font-size: 28px; line-height: 1.5; color: hsl(214 12% 72%); max-width: 34ch; margin-top: 28px; }
  .foot { display: flex; align-items: center; gap: 16px; border-top: 1px solid hsl(215 16% 18%); padding-top: 28px; }
  .dot { width: 10px; height: 10px; border-radius: 999px; background: hsl(186 70% 58%); }
  .foot span { font-size: 22px; color: hsl(214 12% 62%); }
  .site { margin-left: auto; font-family: ui-monospace, Menlo, monospace; font-size: 20px; color: hsl(186 70% 58%); }
</style></head>
<body>
  <div>
    <p class="eyebrow">${role}</p>
    <h1>${name}</h1>
    <p class="value">Trading screens, sign-in flows, and the design systems that keep them consistent.</p>
  </div>
  <div class="foot">
    <span class="dot"></span>
    <span>${note}</span>
    <span class="site">ehsanmolaei.ir</span>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "load" });
const buffer = await page.screenshot({ type: "png" });
await browser.close();

const out = resolve(root, "public/og.png");
writeFileSync(out, buffer);
console.log(`Wrote ${out} (${(buffer.length / 1024).toFixed(1)} kB)`);
