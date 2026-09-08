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

## GitHub updates

The workflow in `.github/workflows/pages.yml` builds and deploys the site on
every push to `main`. In the destination repository, select **Settings / Pages /
Source / GitHub Actions**. A repository URL and authenticated Git access are
required for the initial push. Neither is configured yet.

The workflow obtains the repository base path from GitHub Pages, so project
repositories and user sites use the appropriate asset paths.
Local edits are not uploaded automatically; commit and push them to trigger
deployment. Never put passwords or tokens in this repository.

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

## Local validation

`pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm verify` check code and the
exported website. `pnpm verify` requires a prior build.

On this Windows host, Vinext completed prerendering but Node crashed during
shutdown with `UV_HANDLE_CLOSING`. The exported files are present, but the
build command currently exits unsuccessfully. The Linux GitHub workflow has
not been run yet; deployment is not verified.
