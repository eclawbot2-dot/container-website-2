'use client';

import { useLang } from './LangProvider';
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  CONTACT_EMAIL,
  MAPS_URL,
  mapEmbedUrl,
  EVENTS,
} from '@/lib/config';
import { formatEventDate } from '@/lib/i18n';

/* ── Language toggle ─────────────────────────────────────────────── */
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

/* ── Section number / eyebrow label ──────────────────────────────── */
function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-ink pb-2">
      <span className="font-grotesk text-xs font-bold tabular-nums tracking-widest text-ink">
        {num}
      </span>
      <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
        {children}
      </span>
    </div>
  );
}

/* ── Marquee strip ───────────────────────────────────────────────── */
function Marquee({ text }: { text: string }) {
  const seg = ` ${text}  /  `;
  return (
    <div className="overflow-hidden border-y border-ink bg-acid">
      <div className="marquee-track py-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="font-grotesk text-sm font-bold uppercase tracking-widest text-ink"
          >
            {seg}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Site() {
  const { lang, t } = useLang();
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ── HEADER / NAV ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="inline-flex min-h-[44px] items-center font-grotesk text-base font-bold tracking-brutal sm:text-lg">
            {isAr ? 'ذا كونتينر' : 'THE CONTAINER'}
            <span className="ms-2 align-super text-acid" aria-hidden>■</span>
          </a>
          <nav aria-label={isAr ? 'التنقل الرئيسي' : 'Primary'} className="hidden items-center gap-6 md:flex">
            <a href="#about" className="inline-flex min-h-[44px] items-center font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.about}</a>
            <a href="#lineup" className="inline-flex min-h-[44px] items-center font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.lineup}</a>
            <a href="#visit" className="inline-flex min-h-[44px] items-center font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.visit}</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[44px] items-center border border-ink px-3 py-2 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-acid sm:inline-flex"
            >
              {t.nav.tickets}
            </a>
            <LangToggle />
          </div>
        </div>
        {/* Mobile section nav — header nav is hidden on small screens */}
        <nav
          aria-label={isAr ? 'التنقل في الصفحة' : 'Page sections'}
          className="flex items-stretch border-t border-ink md:hidden"
        >
          <a href="#about" className="flex min-h-[44px] flex-1 items-center justify-center border-e border-ink font-grotesk text-[0.7rem] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.about}</a>
          <a href="#lineup" className="flex min-h-[44px] flex-1 items-center justify-center border-e border-ink font-grotesk text-[0.7rem] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.lineup}</a>
          <a href="#visit" className="flex min-h-[44px] flex-1 items-center justify-center font-grotesk text-[0.7rem] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper">{t.nav.visit}</a>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section id="top" className="overflow-hidden border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          {/* kicker row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink py-2">
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em]">
              {t.hero.kicker}
            </span>
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
              21.2727° N · 39.1935° E
            </span>
          </div>

          {/* massive type */}
          <div className="relative py-6 sm:py-10">
            <h1
              className={`display break-words text-ink ${isAr ? 'font-arabic' : 'font-grotesk'}`}
              style={{
                fontSize: 'clamp(2.75rem, 15vw, 16rem)',
              }}
            >
              {isAr ? (
                <>ذا<br />كونتينر</>
              ) : (
                <>THE<br />CONTAINER</>
              )}
            </h1>
            {/* acid block accent */}
            <span className="absolute end-0 top-2 hidden h-10 w-10 bg-acid sm:block" aria-hidden />
          </div>

          {/* tagline + CTAs grid */}
          <div className="grid grid-cols-1 gap-0 border-t border-ink md:grid-cols-12">
            <div className="border-ink p-4 sm:p-6 md:col-span-7 md:border-e">
              <p className="max-w-2xl text-base leading-snug sm:text-lg">
                {t.hero.tagline}
              </p>
            </div>
            <div className="grid grid-cols-2 md:col-span-5">
              <a
                href="#lineup"
                className="flex items-center justify-between border-t border-ink bg-acid p-4 font-grotesk text-sm font-bold uppercase tracking-widest hover:bg-ink hover:text-paper sm:p-6 md:border-t-0"
              >
                {t.hero.cta}
                <span aria-hidden>{isAr ? '←' : '→'}</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-s border-t border-ink p-4 font-grotesk text-sm font-bold uppercase tracking-widest hover:bg-ink hover:text-paper sm:p-6 md:border-t-0"
              >
                {t.hero.instagram}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee text={isAr ? 'تكنو · هاوس · البحر الأحمر · جدة' : 'TECHNO · HOUSE · RED SEA PORT · JEDDAH'} />

      {/* ── 01 ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-16">
          <SectionLabel num="01">{t.about.eyebrow}</SectionLabel>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-grotesk text-3xl font-bold leading-tight tracking-brutal sm:text-5xl">
                {t.about.title}
              </h2>
              <div className="mt-6 space-y-4 max-w-2xl">
                {t.about.body.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-concretedark">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            {/* framed B/W insert + stats */}
            <div className="lg:col-span-5">
              <figure className="border border-ink">
                <img
                  src="/images/port.jpg"
                  alt={isAr ? 'حاويات شحن في ميناء جدة' : 'Shipping containers at the Jeddah port'}
                  className="bw aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <figcaption className="border-t border-ink px-3 py-2 font-grotesk text-[0.65rem] font-bold uppercase tracking-widest text-concretedark">
                  {isAr ? 'محطة شمس للحاويات · جدة' : 'Shams Container Terminal · Jeddah'}
                </figcaption>
              </figure>
              <dl className="mt-0 grid grid-cols-1 border border-t-0 border-ink">
                {t.about.stats.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-baseline justify-between gap-4 px-3 py-3 ${i > 0 ? 'border-t border-ink' : ''}`}
                  >
                    <dt className="font-grotesk text-sm font-bold uppercase tracking-wide">{s.value}</dt>
                    <dd className="text-end text-xs text-concretedark">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 LINEUP ────────────────────────────────────────────── */}
      <section id="lineup" className="border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-16">
          <div className="flex items-baseline gap-3 border-b border-paper pb-2">
            <span className="font-grotesk text-xs font-bold tabular-nums tracking-widest">02</span>
            <span className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concrete">{t.lineup.eyebrow}</span>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-grotesk text-3xl font-bold tracking-brutal sm:text-5xl">{t.lineup.title}</h2>
            <p className="max-w-md text-sm text-concrete">{t.lineup.subtitle}</p>
          </div>

          {/* rows */}
          <ul className="mt-8 border-t border-paper">
            {EVENTS.map((ev) => (
              <li
                key={ev.id}
                className="group grid grid-cols-1 items-center gap-2 border-b border-paper py-5 sm:grid-cols-12 sm:gap-4"
              >
                <time
                  dateTime={ev.dateISO}
                  className="font-grotesk text-xs font-bold uppercase tracking-widest text-acid sm:col-span-3"
                >
                  {formatEventDate(ev.dateISO, lang)}
                </time>
                <span className="font-grotesk text-2xl font-bold tracking-brutal sm:col-span-6 sm:text-4xl">
                  {ev.tba ? t.lineup.tba : ev.artist}
                </span>
                <div className="sm:col-span-3 sm:text-end">
                  {ev.tba ? (
                    <span className="inline-block border border-concrete px-3 py-2 font-grotesk text-xs font-bold uppercase tracking-widest text-concrete">
                      {t.lineup.tba}
                    </span>
                  ) : (
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 border border-acid bg-acid px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest text-ink hover:bg-paper hover:text-ink"
                    >
                      {t.lineup.ticketsCta}
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-concrete">{t.lineup.note}</p>
        </div>
      </section>

      {/* ── 03 VISIT ─────────────────────────────────────────────── */}
      <section id="visit" className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-16">
          <SectionLabel num="03">{t.visit.eyebrow}</SectionLabel>
          <div className="mt-6 grid grid-cols-1 gap-0 border border-ink lg:grid-cols-2">
            {/* text column */}
            <div className="divide-y divide-ink lg:border-e lg:border-ink">
              <div className="p-4 sm:p-6">
                <h2 className="font-grotesk text-3xl font-bold tracking-brutal sm:text-5xl">{t.visit.title}</h2>
              </div>
              {[
                { title: t.visit.addressTitle, body: t.visit.address },
                { title: t.visit.gettingThereTitle, body: t.visit.gettingThere },
                { title: t.visit.hoursTitle, body: t.visit.hours },
                { title: t.visit.entryTitle, body: t.visit.entry },
              ].map((b, i) => (
                <div key={i} className="p-4 sm:p-6">
                  <h3 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concretedark">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{b.body}</p>
                </div>
              ))}
              <div className="p-4 sm:p-6">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink bg-acid px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper"
                >
                  {t.visit.mapCta}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
            {/* map column */}
            <div className="relative min-h-[320px] border-t border-ink bg-concrete lg:border-s-0 lg:border-t-0">
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
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="overflow-hidden bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
          <p
            className={`display break-words text-paper ${isAr ? 'font-arabic' : 'font-grotesk'}`}
            style={{ fontSize: 'clamp(2rem, 8.5vw, 7rem)' }}
          >
            {isAr ? 'ذا كونتينر' : 'THE CONTAINER'}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-concretedark pt-8 sm:grid-cols-3">
            <div>
              <h4 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concrete">{t.footer.follow}</h4>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-grotesk text-lg font-bold hover:text-acid"
              >
                @{INSTAGRAM_HANDLE} ↗
              </a>
            </div>
            <div>
              <h4 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concrete">{t.footer.contact}</h4>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block font-grotesk text-lg font-bold hover:text-acid">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h4 className="font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-concrete">{t.footer.eventsNote}</h4>
              <p className="mt-2 max-w-xs text-sm text-concrete">{t.footer.tagline}</p>
            </div>
          </div>
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
