import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  publications,
  publicationGroups,
  publicationsForGroup,
} from '../lib/publications.mjs';

test('publication records have unique IDs, sources, and Chorong Park in the author list', () => {
  assert.ok(publications.length >= 14);
  assert.equal(
    new Set(publications.map((paper) => paper.id)).size,
    publications.length,
  );
  assert.equal(
    new Set(publications.map((paper) => paper.url)).size,
    publications.length,
  );
  for (const paper of publications) {
    assert.match(paper.id, /^[a-z0-9-]+$/);
    assert.ok(paper.authors.includes('Chorong Park'));
    assert.ok(paper.title && paper.venue && paper.kind);
    assert.equal(new URL(paper.url).protocol, 'https:');
    assert.ok(publicationGroups.some((group) => group.id === paper.group));
  }
});

test('categories are newest-first without presenting abstracts or preprints as research papers', () => {
  for (const group of publicationGroups) {
    const papers = publicationsForGroup(group.id);
    assert.ok(papers.length);
    assert.deepEqual(
      papers.map((paper) => paper.year),
      papers.map((paper) => paper.year).sort((a, b) => b - a),
    );
  }
  for (const paper of publicationsForGroup('research-papers'))
    assert.doesNotMatch(paper.kind, /preprint|abstract|workshop/i);
  assert.match(
    publicationsForGroup('preprints')[0].kind,
    /not a peer-reviewed publication/,
  );
  assert.equal(
    publications.find((paper) => paper.id === 'kansei-older-adults').year,
    2025,
  );
  assert.equal(
    publications.find((paper) => paper.id === 'privacy-one-click').recognition,
    'Honorable Mention',
  );
});
