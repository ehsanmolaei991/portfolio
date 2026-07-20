import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeDocument } from "@/components/resume-document";
import { listVariants } from "@lib/resume";

/**
 * One static page per tailored résumé: /resume/romania, /resume/germany, …
 *
 * Previously these were `/resume?variant=romania`, which required a server at
 * request time for what is a fixed, known set of documents.
 *
 * Not indexed: these are targeting documents meant to be sent to one employer,
 * not public pages competing with the canonical résumé.
 */
export function generateStaticParams() {
  return listVariants().map((variant) => ({ variant }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { variant: string };
}): Metadata {
  const name = params.variant;
  return {
    title: `Résumé — ${name}`,
    description: `Résumé of Ehsan Molaei, Senior Frontend Engineer, tailored for ${name}.`,
    robots: { index: false, follow: false },
  };
}

export default function ResumeVariantPage({
  params,
}: {
  params: { variant: string };
}) {
  if (!listVariants().includes(params.variant)) notFound();
  return <ResumeDocument variant={params.variant} />;
}
