import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/projects";
import { SITE_URL } from "@lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Trailing slashes throughout, to match `trailingSlash: true` in
  // next.config.mjs — otherwise the sitemap advertises URLs that redirect.
  // Résumé variants are deliberately absent: they are noindex.
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/resume/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...getProjectSlugs().map((slug) => ({
      url: `${SITE_URL}/work/${slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
