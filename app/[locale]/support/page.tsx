import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/i18n/metadata";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FaqAccordion from "../../components/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.support" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/support`,
      languages: localeAlternates("/support"),
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SupportContent />;
}

function SupportContent() {
  const t = useTranslations("Support");
  const tc = useTranslations("Common");
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-mls-muted hover:text-mls-green transition-colors mb-10"
          >
            ← {tc("backHome")}
          </Link>

          <header className="mb-12 space-y-2">
            <h1 className="text-4xl font-bold text-mls-text">{t("title")}</h1>
            <p className="text-mls-muted">{t("intro")}</p>
          </header>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-mls-text mb-6">
              {t("faqHeading")}
            </h2>
            <FaqAccordion />
          </section>

          {/* Contact */}
          <section className="p-6 rounded-xl border border-mls-border bg-mls-surface space-y-4">
            <h2 className="text-xl font-semibold text-mls-text">
              {t("contactTitle")}
            </h2>
            <p className="text-mls-muted leading-relaxed">{t("contactBody")}</p>
            <a
              href="mailto:support@myellelab.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mls-green text-mls-bg font-semibold text-sm hover:bg-mls-green-3 transition-colors"
            >
              {t("emailCta")}
            </a>

            <div className="pt-2 border-t border-mls-border">
              <p className="text-xs text-mls-muted">
                {t.rich("reviewText", {
                  link: (chunks) => (
                    <a
                      href="https://apps.apple.com/app/id6761617617"
                      className="text-mls-green hover:underline"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
