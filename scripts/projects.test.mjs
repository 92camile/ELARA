import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  getProjects,
  projectText,
  validateProjectContent,
} from '../lib/projects.mjs';

const expected = {
  'microsoft-care-team': [23, 0, 1],
  'microsoft-career': [1, 2, 0],
  'pg-amazon-shopping': [1, 3, 0],
  'dolby-community': [1, 2, 0],
  'bnu-purdue-vehicle-design': [1, 2, 0],
  'pepsico-engagement': [1, 1, 0],
  'adventhealth-medicare': [1, 2, 0],
  'cerner-telehealth': [1, 2, 0],
  'pathai-portfolio-background': [3, 0, 0],
};
const hash = (data) => createHash('sha256').update(data).digest('hex');
const flatten = (nodes) =>
  nodes.flatMap((node) =>
    typeof node === 'string' ? [] : [node, ...flatten(node.children || [])],
  );

test('all nine migrated pages retain the complete original wording and media order', () => {
  const projects = getProjects();
  assert.deepEqual(
    projects.map((project) => project.slug).sort(),
    Object.keys(expected).sort(),
  );
  for (const project of projects) {
    const nodes = flatten(project.content);
    const text = projectText(project.content).replace(/\s+/g, ' ').trim();
    assert.equal(text, project.originalText, project.slug);
    assert.equal(hash(text), project.originalTextSha256, project.slug);
    assert.match(project.sourceHtmlSha256, /^[a-f0-9]{64}$/);
    assert.deepEqual(
      [
        project.images.length,
        project.documentLinks.length,
        project.videos.length,
      ],
      expected[project.slug],
    );
    assert.deepEqual(
      nodes.filter((node) => node.tag === 'img').map((node) => node.src),
      project.images.map((image) => image.src),
    );
    assert.deepEqual(
      nodes.filter((node) => node.tag === 'a').map((node) => node.href),
      project.documentLinks,
    );
    assert.deepEqual(
      nodes.filter((node) => node.tag === 'iframe').map((node) => node.src),
      project.videos,
    );
    assert.ok(
      nodes.every((node) => node.tag !== 'h1'),
      'Page shell owns the single h1',
    );
  }
});

test('original image bytes, including animated GIF and extensionless source files, are preserved', () => {
  let total = 0;
  for (const project of getProjects()) {
    for (const image of project.images) {
      const data = readFileSync(`public${image.src}`);
      assert.equal(hash(data), image.sha256, image.src);
      assert.equal(data.length, image.bytes);
      assert.ok(data.length < 100_000_000);
      if (image.src.endsWith('.gif'))
        assert.match(data.subarray(0, 6).toString(), /^GIF8[79]a$/);
      if (image.src.endsWith('.png'))
        assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      if (/\.jpe?g$/.test(image.src))
        assert.equal(data.subarray(0, 3).toString('hex'), 'ffd8ff');
      total++;
    }
  }
  assert.equal(total, 33);
});

test('every entry from the original Industry index has a full local page', () => {
  const index = JSON.parse(
    readFileSync('content/portfolio-industry-index.json', 'utf8'),
  );
  const projects = getProjects();
  assert.equal(index.projects.length, 7);
  assert.match(index.sourceHtmlSha256, /^[a-f0-9]{64}$/);
  for (const entry of index.projects) {
    const matches = projects.filter(
      (project) => project.sourceUrl === entry.sourceUrl,
    );
    assert.equal(
      matches.length,
      1,
      `Missing or duplicate source: ${entry.title}`,
    );
  }
  assert.equal(
    projects.filter((project) => project.company.startsWith('Microsoft'))
      .length,
    2,
  );
});

test('the archive cannot bring scripts, attributes, tracking images, or unreviewed embeds into the site', () => {
  for (const node of [
    { tag: 'script', children: ['alert(1)'] },
    { tag: 'p', onClick: 'bad' },
    { tag: 'div', style: 'display:none' },
    { tag: 'img', src: 'https://tracker.test/pixel.png', alt: 'Tracker' },
    { tag: 'img', src: '/images/projects/../secret.png', alt: 'Escape' },
    { tag: 'a', href: 'javascript:alert(1)' },
    { tag: 'a', href: 'https://cpark.squarespace.com/industry' },
    {
      tag: 'iframe',
      src: 'https://www.youtube.com.evil.test/embed/id',
      title: 'Fake',
    },
    { tag: 'p', src: 'https://example.com' },
  ])
    assert.throws(() => validateProjectContent([node]));
});

test('PathAI preserves the whole original biography and clearly distinguishes its archive kind', () => {
  const project = getProjects().find(
    (item) => item.slug === 'pathai-portfolio-background',
  );
  assert.equal(project.kind, 'biography-archive');
  assert.ok(project.originalText.includes('Product Design Intern'));
  assert.ok(project.originalText.includes('Ph.D. student'));
});
