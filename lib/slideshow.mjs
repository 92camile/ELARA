export const workshopPhotos = [
  {
    src: '/images/community/workshop-1.png',
    alt: 'Workshop participants and facilitators explore small companion robots together at a table.',
  },
  {
    src: '/images/community/workshop-2.png',
    alt: 'Participants seated around tables listen to a presentation in a community hall.',
  },
  {
    src: '/images/community/workshop-3.jpg',
    alt: 'Hands shape a red clay figure beside a small robot with blue eyes.',
  },
  {
    src: '/images/community/workshop-4.jpg',
    alt: 'A small group works with clay and worksheets while a facilitator joins the conversation.',
  },
];

export function slideIndex(index, count) {
  return ((index % count) + count) % count;
}
