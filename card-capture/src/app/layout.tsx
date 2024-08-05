import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthCheck from '@/components/common/Auth/AuthCheck';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Card Capture',
  description: 'Card Poster Created by AI',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCheck />
        {children}
      </body>
    </html>
  );
}
