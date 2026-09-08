import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const home = readFileSync(path.join(root, 'index.html'), 'utf8');
const students = readFileSync(path.join(root, 'students/index.html'), 'utf8');

assert.match(
  home,
  /ELARA Lab \| Human Agency Across the Lifespan/,
  'Homepage title is missing',
);
assert.match(
  home,
  /autonomy-preserving embodied AI/,
  'ELARA mission is missing',
);
assert.match(home, /href="#news"[^>]*>News<\/a>/, 'News navigation is missing');
assert.match(
  students,
  /Current Students \| ELARA Lab/,
  'Student page title is missing',
);
assert.ok(
  home.includes(`href="${base}/students/"`),
  'Homepage does not link to students',
);
assert.ok(
  students.includes(`href="${base}/#news"`),
  'Students page does not link back to News',
);

const newsCards = [...home.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)];
assert.equal(newsCards.length, 3, 'Expected three verified news articles');
for (const [card] of newsCards) {
  assert.match(
    card,
    /<time dateTime="\d{4}-\d{2}-\d{2}"/,
    'Article date is missing',
  );
  assert.match(card, /href="https:\/\//, 'Article source is missing');
}

const studentCards = [
  ...students.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g),
];
assert.equal(studentCards.length, 4, 'Expected four student profiles');
for (const name of [
  'Anika Vadlamudi',
  'Noorul Maqbool',
  'Jana Qaddoura',
  'Levi Abrahams',
]) {
  assert.ok(
    studentCards.some(([card]) => card.includes(name)),
    `Missing student: ${name}`,
  );
}
const anika = studentCards.find(([card]) =>
  card.includes('Anika Vadlamudi'),
)?.[0];
assert.ok(anika?.includes('/elara-logo.png'), 'Anika should use the lab logo');
assert.doesNotMatch(anika, /<a\b/, 'Anika requested no personal links');

let checked = 0;
for (const [route, html] of [
  ['/', home],
  ['/students/', students],
]) {
  assert.doesNotMatch(
    html,
    /financial independence|faculty salary|long-term wealth|geographic mobility/i,
    'Private strategy must not appear on the public site',
  );
  const pageUrl = new URL(`${base}${route}`, 'https://elara.test');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(href, pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    assert.ok(
      !base || url.pathname.startsWith(`${base}/`),
      `Missing repository base path: ${href}`,
    );
    const relative = decodeURIComponent(url.pathname.slice(base.length));
    let file = path.resolve(root, `.${relative}`);
    assert.ok(
      file === root || file.startsWith(`${root}${path.sep}`),
      'Link escapes the export directory',
    );
    assert.ok(existsSync(file), `Missing exported route or asset: ${href}`);
    if (statSync(file).isDirectory()) file = path.join(file, 'index.html');
    assert.ok(existsSync(file), `Missing page: ${href}`);
    if (url.hash) {
      const target = readFileSync(file, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      assert.ok(target.includes(`id="${id}"`), `Missing anchor: ${href}`);
    }
    checked++;
  }
  for (const [link] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(
      link,
      /rel="noopener noreferrer"/,
      'External link safety attributes are missing',
    );
  }
}
console.log(
  `Verified both pages, four student profiles, three news articles, and ${checked} internal links and assets.`,
);
