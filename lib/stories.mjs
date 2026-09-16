import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

/**
 * @typedef {{id: string, label: string, url: string}} Source
 * @typedef {{text: string, sourceIds: string[]}} Paragraph
 * @typedef {{src: string, alt: string, caption: string, width: number, height: number, afterParagraph: number, sha256: string}} Photo
 * @typedef {Photo & {sourceId: string, sourceUrl: string}} SupplementalPhoto
 * @typedef {{slug: string, title: string, summary: string, category: string, postId: string, originalDate: string, publishedDate: string, updatedDate?: string, sourcePhotoCount: number, sources: Source[], paragraphs: Paragraph[], photos: Photo[], supplementalPhotos?: SupplementalPhoto[], review: {status: string, checkedOn: string, fullTextVerified: boolean, allPhotosVerified: boolean, notes: string}}} Story
 */

function date(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

/** Checks evidence bookkeeping, not the truth of a claim. A source review is still required. */
export function validateStories(stories, publicRoot = path.resolve('public')) {
  const slugs = new Set();
  const postIds = new Set();
  const today = new Date().toISOString().slice(0, 10);
  for (const story of stories) {
    assert.match(story.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs.has(story.slug), `Duplicate story: ${story.slug}`);
    assert.match(story.postId, /^\d{19}$/);
    assert.ok(!postIds.has(story.postId), `Duplicate post: ${story.postId}`);
    slugs.add(story.slug);
    postIds.add(story.postId);
    for (const field of ['title', 'summary', 'category'])
      assert.ok(typeof story[field] === 'string' && story[field].trim());
    for (const field of ['originalDate', 'publishedDate'])
      assert.ok(
        date(story[field]) && story[field] <= today,
        `Invalid ${field}`,
      );
    assert.ok(
      story.originalDate >= '2025-09-01' &&
        story.originalDate <= story.publishedDate,
    );
    if (story.updatedDate !== undefined) {
      assert.ok(
        date(story.updatedDate) &&
          story.updatedDate >= story.publishedDate &&
          story.updatedDate <= today,
        'Invalid update date',
      );
    }
    assert.equal(
      story.review?.status,
      'passed',
      'Unreviewed stories must not be published',
    );
    assert.equal(
      story.review.fullTextVerified,
      true,
      'The full source text is required',
    );
    assert.equal(
      story.review.allPhotosVerified,
      true,
      'The complete photo set is required',
    );
    assert.ok(
      date(story.review.checkedOn) &&
        story.review.checkedOn >= story.originalDate &&
        story.review.checkedOn <= today,
    );
    assert.ok(story.review.notes?.trim(), 'Record what was checked');
    const sourceIds = new Set();
    for (const source of story.sources) {
      assert.match(source.id, /^[a-z0-9-]+$/);
      assert.ok(!sourceIds.has(source.id) && source.label?.trim());
      sourceIds.add(source.id);
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(!url.username && !url.password);
    }
    const post = story.sources.find((source) => source.id === 'linkedin');
    assert.ok(post, 'Original post citation is required');
    const postUrl = new URL(post.url);
    assert.equal(postUrl.hostname, 'www.linkedin.com');
    assert.ok(
      postUrl.pathname.startsWith('/posts/cparkphd_') &&
        postUrl.pathname.includes(`-activity-${story.postId}-`),
      'Wrong LinkedIn author or post',
    );
    assert.ok(story.paragraphs.length > 0);
    for (const paragraph of story.paragraphs) {
      assert.ok(paragraph.text?.trim() && paragraph.sourceIds?.length > 0);
      assert.ok(
        paragraph.sourceIds.every((id) => sourceIds.has(id)),
        'Every paragraph needs a checked source',
      );
    }
    assert.ok(
      Number.isInteger(story.sourcePhotoCount) && story.sourcePhotoCount >= 0,
    );
    assert.equal(
      story.photos.length,
      story.sourcePhotoCount,
      'Missing original post photos',
    );
    assert.ok(
      story.supplementalPhotos === undefined ||
        Array.isArray(story.supplementalPhotos),
      'Invalid supplemental photo collection',
    );
    for (const photo of story.supplementalPhotos || []) {
      assert.ok(
        sourceIds.has(photo.sourceId),
        'Supplemental photos need a checked source',
      );
      const sourceUrl = new URL(photo.sourceUrl);
      assert.equal(sourceUrl.protocol, 'https:');
      assert.ok(
        !sourceUrl.username && !sourceUrl.password,
        'Unsafe photo source URL',
      );
    }
    const photoPaths = new Set();
    for (const collection of [story.photos, story.supplementalPhotos || []]) {
      let previousPosition = -1;
      for (const photo of collection) {
        assert.match(
          photo.src,
          /^\/images\/news\/[a-z0-9-]+\.(?:jpg|png|webp)$/,
        );
        assert.ok(!photoPaths.has(photo.src), 'Duplicate photograph');
        photoPaths.add(photo.src);
        assert.ok(photo.alt?.trim() && photo.caption?.trim());
        assert.ok(
          Number.isInteger(photo.width) &&
            photo.width > 0 &&
            Number.isInteger(photo.height) &&
            photo.height > 0,
        );
        assert.ok(
          Number.isInteger(photo.afterParagraph) &&
            photo.afterParagraph >= previousPosition &&
            photo.afterParagraph >= 0 &&
            photo.afterParagraph < story.paragraphs.length,
          'Photo placement must preserve source order',
        );
        previousPosition = photo.afterParagraph;
        assert.match(photo.sha256, /^[a-f0-9]{64}$/);
        const bytes = readFileSync(path.join(publicRoot, photo.src.slice(1)));
        assert.equal(
          createHash('sha256').update(bytes).digest('hex'),
          photo.sha256,
          `Photo differs from verified original: ${photo.src}`,
        );
      }
    }
  }
  return stories;
}

/** @param {Story} story */
export function getStoryPhotos(story) {
  // Website portraits precede the original gallery at each paragraph; the LinkedIn order stays intact.
  return [...(story.supplementalPhotos || []), ...story.photos].sort(
    (a, b) => a.afterParagraph - b.afterParagraph,
  );
}

/** @returns {Story[]} */
export function getPublishedStories() {
  const directory = path.resolve('content/news');
  const stories = readdirSync(directory)
    .filter((name) => name.endsWith('.json'))
    .map((name) =>
      JSON.parse(readFileSync(path.join(directory, name), 'utf8')),
    );
  return validateStories(stories).sort(
    (a, b) =>
      b.originalDate.localeCompare(a.originalDate) ||
      b.postId.localeCompare(a.postId),
  );
}

export function storyDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}
