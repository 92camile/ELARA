import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { getLinkedInWidgetId, linkedinProfileUrl } from '../lib/linkedin.mjs';
import { getPublishedStories, getStoryPhotos } from '../lib/stories.mjs';
import { workshopPhotos } from '../lib/slideshow.mjs';
import { getProjects } from '../lib/projects.mjs';
import { featuredCoverage, socialProfiles } from '../lib/site-media.mjs';
import {
  currentResearchProjects,
  proposedResearchProjects,
  researchProjectGroups,
} from '../lib/current-projects.mjs';
import {
  publications,
  publicationGroups,
  publicationsForGroup,
} from '../lib/publications.mjs';
import {
  articleStructuredData,
  canonicalUrl,
  createRobots,
  createSitemap,
} from '../lib/seo.mjs';

const root = path.resolve('dist/client');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const home = readFileSync(path.join(root, 'index.html'), 'utf8');
const students = readFileSync(path.join(root, 'students/index.html'), 'utf8');
const lab = readFileSync(path.join(root, 'lab/index.html'), 'utf8');
const volunteerPage = readFileSync(
  path.join(root, 'volunteer/index.html'),
  'utf8',
);
const currentProjectsPage = readFileSync(
  path.join(root, 'current-projects/index.html'),
  'utf8',
);
const publicationPage = readFileSync(
  path.join(root, 'publications/index.html'),
  'utf8',
);
const stories = getPublishedStories();
const projects = getProjects();
const directoryPage = readFileSync(
  path.join(root, 'projects/index.html'),
  'utf8',
);
assert.ok(
  home.includes(`href="${base}/projects/"`),
  'Homepage must expose the complete directory',
);
assert.doesNotMatch(directoryPage, /href="https:\/\/cpark\.squarespace\.com/);
assert.equal(
  [...directoryPage.matchAll(/class="project-directory-card"/g)].length,
  projects.length,
);
for (const project of projects) {
  assert.ok(
    directoryPage.includes(`href="${base}/projects/${project.slug}/"`),
    `Directory missing ${project.slug}`,
  );
}
const projectPages = projects.map((project) => [
  `/projects/${project.slug}/`,
  readFileSync(path.join(root, `projects/${project.slug}/index.html`), 'utf8'),
]);
assert.equal(
  readFileSync(path.join(root, 'sitemap.xml'), 'utf8'),
  createSitemap(stories, base),
);
assert.equal(
  readFileSync(path.join(root, 'robots.txt'), 'utf8'),
  createRobots(base),
);
assert.ok(
  home.includes(
    '<meta name="google-site-verification" content="7RwQ6FKdwA4tvt48CB1HYUuNlXQXKRKPGD7U1n4XbqE"',
  ),
);
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
  /Chorong Park \| Human-Centered AI, Aging &amp; Care/,
  'Homepage title is missing',
);
assert.match(
  lab,
  /autonomy-preserving embodied AI/,
  'ELARA mission is missing',
);
assert.ok(
  home.includes('id="about"') &&
    home.includes('id="research"') &&
    home.includes('id="industry"'),
);
assert.doesNotMatch(home, /class="personal-portrait"/);
assert.ok(home.includes('id="featured-story-title"'));
assert.ok(home.includes(htmlEscape(featuredCoverage.title)));
assert.ok(home.includes(htmlEscape(featuredCoverage.summary)));
assert.ok(home.includes('aria-label="Play the KHOU 11 featured story"'));
assert.ok(home.includes(`src="${featuredCoverage.poster}"`));
assert.doesNotMatch(
  home,
  /<iframe\b/,
  'Video must load only after a visitor clicks play',
);
for (const coverage of [featuredCoverage, ...featuredCoverage.related]) {
  assert.ok(home.includes(`href="${htmlEscape(coverage.url)}"`));
}
assert.ok(home.includes('Microsoft') && home.includes('PathAI'));
assert.doesNotMatch(
  home,
  /href="https:\/\/cpark\.squarespace\.com/,
  'Homepage project links must stay on ELARA',
);
function htmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
}
assert.match(
  currentProjectsPage,
  /Current Projects \| Chorong Park &amp; ELARA Lab/,
);
assert.equal([...currentProjectsPage.matchAll(/<h1\b/g)].length, 1);
assert.equal(
  [...currentProjectsPage.matchAll(/class="current-project-card"/g)].length,
  currentResearchProjects.length,
);
assert.equal(
  [...currentProjectsPage.matchAll(/class="proposed-project"/g)].length,
  proposedResearchProjects.length,
);
assert.match(currentProjectsPage, /<details class="proposed-projects">/);
assert.match(currentProjectsPage, /not funded awards or completed/);
assert.equal(currentResearchProjects.length, 12);
assert.match(currentProjectsPage, /Confidential research/);
assert.match(currentProjectsPage, /informed by clinical data/);
assert.match(volunteerPage, /Volunteer \| Chorong Park &amp; ELARA Lab/);
assert.equal([...volunteerPage.matchAll(/<h1\b/g)].length, 1);
for (const text of [
  'Mamie George Community Center',
  'Monthly volunteering',
  'robot-engagement activities',
  'Dr. Rua Williams',
  'West Lafayette, Indiana',
  'honorary external advisor',
  'ongoing joint study',
]) {
  assert.ok(
    volunteerPage.includes(text),
    `Missing volunteer information: ${text}`,
  );
}
assert.ok(
  volunteerPage.includes(
    'href="mailto:cpark14@uh.edu?subject=ELARA%20volunteer%20interest"',
  ),
);
assert.ok(volunteerPage.includes(`src="${base}${workshopPhotos[0].src}"`));
for (const html of [home, lab, currentProjectsPage, students]) {
  assert.ok(
    html.includes(`href="${base}/volunteer/"`),
    'Volunteer page must be linked from the site',
  );
}
// Inspect all exported text, including RSC and JS, not just visible page copy.
for (const file of readdirSync(root, { recursive: true })) {
  if (!/\.(?:html|rsc|js|json|txt|xml|map)$/i.test(file)) continue;
  assert.doesNotMatch(
    readFileSync(path.join(root, file), 'utf8'),
    /DogVest|Qin\s+Lin|Debaleena|Jeff\s+Feng|robot-dog-navigation|touch-mediated-assistance|technology-difficulties-llm|earbud-eeg-audio/i,
    `Withdrawn project content remains in export: ${file}`,
  );
}
assert.doesNotMatch(
  currentProjectsPage,
  /11573805|2643368|735765|Insert Project Scope|docs\.google\.com\/document/,
);
for (const html of [home, lab, students, publicationPage, directoryPage]) {
  assert.ok(
    html.includes(`href="${base}/current-projects/"`),
    'Current projects must be discoverable from site navigation',
  );
}
for (const group of researchProjectGroups) {
  assert.ok(currentProjectsPage.includes(`id="${group.id}"`));
  assert.ok(currentProjectsPage.includes(`href="#${group.id}"`));
}
for (const project of [
  ...currentResearchProjects,
  ...proposedResearchProjects,
]) {
  const card = currentProjectsPage.match(
    new RegExp(`<article[^>]*id="${project.id}"[^>]*>([\\s\\S]*?)</article>`),
  )?.[1];
  assert.ok(card, `Missing research project: ${project.id}`);
  for (const field of ['title', 'summary', 'stage', 'role']) {
    assert.ok(
      card.includes(htmlEscape(project[field])),
      `Missing ${field} for ${project.id}`,
    );
  }
}
for (const [index, project] of projects.entries()) {
  const [, html] = projectPages[index];
  assert.ok(
    home.includes(`href="${base}/projects/${project.slug}/"`),
    `Unlinked project: ${project.slug}`,
  );
  assert.equal(
    [...html.matchAll(/<h1\b/g)].length,
    1,
    'Project needs one primary heading',
  );
  assert.doesNotMatch(
    html,
    /href="https:\/\/cpark\.squarespace\.com|definitions\.sqspcdn\.com|data-block-scripts/,
  );
  assert.ok(html.includes(`href="${base}/#industry"`));
  assert.ok(
    html.includes(`href="${base}/projects/"`),
    'Every project must link to the complete collection',
  );
  let position = -1;
  for (const image of project.images) {
    const next = html.indexOf(`src="${base}${image.src}"`);
    assert.ok(
      next > position,
      `Missing or reordered project image: ${image.src}`,
    );
    position = next;
  }
  for (const url of project.documentLinks)
    assert.ok(html.includes(`href="${htmlEscape(url)}"`));
  for (const url of project.videos)
    assert.ok(html.includes(`<iframe src="${htmlEscape(url)}"`));
  // Check every original text leaf in the exported article, not just its metadata/RSC payload.
  const body = html
    .split('id="original-project-content">')[1]
    ?.split('</article>')[0];
  assert.ok(body, 'Missing original project body');
  let textPosition = 0;
  function checkText(nodes) {
    for (const node of nodes) {
      if (typeof node !== 'string') {
        checkText(node.children || []);
        continue;
      }
      if (!node.trim()) continue;
      const text = htmlEscape(node.trim());
      const found = body.indexOf(text, textPosition);
      assert.ok(
        found >= textPosition,
        `Missing original text in ${project.slug}: ${node.slice(0, 80)}`,
      );
      textPosition = found + text.length;
    }
  }
  checkText(project.content);
}
assert.ok(
  home.includes(`href="${base}/lab/"`) &&
    home.includes(`href="${base}/publications/"`),
);
assert.ok(lab.includes('aria-roledescription="carousel"'));
assert.equal(
  [...publicationPage.matchAll(/class="publication-item"/g)].length,
  publications.length,
);
for (const group of publicationGroups) {
  let lastPosition = -1;
  for (const paper of publicationsForGroup(group.id)) {
    const position = publicationPage.indexOf(`id="${paper.id}"`);
    assert.ok(
      position > lastPosition,
      `Publication missing or out of order: ${paper.id}`,
    );
    assert.ok(publicationPage.includes(`href="${paper.url}"`));
    lastPosition = position;
  }
}
assert.match(home, /href="#news"[^>]*>News<\/a>/, 'News navigation is missing');
assert.match(
  students,
  /Students \| ELARA Lab/,
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
let storyPosition = -1;
for (const [index, story] of stories.entries()) {
  const [, html] = storyPages[index];
  const structuredData = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.equal(
    structuredData.length,
    1,
    'Each article needs one structured data record',
  );
  assert.deepEqual(
    JSON.parse(structuredData[0][1]),
    articleStructuredData(story, base),
  );
  const cardPosition = home.indexOf(`href="${base}/news/${story.slug}/"`);
  assert.ok(
    cardPosition > storyPosition,
    'Homepage stories must preserve newest-first order',
  );
  storyPosition = cardPosition;
  const storyCard = newsCards.find(([card]) =>
    card.includes(`aria-labelledby="${story.slug}"`),
  )?.[0];
  assert.ok(storyCard, 'Missing homepage story card');
  for (const source of story.sources.filter((item) => item.id === 'workshop')) {
    assert.ok(
      storyCard.includes(`href="${htmlEscape(source.url)}"`),
      'Workshop website must remain directly accessible from News',
    );
    assert.ok(storyCard.includes('Workshop website'));
  }
  if (linkedInWidgetId) {
    assert.ok(
      home.indexOf(`href="${base}/news/${story.slug}/"`) <
        home.indexOf('id="linkedin-feed-title"'),
      'Every lab story must appear above the LinkedIn feed',
    );
  }
  assert.equal(
    [...html.matchAll(/<figure>/g)].length,
    getStoryPhotos(story).length,
    'Export must include original photos and credited supplemental images',
  );
  assert.ok(html.includes(`dateTime="${story.originalDate}"`));
  assert.ok(html.includes(`dateTime="${story.publishedDate}"`));
  assert.ok(html.includes('Published on ELARA:'));
  if (story.updatedDate) {
    assert.ok(html.includes(`dateTime="${story.updatedDate}"`));
    assert.ok(html.includes('Updated on ELARA:'));
  }
  assert.ok(
    !html.includes('class="elfsight-app-'),
    'Reading an archived story should not require the widget',
  );
  let position = -1;
  for (const photo of getStoryPhotos(story)) {
    const next = html.indexOf(`src="${base}${photo.src}"`);
    assert.ok(
      next > position,
      'Article photo missing or out of original order',
    );
    position = next;
  }
  for (const photo of story.supplementalPhotos || []) {
    assert.ok(
      html.includes(`href="${htmlEscape(photo.sourceUrl)}"`),
      'Missing supplemental image credit',
    );
  }
  for (const source of story.sources)
    assert.ok(html.includes(`href="${source.url.replaceAll('&', '&amp;')}"`));
}

const studentCards = [
  ...students.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g),
];
const studentSection = students
  .split('id="student-profiles"')[1]
  ?.split('</section>')[0];
