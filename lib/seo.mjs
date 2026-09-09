export const siteOrigin = 'https://elaralab.org';

export function canonicalUrl(
  route,
  base = process.env.NEXT_PUBLIC_BASE_PATH || '',
) {
  if (
    !/^(?:\/[A-Za-z0-9_.-]+)*$/.test(base) ||
    base.split('/').some((part) => part === '.' || part === '..')
  )
    throw new Error('Invalid site base path');
  if (!route.startsWith('/') || route.startsWith('//') || /[?#\\]/.test(route))
    throw new Error('Expected a local canonical path');
  return new URL(`${base}${route}`, siteOrigin).href;
}

function xml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** @param {import('./stories.mjs').Story[]} stories */
export function createSitemap(
  stories,
  base = process.env.NEXT_PUBLIC_BASE_PATH || '',
) {
  const entries = [
    { route: '/', photos: [] },
    { route: '/students/', photos: [] },
    ...stories.map((story) => ({
      route: `/news/${story.slug}/`,
      photos: story.photos,
    })),
  ];
  // Omit lastmod rather than misrepresent every rebuild as a content update.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map(({ route, photos }) => `  <url>\n    <loc>${xml(canonicalUrl(route, base))}</loc>${photos.map((photo) => `\n    <image:image><image:loc>${xml(canonicalUrl(photo.src, base))}</image:loc></image:image>`).join('')}\n  </url>`).join('\n')}\n</urlset>\n`;
}

export function createRobots(base = process.env.NEXT_PUBLIC_BASE_PATH || '') {
  return `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl('/sitemap.xml', base)}\n`;
}

/** @param {import('./stories.mjs').Story} story */
export function articleStructuredData(
  story,
  base = process.env.NEXT_PUBLIC_BASE_PATH || '',
) {
  const url = canonicalUrl(`/news/${story.slug}/`, base);
  const publisher = {
    '@type': 'Organization',
    name: 'ELARA Lab',
    url: canonicalUrl('/', base),
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: story.title,
    description: story.summary,
    datePublished: story.publishedDate,
    author: publisher,
    publisher,
    inLanguage: 'en',
    articleSection: story.category,
    ...(story.photos.length
      ? { image: story.photos.map((photo) => canonicalUrl(photo.src, base)) }
      : {}),
    citation: story.sources.map((source) => source.url),
  };
}

export function serializeStructuredData(data) {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
