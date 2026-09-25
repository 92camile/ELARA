import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { featuredCoverage, socialProfiles } from '../lib/site-media.mjs';

test('social profiles use the owner-supplied handles', () => {
  assert.deepEqual(
    socialProfiles.map(({ url }) => url),
    ['https://www.instagram.com/drchorongpark/', 'https://x.com/drchorongpark'],
  );
  assert.equal(new Set(socialProfiles.map(({ id }) => id)).size, 2);
});

test('the homepage preview uses the local owner-requested interview still', () => {
  assert.equal(
    featuredCoverage.poster,
    '/images/featured/khou-chorong-park-1m16s.jpg',
  );
  const image = readFileSync(
    new URL(`../public${featuredCoverage.poster}`, import.meta.url),
  );
  assert.equal(image.readUInt16BE(0), 0xffd8, 'Preview must be a JPEG');
  assert.ok(image.length > 10000, 'Preview must contain the captured frame');
  assert.equal(
    featuredCoverage.posterWidth / featuredCoverage.posterHeight,
    16 / 9,
  );
  assert.match(featuredCoverage.posterAlt, /Chorong Park.*KHOU 11/);
});

test('the feature preserves all four supplied videos and correct publishers', () => {
  assert.equal(featuredCoverage.url, 'https://youtu.be/aZ8gMX_bIws');
  assert.deepEqual(
    featuredCoverage.related.map(({ label, url }) => [label, url]),
    [
      ['KENS 5', 'https://www.youtube.com/watch?v=Wbw4pvUZ3z4'],
      ['CBS19', 'https://www.youtube.com/watch?v=F_mxVr_6QF0'],
      ['KHOU 11 short clip', 'https://www.youtube.com/shorts/S9kzGRal9RU'],
    ],
  );
  const embed = new URL(featuredCoverage.embedUrl);
  assert.equal(embed.origin, 'https://www.youtube-nocookie.com');
  assert.equal(embed.pathname, '/embed/aZ8gMX_bIws');
  assert.equal(embed.searchParams.get('autoplay'), '1');
  assert.match(
    featuredCoverage.summary,
    /aimed at supporting health and well-being/,
  );
});
