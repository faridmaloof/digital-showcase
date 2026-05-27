import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '../types/cv';

const STORAGE_KEY = 'cv-locale';

const detectLocale = (): Locale => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'es' || saved === 'en') {
    return saved;
  }

  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'en';
};

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useMemo(
    () => () => {
      setLocale((prev) => (prev === 'es' ? 'en' : 'es'));
    },
    []
  );

  return { locale, setLocale, toggleLocale };
};
