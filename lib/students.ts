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
};

export const students: Student[] = [
  {
    id: 'anika-vadlamudi',
    name: 'Anika Vadlamudi',
    role: 'Undergraduate researcher / volunteer',
    interests: ['Loneliness', 'Neurodivergence', 'AI'],
    bio: 'Anika is an undergraduate pre-med Biology student at the University of Houston who is passionate about working with and helping vulnerable populations.',
    photo: null,
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
];
