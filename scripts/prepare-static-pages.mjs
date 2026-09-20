import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { getPublishedStories } from '../lib/stories.mjs';
import { createRobots, createSitemap } from '../lib/seo.mjs';
import { getProjects } from '../lib/projects.mjs';

const stories = getPublishedStories();

// Keep directory URLs portable to GitHub Pages without relying on server rewrites.
for (const route of [
  'students',
  'lab',
  'publications',
  'projects',
  'current-projects',
  ...getProjects().map((project) => `projects/${project.slug}`),
  ...stories.map((story) => `news/${story.slug}`),
]) {
  mkdirSync(`dist/client/${route}`, { recursive: true });
  copyFileSync(`dist/client/${route}.html`, `dist/client/${route}/index.html`);
  copyFileSync(`dist/client/${route}.rsc`, `dist/client/${route}/index.rsc`);
}

for (const file of [
  'CNAME',
  'clock.html',
  'camile-profile.jpg',
  'elara-logo-menu.png',
  'elara-logo.png.png',
]) {
  copyFileSync(file, `dist/client/${file}`);
}
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
if (!/^(?:\/[A-Za-z0-9_.-]+)*$/.test(base))
  throw new Error('Invalid site base path');
const studentsUrl = `${base}/students/`;
writeFileSync(
  'dist/client/people.html',
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${studentsUrl}"><title>Students | ELARA Lab</title></head><body><p>Our team page has moved to <a href="${studentsUrl}">Students</a>.</p></body></html>\n`,
);
writeFileSync('dist/client/sitemap.xml', createSitemap(stories, base));
writeFileSync('dist/client/robots.txt', createRobots(base));
console.log(
  'Prepared students, publications, projects, news stories, legacy links, and custom domain for static hosting.',
);
