import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Provides the messages for the active locale during (static) rendering.
// No dynamic request APIs (headers/cookies) are used here so this stays
// fully compatible with `output: 'export'`.
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
