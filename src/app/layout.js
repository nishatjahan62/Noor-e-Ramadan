// src/app/layout.js
import Navbar from '@/components/Navbar';
import './globals.css';

import { Sora, Noto_Sans_Bengali } from "next/font/google";

export const metadata = {
  title: 'Noor-E-Ramadan',
  description: 'Ramadan 2026 timings and more',
};

// fonts 
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-bn",
});

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${sora.variable} ${notoBengali.variable} min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-slate-100 antialiased transition-colors duration-300`}>
        <Navbar />
        <main className="pt-20 md:pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}