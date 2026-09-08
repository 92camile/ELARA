import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
assert.match(
  html,
  /ELARA Lab \| Human Agency Across the Lifespan/,
  'ELARA title is missing',
);
assert.match(
  html,
  /autonomy-preserving embodied AI/,
  'ELARA mission is missing',
);
assert.doesNotMatch(
  html,
  /financial independence|faculty salary|long-term wealth|geographic mobility/i,
  'Private strategy must not appear on the public site',
);
const ids = new Set(
  [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
assert.ok(ids.has('news'), 'Homepage News section is missing');
assert.match(html, /href="#news"[^>]*>News<\/a>/, 'News navigation is missing');
const articles = [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)];
assert.equal(articles.length, 3, 'Expected three verified news articles');
for (const [article] of articles) {
  assert.match(
    article,
    /<time dateTime="\d{4}-\d{2}-\d{2}"/,
    'Article date is missing',
  );
  assert.match(article, /href="https:\/\//, 'Article source link is missing');
  assert.match(
    article,
    /rel="noopener noreferrer"/,
    'External link safety attributes are missing',
  );
}
let checked = 0;
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) {
    assert.ok(ids.has(url.slice(1)), `Missing anchor: ${url}`);
  } else if (url.startsWith('/') && !url.startsWith('//')) {
    assert.ok(
      !base || url.startsWith(`${base}/`),
      `Missing repository base path: ${url}`,
    );
    const localPath = decodeURIComponent(url.slice(base.length).split('?')[0]);
    assert.ok(
      existsSync(path.join(root, localPath)),
      `Missing exported asset: ${url}`,
    );
    checked++;
  }
}
assert.ok(checked > 0, 'No exported assets found');
console.log(
  `Verified ELARA content, navigation anchors, and ${checked} exported asset references.`,
);
