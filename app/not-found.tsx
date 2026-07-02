import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — THE CONTAINER',
  robots: { index: false, follow: false },
};

// Branded bilingual 404 (static export serves this as out/404.html).
// The language toggle is client-side, so show both languages side by side
// rather than pulling in the LangProvider for a dead-end page.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center font-grotesk text-base font-bold tracking-brutal sm:text-lg"
          >
            THE CONTAINER
            <span className="ms-2 align-super text-acid" aria-hidden>
              ■
            </span>
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <p
          className="display break-words text-ink"
          style={{ fontSize: 'clamp(4rem, 18vw, 14rem)' }}
        >
          404
        </p>
        <div className="mt-8 grid max-w-3xl grid-cols-1 gap-6 border-t border-ink pt-6 sm:grid-cols-2">
          <div>
            <p className="font-grotesk text-sm font-bold uppercase tracking-widest">
              Page not found.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-concretedark">
              The page you are looking for does not exist or has moved.
            </p>
          </div>
          <div dir="rtl" lang="ar" className="font-arabic">
            <p className="text-sm font-bold">الصفحة غير موجودة.</p>
            <p className="mt-2 text-sm leading-relaxed text-concretedark">
              الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 border border-ink bg-acid px-4 py-3 font-grotesk text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper"
          >
            <span aria-hidden>←</span>
            Home · الرئيسية
          </a>
        </div>
      </main>

      <footer className="border-t border-ink bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <span className="font-grotesk text-xs uppercase tracking-widest text-concrete">
            THE CONTAINER · Shams Container Terminal · Jeddah · KSA
          </span>
        </div>
      </footer>
    </div>
  );
}