assert.ok(studentSection, 'Keep one combined student section');
assert.doesNotMatch(students, /past-students|Past students|Current students/);
assert.equal([...studentSection.matchAll(/<article\b/g)].length, 7);
assert.equal(studentCards.length, 7, 'Expected seven student profiles');
assert.deepEqual(
  studentCards.map(([card]) => card.match(/aria-labelledby="([^"]+)"/)[1]),
  [
    'hayley-b-lukken',
    'jevin-pinto',
    'jana-qaddoura',
    'levi-abrahams',
    'noorul-maqbool',
    'anika-vadlamudi',
    'henrique-pfeiffer',
  ],
  'Preserve the requested profile order',
);
const hayley = studentCards[0][0];
assert.ok(hayley.includes('Hayley B. Lukken'));
assert.ok(hayley.includes('graduate') && hayley.includes('thesis'));
assert.ok(hayley.includes('ADHD') && hayley.includes('autistic people'));
const jevin = studentCards[1][0];
assert.ok(jevin.includes('Jevin Pinto'));
assert.ok(jevin.includes('/students/jevin-pinto.png'));
assert.ok(jevin.includes('width="1792" height="2011"'));
for (const url of [
  'mailto:jevin.marcus.pinto@gmail.com',
  'https://www.linkedin.com/in/jevinpinto',
  'https://jevinmarcuspinto.myportfolio.com/',
]) {
  assert.ok(jevin.includes(`href="${url}"`), `Missing Jevin contact: ${url}`);
}
assert.equal(
  createHash('sha256')
    .update(readFileSync(path.join(root, 'students/jevin-pinto.png')))
    .digest('hex'),
  '6e8f622be07bdea61584d32087a94bbbe87b349aab9b85676de0a226a36bbafa',
  'Preserve the supplied headshot without alterations',
);
assert.ok(studentCards[2][0].includes('/students/jana-qaddoura.png'));
assert.ok(studentCards[3][0].includes('/students/levi-abrahams.jpg'));
assert.ok(studentCards[4][0].includes('/students/noorul-maqbool.png'));
const henrique = studentCards[6][0];
assert.ok(henrique.includes('Henrique Pfeiffer'));
assert.ok(henrique.includes('Psychology') && henrique.includes('HCI'));
assert.ok(henrique.includes('HRI') && henrique.includes('project management'));
const anika = studentCards.find(([card]) =>
  card.includes('Anika Vadlamudi'),
)?.[0];
assert.ok(anika?.includes('/elara-logo.png'), 'Anika should use the lab logo');
assert.doesNotMatch(anika, /<a\b/, 'Anika requested no personal links');

