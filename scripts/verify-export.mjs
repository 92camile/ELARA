import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { getLinkedInWidgetId, linkedinProfileUrl } from '../lib/linkedin.mjs';
import { getPublishedStories } from '../lib/stories.mjs';
import { workshopPhotos } from '../lib/slideshow.mjs';

const root = path.resolve('dist/client');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const home = readFileSync(path.join(root, 'index.html'), 'utf8');
const students = readFileSync(path.join(root, 'students/index.html'), 'utf8');
const stories = getPublishedStories();
const storyPages = stories.map((story) => [
  `/news/${story.slug}/`,
  readFileSync(path.join(root, `news/${story.slug}/index.html`), 'utf8'),
]);
const linkedInWidgetId = getLinkedInWidgetId(
  process.env.NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID,
);
assert.ok(home.includes(`href="${linkedinProfileUrl}"`));
if (linkedInWidgetId) {
  assert.ok(home.includes(`class="elfsight-app-${linkedInWidgetId}"`));
  assert.ok(home.includes('data-elfsight-app-lazy=""'));
  assert.ok(home.includes('id="linkedin-feed-title"'));
  assert.ok(home.includes('View posts on LinkedIn'));
  assert.ok(home.includes('<noscript>'));
} else {
  assert.ok(!home.includes('id="linkedin-feed-title"'));
  assert.ok(!home.includes('class="elfsight-app-'));
  assert.ok(!home.includes('<script src="https://elfsightcdn.com/'));
}
assert.ok(!students.includes('class="elfsight-app-'));
assert.equal(
  readFileSync(path.join(root, 'CNAME'), 'utf8').trim(),
  'elaralab.org',
  'Custom domain must be preserved',
);
assert.ok(
  existsSync(path.join(root, 'clock.html')),
  'Existing clock page is missing',
);
assert.ok(
  readFileSync(path.join(root, 'people.html'), 'utf8').includes(
    `href="${base}/students/"`,
  ),
  'Old Team URL must link to students',
);

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
assert.equal(
  newsCards.length,
  3 + stories.length,
  'Expected all lab stories and three press articles',
);
for (const [card] of newsCards) {
  assert.match(
    card,
    /<time dateTime="\d{4}-\d{2}-\d{2}"/,
    'Article date is missing',
  );
  assert.match(
    card,
    /href="(?:https:\/\/|[^" ]*\/news\/)/,
    'Article link is missing',
  );
}

assert.ok(
  !home.includes('Autonomy at the center.'),
  'Old homepage logo panel remains',
);
assert.ok(home.includes('aria-roledescription="carousel"'));
assert.ok(
  home.includes('aria-label="Previous photo"') &&
    home.includes('aria-label="Next photo"'),
);
let photoPosition = -1;
for (const photo of workshopPhotos) {
  const position = home.indexOf(`src="${base}${photo.src}"`);
  assert.ok(
    position > photoPosition,
    'Slideshow images missing or out of order',
  );
  photoPosition = position;
}
for (const [index, story] of stories.entries()) {
  const [, html] = storyPages[index];
  assert.ok(home.includes(`href="${base}/news/${story.slug}/"`));
  assert.ok(html.includes(`dateTime="${story.originalDate}"`));
  assert.ok(html.includes(`dateTime="${story.publishedDate}"`));
  assert.ok(html.includes('Published on ELARA:'));
  assert.ok(
    !html.includes('class="elfsight-app-'),
    'Reading an archived story should not require the widget',
  );
  let position = -1;
  for (const photo of story.photos) {
    const next = html.indexOf(`src="${base}${photo.src}"`);
    assert.ok(
      next > position,
      'Article photo missing or out of original order',
    );
    position = next;
  }
  for (const source of story.sources)
    assert.ok(html.includes(`href="${source.url.replaceAll('&', '&amp;')}"`));
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
  ...storyPages,
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
  `Verified homepage, students, ${stories.length} lab stories, three press articles, four slideshow photos, and ${checked} internal links and assets.`,
);
