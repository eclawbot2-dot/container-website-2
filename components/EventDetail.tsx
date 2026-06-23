'use client';

import { useLang } from './LangProvider';
import { getEvent, MAPS_URL, mapEmbedUrl } from '@/lib/config';
import { formatEventDateTime } from '@/lib/i18n';

/* ── Language toggle (shared brutalist style with the homepage) ───── */
function LangToggle() {
  const { lang, t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={t.langToggle.switchTo}
      className="group inline-flex items-stretch border border-ink font-grotesk text-xs font-bold uppercase tracking-widest"
    >
      <span
        className={`flex min-w-[44px] items-center justify-center px-3 py-2 ${lang === 'en' ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
      >
        EN
      </span>
      <span
        className={`flex min-w-[44px] items-center justify-center border-s border-ink px-3 py-2 ${lang === 'ar' ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
        style={{ fontFamily: 'var(--font-arabic), Tahoma, sans-serif' }}
      >
        ع
      </span>
    </button>
  );
}

export default function EventDetail({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const isAr = lang === 'ar';
  const ev = getEvent(slug);

  if (!ev) {
    // Should never render for a non-event slug (page guards with notFound()),
    // but keep a brutalist fallback for safety.
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <a href="/" className="border border-ink px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">
          {t.event.backToLineup}
        </a>
      </div>
    );
  }

  const genre = ev.genre ? (isAr ? ev.genre.ar : ev.genre.en) : '';
  const bio = ev.bio ? (isAr ? ev.bio.ar : ev.bio.en) : '';

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ── HEADER / NAV ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/" className="inline-flex min-h-[44px] items-center font-grotesk text-base font-bold tracking-brutal sm:text-lg">
            {isAr ? 'ذا كونتينر' : 'THE CONTAINER'}
            <span className="ms-2 align-super text-acid" aria-hidden>■</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/#lineup"
              className="hidden min-h-[44px] items-center border border-ink px-3 py-2 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper sm:inline-flex"
            >
              {t.nav.lineup}
            </a>
            <LangToggle />
          </div>
        </div>
      </header>

      {/* ── BACK LINK ──────────────────────────────────────────────── */}
      <div className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
          <a
            href="/#lineup"
            className="inline-flex min-h-[44px] items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper"
          >
            <span aria-hidden>{isAr ? '→' : '←'}</span>
            {t.event.backToLineup}
          </a>
        </div>
      </div>

      {/* ── HERO: artist + date ────────────────────────────────────── */}
      <section className="overflow-hidden border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink py-2">
            <time
              dateTime={ev.time ? `${ev.dateISO}T${ev.time}` : ev.dateISO}
              className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-ink"
            >
              {formatEventDateTime(ev.dateISO, lang, ev.time)}
            </time>
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
              {t.event.venueName} · Jeddah
            </span>
          </div>

          <div className="relative py-6 sm:py-10">
            <h1
              className={`display break-words text-ink ${isAr ? 'font-arabic' : 'font-grotesk'}`}
              style={{ fontSize: 'clamp(2.5rem, 11vw, 11rem)' }}
            >
              {ev.artist}
            </h1>
            <span className="absolute end-0 top-2 hidden h-10 w-10 bg-acid sm:block" aria-hidden />
          </div>

          {genre && (
            <div className="flex flex-wrap items-baseline gap-3 border-t border-ink py-3">
              <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concrete">
                {t.event.genreLabel}
              </span>
              <span className="font-grotesk text-sm font-bold uppercase tracking-widest text-concretedark">
                {genre}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── DETAIL GRID ────────────────────────────────────────────── */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="grid grid-cols-1 gap-0 border border-ink lg:grid-cols-2">
            {/* LEFT: facts + bio */}
            <div className="divide-y divide-ink lg:border-e lg:border-ink">
              <div className="p-4 sm:p-6">
                <h2 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                  {t.event.dateLabel}
                </h2>
                <p className="mt-2 text-base font-bold">
                  {formatEventDateTime(ev.dateISO, lang, ev.time)}
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                  {t.event.venueLabel}
                </h2>
                <p className="mt-2 text-base font-bold">{t.event.venueName}</p>
                <h3 className="mt-4 font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                  {t.event.locationLabel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{t.event.venueAddress}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 border border-ink bg-acid px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper"
                >
                  {t.event.mapCta}
                  <span aria-hidden>↗</span>
                </a>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                  {t.event.aboutArtist}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-concretedark">{bio}</p>
                <p className="mt-4 font-grotesk text-xs font-bold uppercase tracking-widest text-concrete">
                  {t.event.lineupNote}
                </p>
              </div>
              {/* Tickets — coming soon. Non-clickable placeholder (no URL on sale yet). */}
              <div className="p-4 sm:p-6">
                <h2 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                  {t.event.ticketsTitle}
                </h2>
                <span
                  aria-disabled="true"
                  className="mt-2 inline-flex min-h-[44px] cursor-not-allowed items-center border border-ink bg-paper px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest text-concrete opacity-60"
                  title={t.event.ticketsComingSoon}
                >
                  {t.event.ticketsComingSoon}
                </span>
              </div>
            </div>

            {/* RIGHT: map */}
            <div className="relative min-h-[320px] border-t border-ink bg-concrete lg:border-t-0">
              <iframe
                key={lang}
                title={isAr ? 'خريطة موقع ذا كونتينر في ميناء جدة' : 'Map showing The Container at Jeddah port'}
                src={mapEmbedUrl(lang)}
                className="absolute inset-0 h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>

          {/* bottom back link */}
          <div className="mt-8">
            <a
              href="/#lineup"
              className="inline-flex min-h-[44px] items-center gap-2 border border-ink px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper"
            >
              <span aria-hidden>{isAr ? '→' : '←'}</span>
              {t.event.backToLineup}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="overflow-hidden bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
          <a
            href="/"
            className={`display block break-words text-paper hover:text-acid ${isAr ? 'font-arabic' : 'font-grotesk'}`}
            style={{ fontSize: 'clamp(2rem, 8.5vw, 7rem)' }}
          >
            {isAr ? 'ذا كونتينر' : 'THE CONTAINER'}
          </a>
          <div className="mt-8 flex flex-col gap-2 border-t border-concretedark pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-grotesk text-xs uppercase tracking-widest text-concrete">
              © {new Date().getFullYear()} THE CONTAINER · {t.footer.rights}
            </span>
            <span className="font-grotesk text-xs uppercase tracking-widest text-concrete">
              Shams Container Terminal · Jeddah · KSA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
