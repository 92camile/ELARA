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
      'robot-accessory',
      'moflin-cross-cultural-study',
      'autonomous-living-robotics',
      'creative-ai-provenance',
      'immersive-collaboration-joy',
      'ai-glasses',
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

test('pending proposals do not imply awarded funding or finalized partnerships', () => {
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

test('confidential research stays within the owner-approved public statement', () => {
  assert.deepEqual(
    currentResearchProjects.find((p) => p.id === 'robot-accessory'),
    {
      id: 'robot-accessory',
      group: 'companion-robotics',
      title: 'Robot accessory for emotional well-being & comfort',
      stage: 'Confidential research',
      role: 'Research project lead',
      collaborators: 'ELARA Lab',
      summary:
        'Developing a robot accessory for emotional well-being and comfort, informed by clinical data.',
    },
  );
});
