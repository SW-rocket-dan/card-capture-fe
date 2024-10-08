import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthCheck from '@/components/common/Auth/AuthCheck';
import ReactQueryProvider from '@/utils/provider/ReactQueryProvider';
import { Toaster } from '@/components/ui/toaster';
import AmplitudeContextProvider from '@/utils/provider/AmplitudeContextProvider';
import fonts from '@/components/editor/EditingArea/components/TextBox/TextFonts';

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const fontVariables = Object.values(fonts)
    .map(font => font.variable)
    .join(' ');

  return (
    <html lang="en" className={fontVariables}>
      <body className={inter.className}>
        <AmplitudeContextProvider>
          <ReactQueryProvider>
            <AuthCheck />
            {children}
            {modal}
            <Toaster />
          </ReactQueryProvider>
        </AmplitudeContextProvider>
      </body>
    </html>
  );
}
