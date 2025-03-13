import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "sonner"

import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata = {
  title: 'Inventory Management System',
  description: 'A simple inventory management system',
};

export default function RootLayout({children}) {
  return (
    <html lang='en'>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <AuthProvider>
    <Toaster richColors position="bottom-right" />
      {children}
    </AuthProvider>
    </body>
    </html>
  );
}
