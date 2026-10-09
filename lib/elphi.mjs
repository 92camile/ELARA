export const elphiProject = {
  id: 'elphi',
  group: 'companion-robotics',
  title: 'Elphi: small moments, healthier routines',
  stage: 'Prototype development / Pilot planning',
  role: 'Project lead',
  collaborators: 'ELARA Lab',
  summary:
    'Elphi is a small social robot being developed to support everyday healthy habits in older adults. Through gentle reminders and encouragement, the project explores water breaks, a usual safe walk, and connection with family or friends, while keeping choices with the person.',
};

export const elphiScenarios = [
  {
    id: 'water',
    title: 'Make room for a water break',
    prompt: 'A gentle reminder, at a chosen moment.',
    description:
      'A prompt from Elphi could help someone fit a water break into an existing daily routine, at a time they choose.',
  },
  {
    id: 'walk',
    title: 'Encourage a familiar walk',
    prompt: 'An invitation, not an instruction.',
    description:
      'Elphi could offer encouragement for a usual, safe walk. The robot stays on the table; it does not supervise exercise or verify that a walk happened.',
  },
  {
    id: 'connection',
    title: 'Nudge a human connection',
    prompt: 'A small cue to reach out.',
    description:
      "A friendly reminder could prompt a call to family or a friend on the person's own phone. The aim is to support relationships, not replace them.",
  },
];

export const elphiArtwork = {
  src: '/images/research/elphi-everyday-scenarios.png',
  width: 1536,
  height: 1024,
  alt: 'Concept illustration in three panels: an older adult drinking water, another preparing for a walk, and another using a phone, each beside the cream sheep-shaped Elphi robot.',
  caption:
    'AI-generated concept illustration based on the Elphi design. These are proposed scenarios, not photographs of participants or completed research.',
};

export const elphiResearchNote =
  'Elphi is in development. A pilot is being planned; hardware testing, ethics approval, and site permission are required before participant research. These scenarios are research directions, not established health benefits.';
