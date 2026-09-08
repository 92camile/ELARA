import assert from 'node:assert/strict';
import test from 'node:test';
import { getLinkedInWidgetId } from '../lib/linkedin.mjs';

test('missing configuration leaves the feed disabled', () => {
  for (const value of [undefined, '', '   ']) {
    assert.equal(getLinkedInWidgetId(value), null);
  }
});

test('accepts and normalizes a widget UUID', () => {
  const id = '12345678-abcd-4321-abcd-123456789abc';
  assert.equal(getLinkedInWidgetId(id), id);
  assert.equal(getLinkedInWidgetId(` ${id.toUpperCase()} `), id);
});

test('rejects snippets, URLs, prefixes, and malformed IDs', () => {
  for (const value of [
    'WIDGET_ID',
    'elfsight-app-12345678-abcd-4321-abcd-123456789abc',
    'https://elfsight.com/',
    '<script src="https://example.com"></script>',
    '12345678-abcd-4321-abcd-123456789abc" onclick="alert(1)',
    '12345678-abcd-4321-abcd-123456789ab',
    '12345678-abcd-4321-abcd-123456789abc\nother',
  ]) {
    assert.throws(() => getLinkedInWidgetId(value), /widget UUID/);
  }
});
