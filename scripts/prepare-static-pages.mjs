import { copyFileSync, mkdirSync } from 'node:fs';

// Keep directory URLs portable to GitHub Pages without relying on server rewrites.
mkdirSync('dist/client/students', { recursive: true });
copyFileSync('dist/client/students.html', 'dist/client/students/index.html');
copyFileSync('dist/client/students.rsc', 'dist/client/students/index.rsc');
console.log('Prepared /students/ for static hosting.');
