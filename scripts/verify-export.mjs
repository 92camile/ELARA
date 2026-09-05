import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
assert.match(html, /ELARA \| A New Horizon/, 'ELARA title is missing');
assert.match(html, /new horizon/, 'ELARA page content is missing');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
let checked = 0;
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) {
    assert.ok(ids.has(url.slice(1)), `Missing anchor: ${url}`);
  } else if (url.startsWith('/') && !url.startsWith('//')) {
    assert.ok(!base || url.startsWith(`${base}/`), `Missing repository base path: ${url}`);
    const localPath = decodeURIComponent(url.slice(base.length).split('?')[0]);
    assert.ok(existsSync(path.join(root, localPath)), `Missing exported asset: ${url}`);
    checked++;
  }
}
assert.ok(checked > 0, 'No exported assets found');
console.log(`Verified ELARA content, navigation anchors, and ${checked} exported asset references.`);
