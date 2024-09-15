import type { Metadata } from 'next';

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
        <div className='children'>
        {children}
        </div>
      </body>
    </html>
  );
}
