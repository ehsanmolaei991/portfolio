import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export.
   *
   * Every route on this site is knowable at build time — the landing page, the
   * case studies, the résumé and its variants. Nothing reads a request. So the
   * build emits plain files into `out/`, which is the cheapest, fastest and
   * least breakable thing to put behind Cloudflare: no server runtime, no cold
   * starts, no origin to secure.
   *
   * The one constraint this imposes: no `searchParams` in server components, no
   * route handlers, no ISR. If any of those are ever needed, this is the line
   * that has to change (and the deploy target with it).
   */
  output: "export",

  /** No Image Optimization server exists in a static export. */
  images: { unoptimized: true },

  /**
   * Emit `out/resume/index.html` rather than `out/resume.html`, so the same
   * URLs work on any static host without relying on host-specific rewrites.
   */
  trailingSlash: true,

  webpack(config, { isServer, webpack }) {
    if (!isServer) {
      /**
       * Next's client entry imports a small polyfill module (Array.prototype.at,
       * flat/flatMap, Object.fromEntries, Object.hasOwn, trimStart/trimEnd) for
       * browsers that support ES modules but predate those APIs. Every browser
       * in the `browserslist` floor in package.json has had all of them for
       * years, so for this site it is dead code — and Lighthouse's "Legacy
       * JavaScript" audit flags it on every load. Swap it for an empty module.
       *
       * If the floor is ever lowered below Chrome 93 / Safari 15.4, remove this.
       * If Next moves the file, the pattern stops matching and the polyfills
       * quietly come back, which is the safe direction to fail.
       */
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[\\/]next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module\.js$/,
          fileURLToPath(new URL("./scripts/empty-module.js", import.meta.url))
        )
      );
    }
    return config;
  },
};

export default nextConfig;
