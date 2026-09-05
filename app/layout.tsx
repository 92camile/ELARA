import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ELARA Lab | Human Agency Across the Lifespan',
  description:
    'Autonomy-preserving embodied AI to support independence, well-being, and control for older adults and people living with chronic conditions.',
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
