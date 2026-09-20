export type Student = {
  id: string;
  name: string;
  role: string;
  interests: string[];
  bio: string;
  photo: string | null;
  photoWidth?: number;
  photoHeight?: number;
  email?: string;
  linkedin?: string;
  portfolio?: string;
};

export const students: Student[] = [
  {
    id: 'hayley-b-lukken',
    name: 'Hayley B. Lukken',
    role: "Industrial design master's graduate",
    interests: ['Social engagement', 'Design for neurodiversity'],
    bio: "Hayley completed her master's studies in industrial design with a thesis focused on designing a social engagement device for people with ADHD and autistic people.",
    photo: null,
  },
  {
    id: 'jevin-pinto',
    name: 'Jevin Pinto',
    role: 'Undergraduate student, B.S. Environmental Design',
    interests: ['AI integration', 'UX/UI'],
    bio: 'Jevin is an undergraduate student exploring the built environment through a multidisciplinary lens. By working across different design media, he seeks to understand connections between people, objects, and spaces.',
    photo: '/students/jevin-pinto.png',
    photoWidth: 1792,
    photoHeight: 2011,
    email: 'jevin.marcus.pinto@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jevinpinto',
    portfolio: 'https://jevinmarcuspinto.myportfolio.com/',
  },
  {
    id: 'jana-qaddoura',
    name: 'Jana Qaddoura',
    role: 'Undergraduate student, B.S. Health',
    interests: ['Epidemiology', 'Digital health literacy'],
    bio: 'Jana is an undergraduate student who aspires to become an epidemiologist, with a strong interest in advancing public health through research and community engagement. She values community service and health initiatives that support diverse populations.',
    photo: '/students/jana-qaddoura.png',
    photoWidth: 377,
    photoHeight: 250,
    email: 'jsqaddou@cougarnet.uh.edu',
    linkedin: 'https://www.linkedin.com/in/jana-qaddoura/',
  },
  {
    id: 'levi-abrahams',
    name: 'Levi Abrahams',
    role: 'Undergraduate student, pre-med',
    interests: [
      'Community improvement',
      'Health',
      'Biological psychology',
      'Psychiatry',
    ],
    bio: 'Levi is a pre-med student at the University of Houston who hopes to attend medical school and become a psychiatrist. Originally from Austin, Texas, he enjoys soccer and finding ways to support his community.',
    photo: '/students/levi-abrahams.jpg',
    photoWidth: 307,
    photoHeight: 250,
    email: 'abrahams.levi@gmail.com',
  },
  {
    id: 'noorul-maqbool',
    name: 'Noorul Maqbool',
    role: 'Undergraduate student, B.S. in Biology',
    interests: ['Medical technology', 'Digital literacy'],
    bio: 'Noorul is a pre-med student interested in using technology to improve patient literacy and disease management. Noorul hopes to apply technological innovation to challenges such as social isolation and memory problems.',
    photo: '/students/noorul-maqbool.png',
    photoWidth: 250,
    photoHeight: 294,
    email: 'noma7280@gmail.com',
    linkedin: 'https://www.linkedin.com/in/noorul-m-a41589249/',
  },
  {
    id: 'anika-vadlamudi',
    name: 'Anika Vadlamudi',
    role: 'Undergraduate researcher / volunteer',
    interests: ['Loneliness', 'Neurodivergence', 'AI'],
    bio: 'Anika is an undergraduate pre-med Biology student at the University of Houston who is passionate about working with and helping vulnerable populations.',
    photo: null,
  },
  {
    id: 'henrique-pfeiffer',
    name: 'Henrique Pfeiffer',
    role: 'Undergraduate student, Psychology',
    interests: [
      'Human-computer interaction (HCI)',
      'Human-robot interaction (HRI)',
      'Interdisciplinary project management',
    ],
    bio: 'Henrique is an undergraduate Psychology student at the University of Houston who is passionate about understanding human behavior and the ways people interact with technology. He is particularly interested in creating technology that is meaningful, accessible, and centered around people.',
    photo: null,
  },
];
