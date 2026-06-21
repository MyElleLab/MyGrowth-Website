import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // All locales supported by the site
  locales: ['en', 'it', 'es', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always prefix the URL with the locale (/en, /it, /es, /de).
  // Required for static export so every locale gets its own set of HTML files.
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

// Native language names, used by the language picker.
export const localeNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  es: 'Español',
  de: 'Deutsch'
};
