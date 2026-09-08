# ELARA

A responsive ELARA Lab website, built with React and Vinext. The site presents
the lab's public vision and mission for autonomy-preserving embodied AI.

## Develop

Use Node.js 22.13 or newer and pnpm 11.19.0.

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

The static website is exported to `dist/client/`.
The build also prepares `students/index.html` so the separate `/students/`
page works on GitHub Pages without routing rules.

## GitHub updates

The source repository is [92camile/ELARA](https://github.com/92camile/ELARA).
The workflow in `.github/workflows/pages.yml` validates pull requests and
the `codex/elara-website` branch, and publishes pushes to `main`.
GitHub Pages uses **Settings / Pages / Source / GitHub Actions**.
The existing custom domain is `elaralab.org`.

The workflow obtains the repository base path from GitHub Pages, so project
repositories and user sites use the appropriate asset paths.
Local edits are not uploaded automatically; commit and push them to trigger
deployment. Never put passwords or tokens in this repository.

The existing repository history and root files are retained. The static build
preserves the old `/clock.html` page and assets, and redirects `/people.html`
to `/students/`. Website content is now maintained in `app/`; the old root
`index.html` is retained as legacy source and is not the deployment artifact.

Edit `app/page.tsx` for text and `app/globals.css` for the visual design.

## Brand and news sources

The design follows [elaralab.org](https://elaralab.org): white surfaces,
red (#e31745) and purple (#6f237f), rounded cards, and bold sans-serif headings.
`public/elara-logo.png` is the existing logo downloaded from that site.

Edit `lib/news.ts` to add articles, using verified publisher dates, short
original summaries, and direct article links. Entries are ordered newest first.
The current three stories were verified against University of Houston,
InnovationMap, and Purdue Polytechnic on September 7, 2026. Public LinkedIn
search results helped locate this coverage; full access to Chorong Park's
[profile](https://www.linkedin.com/in/cparkphd) required sign-in, so the current
list is not a complete import of the profile's articles. There is no automatic
LinkedIn synchronization.

## Current students

The separate `/students/` page contains the four student profiles supplied
in the Word document. Edit `lib/students.ts` for biographies, interests,
and public contact links. Photos are stored in `public/students/`.
The page uses the lab logo and no personal links for Anika, reflecting the
preferences in the supplied profile. Jana's supplied university email is
used instead of her personal address. Levi's role does not assume that the
planned change of major has already taken place.

## Local validation

`pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm verify` check code and the
exported website. `pnpm verify` requires a prior build.

This Windows host has intermittently reported `UV_HANDLE_CLOSING` during
Vinext shutdown after prerendering. Treat a nonzero build exit as a failure
even if exported files are present. The Linux GitHub workflow has not been
run yet; deployment is not verified.
