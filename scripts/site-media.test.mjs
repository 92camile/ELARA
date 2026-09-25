import assert from 'node:assert/strict';
import test from 'node:test';
import { featuredCoverage, socialProfiles } from '../lib/site-media.mjs';

test('social profiles use the owner-supplied handles', () => {
  assert.deepEqual(
    socialProfiles.map(({ url }) => url),
    ['https://www.instagram.com/drchorongpark/', 'https://x.com/drchorongpark'],
  );
  assert.equal(new Set(socialProfiles.map(({ id }) => id)).size, 2);
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
