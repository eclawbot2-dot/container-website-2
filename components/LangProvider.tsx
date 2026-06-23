'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dict, type Lang, type Dict } from '@/lib/i18n';

type LangCtx = {
  lang: Lang;
  t: Dict;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = 'tc2-lang';

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (window.localStorage.getItem(STORAGE_KEY) as Lang | null)
        : null;
    if (stored === 'en' || stored === 'ar') {
      setLangState(stored);
    }
  }, []);

  // Reflect language onto <html> and persist.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dict[lang].dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === 'en' ? 'ar' : 'en')),
    [],
  );

  return (
    <Ctx.Provider value={{ lang, t: dict[lang], toggle, setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
