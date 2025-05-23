import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'] // Adjust weights as needed
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Kevich Solutions Tech Task - Train Schedule!',
  description: 'This task was done by Nikolai Tuz as a technical task for Kevich Solutions company!'
};

export default function
  RootLayout({
               children
             }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${poppins.variable} ${geistMono.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}