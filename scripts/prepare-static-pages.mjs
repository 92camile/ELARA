import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';

// Keep directory URLs portable to GitHub Pages without relying on server rewrites.
mkdirSync('dist/client/students', { recursive: true });
copyFileSync('dist/client/students.html', 'dist/client/students/index.html');
copyFileSync('dist/client/students.rsc', 'dist/client/students/index.rsc');

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
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${studentsUrl}"><title>Current Students | ELARA Lab</title></head><body><p>Our team page has moved to <a href="${studentsUrl}">Current Students</a>.</p></body></html>\n`,
);
console.log(
  'Prepared /students/, legacy links, and custom domain for static hosting.',
);
