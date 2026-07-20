import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume-document";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "The full résumé of Ehsan Molaei, Senior Frontend Engineer — experience, skills, education. Also available as a selectable-text PDF.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeDocument />;
}
