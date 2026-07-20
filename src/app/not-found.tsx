import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] w-full max-w-content flex-col justify-center px-gutter py-section"
    >
      <p className="font-mono text-micro uppercase text-muted-foreground">
        404
      </p>
      <h1 className="mt-5 max-w-[18ch] text-h1 text-foreground">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-prose text-body text-muted-foreground">
        Either the link is stale or I moved something. Both are fixable.
      </p>

      <nav aria-label="Recovery" className="mt-10">
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <Link
              href="/"
              className="link-rule inline-flex min-h-[44px] items-center text-body text-foreground"
            >
              Back to the start
            </Link>
          </li>
          <li>
            <Link
              href="/#work"
              className="link-rule inline-flex min-h-[44px] items-center text-body text-foreground"
            >
              Selected work
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              className="link-rule inline-flex min-h-[44px] items-center text-body text-foreground"
            >
              Résumé
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
