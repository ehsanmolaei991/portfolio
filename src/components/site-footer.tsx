import Link from "next/link";

export function SiteFooter({
  name,
  pdfHref,
}: {
  name: string;
  pdfHref: string;
}) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-gutter py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-muted-foreground">
          © {new Date().getFullYear()} {name}
        </p>

        <nav aria-label="Résumé formats">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/resume"
                className="link-rule inline-flex min-h-[44px] items-center text-small text-foreground"
              >
                Résumé
              </Link>
            </li>
            <li>
              <a
                href={pdfHref}
                download
                data-meme="pdf"
                className="link-rule inline-flex min-h-[44px] items-center text-small text-foreground"
              >
                Download résumé (PDF)
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
