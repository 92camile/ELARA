import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('the shared header puts the full ELARA name after the research tagline', () => {
  const shell = readFileSync(new URL('../components/site-shell.tsx', import.meta.url), 'utf8');
  const header = shell.slice(0, shell.indexOf('export function SiteFooter'));
  assert.match(header, /Human-centered AI, aging &amp; care\s*<span className="brand-lab-name">\s*Empathetic Lifespan AI &amp; Robotics for Aging \(ELARA Lab\)/);
});
