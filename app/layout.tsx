import type { Metadata } from 'next';
import { Space_Grotesk, Cairo } from 'next/font/google';
import './globals.css';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '900'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THE CONTAINER — Jeddah · Red Sea Port',
  description:
    "Jeddah's raw industrial techno & house venue on the Red Sea port. Live licensed electronic-music events at Shams Container Terminal.",
  metadataBase: new URL('https://container2.jahdev.com'),
  openGraph: {
    title: 'THE CONTAINER — Jeddah · Red Sea Port',
    description:
      "Jeddah's raw industrial techno & house venue on the Red Sea port.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${grotesk.variable} ${cairo.variable} font-grotesk`}>
        {children}
      </body>
    </html>
  );
}
