import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const introduction = readFileSync(
  new URL('../components/personal-introduction.tsx', import.meta.url),
  'utf8',
);
const about = introduction
  .split('id="about"')[1]
  .split('</section>')[0]
  .replace(/\s+/g, ' ');

test('biography connects community research with design, interaction, AI, and aging', () => {
  assert.match(about, /researcher at the University of Houston/);
  for (const focus of [
    'healthy aging',
    'positive behavior change',
    'UX design',
    'human-computer interaction',
    'human-robot interaction',
    'human-centered AI',
    'gerontology',
    'critical disability studies',
    'accessibility',
  ]) {
    assert.ok(about.includes(focus), `Missing biography focus: ${focus}`);
  }
  assert.doesNotMatch(about, /Gerald D\. Hines/);
});

test('biography distinguishes education from unconfirmed degree and certificate claims', () => {
  assert.match(about, /Ph\.D\. in Technology with a focus on/);
  assert.match(about, /graduate minor in Gerontology/);
  assert.match(about, /M\.S\. in UX Design/);
  assert.match(about, /University of Illinois Springfield/);
  assert.match(about, /graduate study in visual communication design at Purdue/);
  assert.match(about, /AI foundations and ethics through the University of Helsinki/);
  assert.doesNotMatch(about, /B\.A\.|B\.S\.|B\.F\.A\.|M\.F\.A\.|Summa Cum Laude|MIT/);
});
