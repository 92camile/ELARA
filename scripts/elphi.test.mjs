import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  elphiArtwork,
  elphiProject,
  elphiResearchNote,
  elphiScenarios,
} from '../lib/elphi.mjs';
import { currentResearchProjects } from '../lib/current-projects.mjs';

test('Elphi is one featured current project with three proposed everyday scenarios', () => {
  assert.deepEqual(
    currentResearchProjects.filter((p) => p.id === 'elphi'),
    [elphiProject],
  );
  assert.deepEqual(
    elphiScenarios.map((s) => s.id),
    ['water', 'walk', 'connection'],
  );
  assert.match(elphiProject.stage, /Prototype development.*Pilot planning/);
  assert.match(elphiProject.summary, /being developed/);
  assert.match(elphiResearchNote, /not established health benefits/);
  assert.match(elphiResearchNote, /ethics approval/);
  assert.match(elphiArtwork.caption, /AI-generated concept illustration/);
  assert.match(elphiArtwork.caption, /not photographs of participants/);
  for (const scenario of elphiScenarios) {
    assert.match(scenario.description, /could/);
    assert.ok(scenario.description.split(/\s+/).length < 45);
  }
});

test('Elphi illustration exists at its declared dimensions and public copy omits study logistics', () => {
  const image = readFileSync(
    new URL(`../public${elphiArtwork.src}`, import.meta.url),
  );
  assert.equal(image.subarray(1, 4).toString(), 'PNG');
  assert.equal(image.readUInt32BE(16), elphiArtwork.width);
  assert.equal(image.readUInt32BE(20), elphiArtwork.height);
  assert.doesNotMatch(
    JSON.stringify([elphiProject, elphiScenarios, elphiResearchNote]),
    /20 adults|14.day|28.day|\$65|OneDrive|API|STUDY000|recording|patent/i,
  );
});
