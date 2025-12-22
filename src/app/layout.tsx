// src/app/layout.tsx
import './globals.scss';
import { Kanit } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const kanit = Kanit({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-kanit',
});

export const metadata = {
  title: 'ระบบบริหารจัดการของบริจาค (Donation)',
  description: 'เว็บจัดการรับบริจาคและเบิกของบริจาคการอพยพ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={kanit.className}>
        <ThemeProvider>
          <Navbar />
          <main className="py-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}