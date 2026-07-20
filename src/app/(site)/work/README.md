# Case-study route — currently disabled

`[slug]/page.tsx` is renamed to `page.tsx.disabled`, so Next does not treat it
as a route. Every project links straight to the company's own site instead.

**Why it is a rename and not a deletion:** with `output: "export"`, a dynamic
route whose `generateStaticParams()` returns an empty array fails the build
outright:

    Error: Page "/work/[slug]" is missing "generateStaticParams()" so it
    cannot be used with "output: export" config.

So the route cannot simply sit there unused waiting for a project to qualify.

## To bring it back

1. Rename `page.tsx.disabled` back to `page.tsx`.
2. Set `caseStudy: true` on at least one project in `src/data/projects.ts` —
   an empty list breaks the build again.

The written material (context, problem, decisions, implementation) is still in
`projects.ts` for every project; nothing was thrown away.

Note: `.disabled` files are outside `tsconfig` and ESLint globs, so this file
is not type-checked while it sits here. Expect to fix a couple of imports when
you re-enable it.
