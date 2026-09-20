import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  currentResearchProjects,
  proposedResearchProjects,
  projectsReviewedOn,
  researchProjectGroups,
} from '../lib/current-projects.mjs';

test('current projects have unique stable anchors, valid groups, roles and stages', () => {
  const groups = researchProjectGroups.map((group) => group.id);
  const projects = [...currentResearchProjects, ...proposedResearchProjects];
  assert.equal(new Set(groups).size, groups.length);
  assert.equal(
    new Set([...groups, ...projects.map((p) => p.id)]).size,
    groups.length + projects.length,
  );
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const field of ['title', 'role', 'stage', 'summary']) {
      assert.equal(typeof project[field], 'string');
      assert.ok(project[field].trim().length > 0);
    }
    assert.ok(project.summary.split(/\s+/).length <= 70);
  }
  for (const project of currentResearchProjects) {
    assert.ok(groups.includes(project.group));
    assert.ok(project.collaborators);
  }
  for (const group of groups) {
    assert.ok(currentResearchProjects.some((p) => p.group === group));
  }
  assert.match(projectsReviewedOn, /^\d{4}-\d{2}-\d{2}$/);
});

test('CV-based research coverage is separate from proposed work and historical portfolios', () => {
  assert.deepEqual(
    currentResearchProjects.map((p) => p.id),
    [
      'pupper-study',
      'dogvest',
      'robot-dog-navigation',
      'touch-mediated-assistance',
      'moflin-cross-cultural-study',
      'autonomous-living-robotics',
      'technology-difficulties-llm',
      'creative-ai-provenance',
      'immersive-collaboration-joy',
      'ai-glasses',
      'earbud-eeg-audio',
      'robotics-in-nursing',
      'alzheimers-community-engagement',
      'cross-cultural-care',
      'intergenerational-tech-initiative',
      'agefreetech',
    ],
  );
  assert.equal(proposedResearchProjects.length, 13);
  for (const project of proposedResearchProjects) {
    assert.match(
      project.stage,
      /proposal|application|review|intent|concept|draft|preparation/i,
    );
  }
  const content = JSON.stringify([
    ...currentResearchProjects,
    ...proposedResearchProjects,
  ]);
  assert.doesNotMatch(
    content,
    /11573805|2643368|735765|999,504|327,204|@|Referee Details|Insert Project Scope/,
  );
  assert.doesNotMatch(
    content,
    /microsoft-career|dolby|privacy-robot-workshop/i,
  );
});

test('early-stage systems and pending proposals do not imply clinical validation or awarded funding', () => {
  assert.match(
    currentResearchProjects.find((p) => p.id === 'earbud-eeg-audio').summary,
    /effectiveness has not been established/,
  );
  assert.match(
    currentResearchProjects.find((p) => p.id === 'autonomous-living-robotics')
      .summary,
    /not an awarded grant/,
  );
  assert.match(
    proposedResearchProjects.find((p) => p.id === 'humanoid-assistive-robotics')
      .summary,
    /not a finalized partnership/,
  );
});
