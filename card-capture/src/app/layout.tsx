import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthCheck from '@/components/common/Auth/AuthCheck';
import ReactQueryProvider from '@/utils/provider/ReactQueryProvider';
import { Toaster } from '@/components/ui/toaster';
import AmplitudeContextProvider from '@/utils/provider/AmplitudeContextProvider';

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
        <AmplitudeContextProvider>
          <ReactQueryProvider>
            <AuthCheck />
            {children}
            <Toaster />
          </ReactQueryProvider>
        </AmplitudeContextProvider>
      </body>
    </html>
  );
}
