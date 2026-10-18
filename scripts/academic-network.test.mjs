import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  academicNetwork,
  academicNetworkReviewedOn,
} from '../lib/academic-network.mjs';

const provenance = JSON.parse(
  readFileSync(
    new URL('../docs/academic-network-logos.json', import.meta.url),
    'utf8',
  ),
);

test('academic network has unique institutions and explicit relationship context', () => {
  assert.equal(academicNetworkReviewedOn, '2026-10-18');
  assert.equal(academicNetwork.length, 16);
  assert.equal(
    new Set(academicNetwork.map(({ id }) => id)).size,
    academicNetwork.length,
  );
  assert.equal(
    new Set(academicNetwork.map(({ url }) => url)).size,
    academicNetwork.length,
  );
  for (const school of academicNetwork) {
    assert.ok(school.name && school.label && school.relationship);
    assert.equal(new URL(school.url).protocol, 'https:');
    assert.match(school.logo, /^\/images\/universities\/[a-z-]+\.(?:svg|png)$/);
    assert.ok(school.width > 0 && school.height > 0);
  }
});

test('exploratory and proposed work is not presented as an awarded partnership', () => {
  const byId = Object.fromEntries(
    academicNetwork.map((school) => [school.id, school]),
  );
  assert.match(byId['tu-wien'].relationship, /development/);
  assert.match(byId.ntu.relationship, /development/);
  assert.match(byId.musashino.relationship, /development/);
  assert.match(byId.eth.relationship, /exchange/i);
  assert.match(byId.uzh.relationship, /exchange/i);
  assert.match(byId['st-gallen'].relationship, /exchange/i);
  assert.match(byId.hawaii.relationship, /concept development/);
  assert.match(byId.rice.relationship, /Student-design collaboration.*OEDK/);
  assert.match(byId.stanford.relationship, /Robotics research/);
  assert.match(byId.nycu.relationship, /exploratory.*discussions/);
  assert.doesNotMatch(
    JSON.stringify(academicNetwork),
    /funded|awarded|official partner|endorsement/i,
  );
});

test('Stanford and Rice stay prominent with only approved relationship summaries', () => {
  assert.deepEqual(academicNetwork.slice(0, 3).map(({ id }) => id), [
    'purdue',
    'stanford',
    'rice',
  ]);
  assert.deepEqual(Object.keys(academicNetwork[2]), [
    'id', 'name', 'label', 'url', 'relationship', 'logo', 'width', 'height',
  ]);
});

test('every logo preserves documented artwork and is safe to serve locally', () => {
  assert.equal(provenance.logos.length, academicNetwork.length);
  for (const school of academicNetwork) {
    const record = provenance.logos.find(({ id }) => id === school.id);
    assert.ok(record, `Missing provenance: ${school.id}`);
    assert.equal(new URL(record.source).protocol, 'https:');
    assert.equal(school.logo, `/images/universities/${record.file}`);
    assert.equal(school.width, record.width);
    assert.equal(school.height, record.height);
    const bytes = readFileSync(
      new URL(`../public${school.logo}`, import.meta.url),
    );
    assert.equal(bytes.length, record.bytes);
    assert.equal(
      createHash('sha256').update(bytes).digest('hex'),
      record.sha256,
    );
    if (school.logo.endsWith('.svg')) {
      const svg = bytes.toString('utf8');
      assert.match(svg, /<svg\b/);
      assert.doesNotMatch(
        svg,
        /<script\b|<foreignObject\b|<animate\b|<set\b|\bon\w+\s*=/i,
      );
      assert.doesNotMatch(
        svg,
        /(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:|javascript:)/i,
      );
    } else {
      assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
      assert.equal(bytes.readUInt32BE(16), school.width);
      assert.equal(bytes.readUInt32BE(20), school.height);
    }
  }
});
