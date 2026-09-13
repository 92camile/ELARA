import type { Metadata } from 'next';
import { siteOrigin } from '../lib/seo.mjs';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  verification: {
    google: '7RwQ6FKdwA4tvt48CB1HYUuNlXQXKRKPGD7U1n4XbqE',
  },
  title: 'Chorong Park | Human-Centered AI, Aging & Care',
  description:
    'Chorong Park, Ph.D., is a University of Houston researcher and designer working on human-centered AI, robotics, aging, and care. Explore her research, industry collaborations, publications, and ELARA Lab.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
