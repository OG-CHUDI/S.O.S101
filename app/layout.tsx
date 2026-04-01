import type { Metadata } from 'next';
import './globals.css';
import { StudyProvider } from '@/context/study-context';

export const metadata: Metadata = {
  title: 'S.O.S — Study Operating System',
  description: 'Stay focused. Study smarter. Track your progress with AI-powered insights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StudyProvider>{children}</StudyProvider>
      </body>
    </html>
  );
}
