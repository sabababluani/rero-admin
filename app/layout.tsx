import type { Metadata } from 'next';
import './globals.css';
import SideHeader from './Components/SideHeader/SideHeader';

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
      <body>
        <div className="layout">
          <SideHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