let checked = 0;
for (const [route, html] of [
  ['/', home],
  ['/students/', students],
  ['/lab/', lab],
  ['/publications/', publicationPage],
  ['/projects/', directoryPage],
  ['/current-projects/', currentProjectsPage],
  ['/volunteer/', volunteerPage],
  ...storyPages,
  ...projectPages,
]) {
  const socialNav = html.match(
    /<nav class="social-links"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];
  assert.ok(socialNav, `Missing separate social navigation: ${route}`);
  for (const profile of socialProfiles) {
    assert.ok(socialNav.includes(`href="${profile.url}"`));
    assert.ok(
      socialNav.includes(
        `aria-label="Chorong Park on ${profile.label} (opens in a new tab)"`,
      ),
    );
  }
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(
    canonicals.length,
    1,
    'Each public page needs exactly one canonical',
  );
  assert.equal(
    new URL(canonicals[0][0].match(/href="([^"]+)"/)[1]).href,
    canonicalUrl(route, base),
    'Canonical must identify this page, not the homepage or LinkedIn',
  );
  assert.doesNotMatch(
    html,
    /<meta\b(?=[^>]*name="(?:robots|googlebot)")(?=[^>]*content="[^"]*noindex)[^>]*>/i,
    'Public pages must not block indexing',
  );
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
  `Verified homepage, students, ${projects.length} complete projects, ${stories.length} lab stories, three press articles, four slideshow photos, and ${checked} internal links and assets.`,
);
