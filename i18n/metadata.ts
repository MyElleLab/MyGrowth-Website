import { routing } from "./routing";

// Builds the hreflang `alternates.languages` map for a given path (without the
// locale prefix, e.g. "/support" or "" for the home page). Includes x-default.
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `/${locale}${path}`;
  }
  languages["x-default"] = `/${routing.defaultLocale}${path}`;
  return languages;
}
