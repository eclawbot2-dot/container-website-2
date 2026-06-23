// ── Venue config — single place to confirm/swap real values ────────────────
//
// LINK POLICY (no BS links):
// Every outward link is either VERIFIED-REAL or a clearly-labelled, non-clickable
// PLACEHOLDER. We do NOT guess social handles, ticket URLs or mailboxes.

// Instagram: NO verified handle is known for this venue.
// TODO real IG unknown — do NOT publish a guessed instagram.com link.
export const INSTAGRAM_HANDLE: string | null = null;
// When a real handle is confirmed, set INSTAGRAM_URL to `https://instagram.com/<handle>`.
export const INSTAGRAM_URL: string | null = null;

// Tickets: NO verified ticketing URL is known.
// TODO real tickets URL unknown — show a "coming soon" placeholder, never a guessed ticketer.
export const TICKETS_URL: string | null = null;

// Contact email: no live mailbox is provisioned yet.
// TODO real mailbox unknown — UI renders a non-link "Contact — coming soon" label (see i18n placeholders).

// Venue geo (Al Moulysaa district, Jeddah port, Red Sea coast) — VERIFIED.
export const VENUE_COORDS = { lat: 21.2727, lng: 39.1935 };

// Open the location in Google Maps (new tab, "Open in Maps" link) — VERIFIED, working.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${VENUE_COORDS.lat},${VENUE_COORDS.lng}`;

// Reliable, no-API-key Google Maps embed iframe. Language-aware via `hl`.
// Returns a tile-server-backed map that does not depend on third-party static-map hosts.
export function mapEmbedUrl(lang: 'en' | 'ar' = 'en'): string {
  return `https://www.google.com/maps?q=${VENUE_COORDS.lat},${VENUE_COORDS.lng}&z=15&hl=${lang}&output=embed`;
}

export type EventItem = {
  id: string;
  dateISO: string; // for sorting / datetime attr
  artist: string;
  tba?: boolean;
  // Optional time + bilingual bio for events that have a dedicated detail page.
  time?: string; // e.g. '23:00'
  genre?: { en: string; ar: string };
  bio?: { en: string; ar: string };
};

// Real confirmed lineup (verified via Bandsintown/Shazam). Lineup subject to change.
export const EVENTS: EventItem[] = [
  {
    id: 'anja-schneider',
    dateISO: '2026-08-21',
    artist: 'Anja Schneider',
    time: '23:00',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Berlin-based DJ, producer and broadcaster — a long-standing figure in international house and techno, and founder of the SOUS Music label.',
      ar: 'منسّقة أغانٍ ومنتجة ومذيعة مقيمة في برلين — شخصية راسخة في موسيقى الهاوس والتكنو العالمية، ومؤسِّسة شركة SOUS Music للتسجيلات.',
    },
  },
  {
    id: 'cassy',
    dateISO: '2026-09-11',
    artist: 'Cassy',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Austrian-Greek DJ and producer celebrated for deep, hypnotic house and techno and long, immersive sets; founder of Kwench Records.',
      ar: 'منسّقة أغانٍ ومنتجة نمساوية يونانية، اشتهرت بموسيقى الهاوس والتكنو العميقة المنوّمة وبعروضها الطويلة الغامرة؛ مؤسِّسة Kwench Records.',
    },
  },
  { id: 'tba-1', dateISO: '2026-10-16', artist: 'TBA', tba: true },
];

// Events that have a dedicated, pre-rendered detail page at /events/[slug].
export const EVENTS_WITH_PAGES = EVENTS.filter((e) => !e.tba && e.bio);

export function getEvent(slug: string): EventItem | undefined {
  return EVENTS_WITH_PAGES.find((e) => e.id === slug);
}
