# Local portfolio case studies

Nine destinations linked from the personal homepage are now hosted at
`https://elaralab.org/projects/<slug>/`. Both Microsoft summary cards and all
company rows link internally, using the site's configurable base path. The
`/projects/` directory presents all nine pages together. It includes all seven
entries from the original Industry index, plus Microsoft Care Team and the
PathAI biography archive. The university collaboration with Beijing Normal
University/Purdue is explicitly distinguished from company work.

## Source and fidelity

The source is the user's existing `Website/website-complete` Squarespace archive,
not newly generated case-study copy. Each `content/projects/*.json` records its
source URL, full-document SHA-256, normalized original text and text SHA-256,
ordered image manifest with original paths and hashes, document URLs, video URLs,
and an allowlisted rich-content tree.

The import preserves all body wording, punctuation, lists, quotations, captions,
33 images (including the animated GIF), 14 Google Drive document links, and the
Microsoft Care Team YouTube walkthrough. Images are copied byte-for-byte into
`public/images/projects`. Two extensionless images receive their actual format's
extension so static hosting serves the correct media type. No crop or re-encoding
is applied. Images can be opened at original resolution.

The surrounding Squarespace header, footer, previous/next navigation, spacer
blocks, editor configuration, scripts, and styles are excluded. ELARA supplies
responsive typography, navigation, and an archive note. Original h1 elements
become h2 elements beneath the page's single new company heading; wording is not
changed. Original document links still open their existing Google Drive files,
and the original video remains a YouTube embed with a fallback link.

PathAI originally linked to `/about-me`, not a dedicated case study. The complete
biography is preserved at `/projects/pathai-portfolio-background/` and explicitly
labeled historical, with a link to the current biography. Its student-era roles
and peer feedback must not be misrepresented as current roles or endorsements.

## Reproduction and checks

`scripts/import-portfolio.py <archive-directory>` requires Python and
`beautifulsoup4==4.13.4`. This one-time import dependency is not required by the
site, CI, or normal builds. The importer fails on unknown content tags, unsafe
URLs, missing assets, changed text, media omissions, or reordered media. It also
compares the Industry index against the import list and records its complete
source inventory in `content/portfolio-industry-index.json`.

`pnpm test` checks content text, image bytes, expected media counts and ordering,
and the renderer's content allowlist. `pnpm verify` checks exported wording,
original images, links, internal homepage destinations, canonicals, and sitemap
coverage. All nine pages, their images, and the project directory are included
in the XML sitemap. A regression test requires every original Industry index
entry to have exactly one corresponding local page.
