# ELARA

A responsive ELARA launch website, built with React and Vinext. The current
copy is a coming-soon introduction until ELARA's purpose and final content
are supplied.

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
every push to `main`. In the destination repository, select **Settings > Pages

> Source > GitHub Actions**. A repository URL and authenticated Git access are
> required for the initial push. Neither is configured yet.

The workflow obtains the repository base path from GitHub Pages, so project
repositories and user sites use the appropriate asset paths.
Local edits are not uploaded automatically; commit and push them to trigger
deployment. Never put passwords or tokens in this repository.

Edit `app/page.tsx` for text and `app/globals.css` for the visual design.

## Local validation

`pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm verify` check code and the
exported website. `pnpm verify` requires a prior build.

On this Windows host, Vinext completed prerendering but Node crashed during
shutdown with `UV_HANDLE_CLOSING`. The exported files are present, but the
build command currently exits unsuccessfully. The Linux GitHub workflow has
not been run yet; deployment is not verified.
