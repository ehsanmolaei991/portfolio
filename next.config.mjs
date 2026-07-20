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
};

export default nextConfig;
