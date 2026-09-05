import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ELARA | A New Horizon',
  description:
    'Something new is taking shape. Discover the beginning of ELARA.',
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
