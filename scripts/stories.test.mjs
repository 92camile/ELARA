import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getPublishedStories,
  storyDate,
  validateStories,
} from '../lib/stories.mjs';
import { slideIndex, workshopPhotos } from '../lib/slideshow.mjs';
import { existsSync } from 'node:fs';

test('published stories have reviewed sources, original photos, and newest-first order', () => {
  const stories = getPublishedStories();
  assert.ok(stories.length > 0);
  assert.deepEqual(
    stories.map((story) => `${story.originalDate}/${story.postId}`),
    stories
      .map((story) => `${story.originalDate}/${story.postId}`)
      .sort()
      .reverse(),
  );
  assert.equal(storyDate('2025-09-02'), 'September 2, 2025');
});

/** @type {[string, (story: import('../lib/stories.mjs').Story) => void][]} */
const cases = [
  [
    'unreviewed article',
    (story) => {
      story.review.status = 'pending';
    },
  ],
  [
    'incomplete source text',
    (story) => {
      story.review.fullTextVerified = false;
    },
  ],
  [
    'unverified photos',
    (story) => {
      story.review.allPhotosVerified = false;
    },
  ],
  [
    'missing photo',
    (story) => {
      story.photos.pop();
    },
  ],
  [
    'invalid date',
    (story) => {
      story.originalDate = '2025-09-31';
    },
  ],
  [
    'future publication',
    (story) => {
      story.publishedDate = '2099-01-01';
    },
  ],
  [
    'missing paragraph evidence',
    (story) => {
      story.paragraphs[0].sourceIds = [];
    },
  ],
  [
    'unknown source',
    (story) => {
      story.paragraphs[0].sourceIds = ['unknown'];
    },
  ],
  [
    'wrong source author',
    (story) => {
      story.sources[0].url = story.sources[0].url.replace(
        '/cparkphd_',
        '/someoneelse_',
      );
    },
  ],
  [
    'modified photo',
    (story) => {
      story.photos[0].sha256 = '0'.repeat(64);
    },
  ],
  [
    'unsafe photo path',
    (story) => {
      story.photos[0].src = '/images/news/../../secret.jpg';
    },
  ],
  [
    'invalid placement',
    (story) => {
      story.photos[0].afterParagraph = 100;
    },
  ],
];
for (const [name, mutate] of cases) {
  test(`refuses ${name}`, () => {
    const story = structuredClone(getPublishedStories()[0]);
    mutate(story);
    assert.throws(() => validateStories([story]));
  });
}

test('duplicate LinkedIn posts cannot be imported again under a new slug', () => {
  const story = getPublishedStories()[0];
  assert.throws(() =>
    validateStories([story, { ...story, slug: 'another-title' }]),
  );
});

test('September 2025 through September 8, 2026 backfill retains every reviewed post and image', () => {
  const expected = {
    '7368666064198500352': 1,
    '7375893179230908416': 4,
    '7388952784517259264': 1,
    '7403748802551296002': 4,
    '7407802375891083264': 4,
    '7436867486114975744': 2,
    '7446985956177575937': 2,
    '7449947202388389888': 3,
    '7449950843333677056': 5,
    '7452372088566329344': 13,
    '7453287935824637952': 2,
    '7479446810361753600': 8,
    '7495113458493960192': 3,
    '7495723942599503872': 3,
    '7495816057245573121': 17,
    '7496166696194412544': 6,
    '7496325100552474625': 6,
    '7497530598006218752': 9,
    '7497574677016428544': 20,
    '7501362982296178688': 7,
    7502030461079040000: 0,
    '7503097921622544384': 1,
  };
  const stories = getPublishedStories();
  for (const [postId, count] of Object.entries(expected)) {
    const matches = stories.filter((story) => story.postId === postId);
    assert.equal(
      matches.length,
      1,
      `Missing or duplicated source post: ${postId}`,
    );
    assert.equal(
      matches[0].photos.length,
      count,
      `Incomplete gallery: ${postId}`,
    );
  }
});

test('slideshow preserves all four supplied photographs and wraps both directions', () => {
  assert.deepEqual(
    workshopPhotos.map((photo) => photo.src),
    [
      '/images/community/workshop-1.png',
      '/images/community/workshop-2.png',
      '/images/community/workshop-3.jpg',
      '/images/community/workshop-4.jpg',
    ],
  );
  for (const photo of workshopPhotos) {
    assert.ok(existsSync(`public${photo.src}`));
    assert.ok(photo.alt.length > 20);
  }
  assert.equal(slideIndex(4, 4), 0);
  assert.equal(slideIndex(-1, 4), 3);
  assert.equal(slideIndex(1, 4), 1);
});
