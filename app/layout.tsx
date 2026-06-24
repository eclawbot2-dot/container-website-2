import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Cairo } from 'next/font/google';
import './globals.css';
import { VENUE_COORDS, EVENTS } from '@/lib/config';

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

const SITE_URL = 'https://container2.jahdev.com';
const TITLE = 'THE CONTAINER — Jeddah · Red Sea Port';
const DESCRIPTION =
  "Jeddah's raw industrial techno & house venue on the Red Sea port. Live licensed electronic-music events at Shams Container Terminal.";
const OG_IMAGE = `${SITE_URL}/images/port.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'The Container',
  keywords: [
    'The Container',
    'Jeddah techno',
    'Red Sea',
    'electronic music Saudi Arabia',
    'house music Jeddah',
    'Shams Container Terminal',
    'live music venue',
  ],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'The Container',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 1800,
        alt: 'Crowd at a live electronic-music event inside The Container — a raw industrial venue in Jeddah',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

// ── Structured data (JSON-LD) ──────────────────────────────────────────────
const venueLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicVenue',
  name: 'The Container',
  url: SITE_URL,
  description: DESCRIPTION,
  image: OG_IMAGE,
  // No verified social profiles yet — omit sameAs rather than link a guessed handle.
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shams Container Terminal, Al Moulysaa district, Jeddah port area',
    addressLocality: 'Jeddah',
    addressRegion: 'Makkah Province',
    addressCountry: 'SA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: VENUE_COORDS.lat,
    longitude: VENUE_COORDS.lng,
  },
};

const eventsLd = EVENTS.filter((e) => !e.tba).map((e) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicEvent',
  name: `${e.artist} at The Container`,
  startDate: e.dateISO,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  url: `${SITE_URL}/events/${e.id}/`,
  image: OG_IMAGE,
  // Ticketing not yet open — no offers/URL until a real ticket link exists.
  performer: { '@type': 'PerformingGroup', name: e.artist },
  location: {
    '@type': 'MusicVenue',
    name: 'The Container',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shams Container Terminal, Jeddah port area',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: VENUE_COORDS.lat,
      longitude: VENUE_COORDS.lng,
    },
  },
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(venueLd) }}
        />
        {eventsLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
      </head>
      <body className={`${grotesk.variable} ${cairo.variable} font-grotesk`}>
        {children}
      </body>
    </html>
  );
}
