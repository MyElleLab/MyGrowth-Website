import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import GridBackground from "../components/GridBackground";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Canonical production domain, used for absolute URLs in metadata/hreflang.
const SITE_URL = "https://mygrowth.myellelab.com";

// Pre-render one set of HTML files per locale (required for `output: 'export'`).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  // hreflang map: every locale variant of the home page, plus x-default.
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );
  languages["x-default"] = `/${routing.defaultLocale}`;

  // Full OG locale codes (WhatsApp/Facebook expect e.g. en_US, not just en).
  const ogLocales: Record<string, string> = {
    en: "en_US",
    it: "it_IT",
    es: "es_ES",
    de: "de_DE",
  };

  // Absolute URL to a JPG social card (1200x630). Absolute + JPG, not WebP,
  // so finicky scrapers like WhatsApp reliably render a preview.
  const ogImage = `${SITE_URL}/og-image.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: ["habit tracker", "iOS", "privacy", "heatmap", "health", "fitness"],
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: `${SITE_URL}/${locale}/`,
      siteName: "MyGrowth",
      type: "website",
      locale: ogLocales[locale] ?? "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "MyGrowth",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate the incoming locale and enable static rendering for it.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
      </head>
      <body className="bg-mls-bg text-mls-text antialiased">
        <NextIntlClientProvider>
          <GridBackground />
          <div className="relative z-10">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
