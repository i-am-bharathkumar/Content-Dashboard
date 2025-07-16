import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProvider from '@/components/providers/StoreProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personalized Content Dashboard',
  description: 'Your personalized hub for news, entertainment, and social content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}