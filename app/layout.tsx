import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rero',
  description: 'Musical app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
