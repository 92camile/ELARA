import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  articleStructuredData,
  canonicalUrl,
  createRobots,
  createSitemap,
  serializeStructuredData,
} from '../lib/seo.mjs';
import { getPublishedStories } from '../lib/stories.mjs';

test('canonical URLs stay on the production domain and support repository base paths', () => {
  assert.equal(canonicalUrl('/'), 'https://elaralab.org/');
  assert.equal(
    canonicalUrl('/news/a-story/', '/ELARA'),
    'https://elaralab.org/ELARA/news/a-story/',
  );
  for (const route of [
    'https://example.com/',
    '//example.com/',
    '/news/?preview=1',
    '/news/#top',
    '/\\example.com',
  ])
    assert.throws(() => canonicalUrl(route));
  assert.throws(() => canonicalUrl('/', '/../elsewhere'));
});

test('sitemap discovers all canonical pages and original images, without external links or invented timestamps', () => {
  const stories = getPublishedStories();
  for (const base of ['', '/ELARA']) {
    const sitemap = createSitemap(stories, base);
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(urls, [
      canonicalUrl('/', base),
      canonicalUrl('/students/', base),
      ...stories.map((story) => canonicalUrl(`/news/${story.slug}/`, base)),
    ]);
    assert.equal(new Set(urls).size, urls.length);
    const images = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(
      images,
      stories.flatMap((story) =>
        story.photos.map((photo) => canonicalUrl(photo.src, base)),
      ),
    );
    assert.doesNotMatch(
      sitemap,
      /<lastmod>|linkedin\.com|people\.html|clock\.html|#news/,
    );
    assert.equal(
      createRobots(base),
      `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl('/sitemap.xml', base)}\n`,
    );
  }
});

test('article markup describes the published ELARA article and preserves every source image', () => {
  for (const story of getPublishedStories()) {
    const data = articleStructuredData(story, '');
    assert.equal(data.headline, story.title);
    assert.equal(data.description, story.summary);
    assert.equal(data.datePublished, story.publishedDate);
    assert.equal(
      data.mainEntityOfPage['@id'],
      canonicalUrl(`/news/${story.slug}/`, ''),
    );
    assert.deepEqual(
      data.image || [],
      story.photos.map((photo) => canonicalUrl(photo.src, '')),
    );
    assert.deepEqual(
      data.citation,
      story.sources.map((source) => source.url),
    );
    assert.equal(data.author.name, 'ELARA Lab');
    assert.ok(!('dateModified' in data));
  }
});

test('JSON-LD serialization cannot close its script element', () => {
  const data = { headline: '</script><script>alert("x")</script>' };
  const serialized = serializeStructuredData(data);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});
