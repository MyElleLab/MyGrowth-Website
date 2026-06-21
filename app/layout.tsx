import type { ReactNode } from "react";

// The real layout (with <html> + <body>) lives in `app/[locale]/layout.tsx`.
// This root layout only needs to exist because `app/page.tsx` (the locale
// redirect) and `app/not-found.tsx` sit outside the `[locale]` segment.
// It simply passes children through; those routes render their own document.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
