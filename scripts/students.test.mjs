import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { students } from '../lib/students.ts';

test('student list puts Henrique first and includes Agah once', () => {
  assert.deepEqual(
    students.map((student) => student.id),
    [
      'henrique-pfeiffer',
      'agah-duzenli',
      'hayley-b-lukken',
      'jevin-pinto',
      'jana-qaddoura',
      'levi-abrahams',
      'noorul-maqbool',
      'anika-vadlamudi',
    ],
  );
  assert.equal(
    new Set(students.map((student) => student.id)).size,
    students.length,
  );
});

test('Agah profile uses the supplied undergraduate and Elphi research details', () => {
  const agah = students.find((student) => student.id === 'agah-duzenli');
  assert.equal(agah.name, 'Agah Duzenli');
  assert.equal(agah.role, 'Undergraduate student, Computer Science');
  assert.match(agah.bio, /University of Houston/);
  assert.match(agah.bio, /developing a personalized AI model for Elphi/);
  assert.match(agah.bio, /aimed at supporting behavior change/);
  assert.match(agah.bio, /older adults/);
  assert.ok(agah.interests.includes('Human-AI interaction'));
  assert.equal(agah.email, undefined);
  assert.equal(agah.linkedin, undefined);
});

test('Agah portrait preserves the supplied PNG bytes and dimensions', () => {
  const agah = students.find((student) => student.id === 'agah-duzenli');
  const bytes = readFileSync(
    new URL(`../public${agah.photo}`, import.meta.url),
  );
  assert.equal(bytes.subarray(1, 4).toString('ascii'), 'PNG');
  assert.equal(bytes.readUInt32BE(16), agah.photoWidth);
  assert.equal(bytes.readUInt32BE(20), agah.photoHeight);
  assert.equal(
    createHash('sha256').update(bytes).digest('hex'),
    '7411c06bfeab2956d48c5624dadfefb1e0e39a1601fe35e03fb0dc155cd0c3be',
  );
});
