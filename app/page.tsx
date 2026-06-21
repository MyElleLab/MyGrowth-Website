"use client";

import { useEffect } from "react";
import { routing } from "@/i18n/routing";

// Root URL ("/") for the static export. There is no server/middleware to read
// `Accept-Language`, so we detect the visitor's language on the client:
//   1. A previously chosen locale (NEXT_LOCALE cookie) wins.
//   2. Otherwise match the browser's preferred languages.
//   3. Otherwise fall back to the default locale.
// Then we redirect to the locale-prefixed home page.
function detectLocale(): string {
  const locales = routing.locales as readonly string[];

  // 1. Remembered choice (set by the language picker).
  const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  const stored = cookieMatch?.[1];
  if (stored && locales.includes(stored)) return stored;

  // 2. Browser preferences, most-preferred first.
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const lang of preferred) {
    const base = lang.toLowerCase().split("-")[0];
    if (locales.includes(base)) return base;
  }

  // 3. Fallback.
  return routing.defaultLocale;
}

export default function RootRedirectPage() {
  useEffect(() => {
    const locale = detectLocale();
    // `trailingSlash: true`, so target the slashed path.
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1117",
          color: "#8b949e",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Visible only briefly before the redirect; also a no-JS fallback. */}
        <noscript>
          <a href="/en/" style={{ color: "#39d353" }}>
            Continue to MyGrowth
          </a>
        </noscript>
      </body>
    </html>
  );
}
