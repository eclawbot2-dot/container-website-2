import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LangProvider } from '@/components/LangProvider';
import EventDetail from '@/components/EventDetail';
import { EVENTS_WITH_PAGES, getEvent, VENUE_COORDS } from '@/lib/config';

const SITE_URL = 'https://container2.jahdev.com';
const OG_IMAGE = `${SITE_URL}/images/port.jpg`;

// Pre-render one static page per event with a dedicated detail page.
export function generateStaticParams() {
  return EVENTS_WITH_PAGES.map((e) => ({ slug: e.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ev = getEvent(params.slug);
  if (!ev) return {};
  const title = `${ev.artist} — The Container · Jeddah`;
  const description = ev.bio?.en ?? `${ev.artist} live at The Container, Jeddah.`;
  const url = `${SITE_URL}/events/${ev.id}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'The Container',
      title,
      description,
      locale: 'en_US',
      alternateLocale: 'ar_SA',
      images: [{ url: OG_IMAGE, width: 800, height: 600, alt: `${ev.artist} at The Container` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const ev = getEvent(params.slug);
  if (!ev) notFound();

  // Per-event MusicEvent JSON-LD (no ticket offer URL until ticketing is real).
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${ev.artist} at The Container`,
    startDate: ev.time ? `${ev.dateISO}T${ev.time}:00+03:00` : ev.dateISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${SITE_URL}/events/${ev.id}/`,
    image: OG_IMAGE,
    description: ev.bio?.en,
    performer: { '@type': 'PerformingGroup', name: ev.artist },
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <LangProvider>
        <EventDetail slug={ev.id} />
      </LangProvider>
    </>
  );
}
