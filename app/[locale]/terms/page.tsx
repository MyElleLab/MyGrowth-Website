import type { Metadata } from "next";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/i18n/metadata";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.terms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: localeAlternates("/terms"),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("Terms");
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

          <article className="space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-mls-text">{t("title")}</h1>
              <p className="text-sm text-mls-muted">{t("lastUpdated")}</p>
            </header>

            <p className="text-mls-muted leading-relaxed">{t("intro")}</p>

            <Section title={t("acceptance.title")}>
              <p className="text-mls-muted leading-relaxed">{t("acceptance.body")}</p>
            </Section>

            <Section title={t("description.title")}>
              <p className="text-mls-muted leading-relaxed">{t("description.body")}</p>
            </Section>

            <Section title={t("responsibilities.title")}>
              <ul className="space-y-2 text-mls-muted">
                {t.raw("responsibilities.items").map((item: string, i: number) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </ul>
            </Section>

            <Section title={t("dataPrivacy.title")}>
              <ul className="space-y-2 text-mls-muted">
                <ListItem>{t("dataPrivacy.item1")}</ListItem>
                <ListItem>{t("dataPrivacy.item2")}</ListItem>
                <ListItem>
                  {t.rich("dataPrivacy.item3", {
                    link: (chunks) => (
                      <Link href="/privacy" className="text-mls-green hover:underline">
                        {chunks}
                      </Link>
                    ),
                  })}
                </ListItem>
              </ul>
            </Section>

            <Section title={t("ip.title")}>
              <p className="text-mls-muted leading-relaxed">{t("ip.body")}</p>
            </Section>

            <Section title={t("iap.title")}>
              <p className="text-mls-muted leading-relaxed">{t("iap.body")}</p>
            </Section>

            <Section title={t("warranties.title")}>
              <p className="text-mls-muted leading-relaxed">{t("warranties.body")}</p>
            </Section>

            <Section title={t("liability.title")}>
              <p className="text-mls-muted leading-relaxed">{t("liability.body")}</p>
            </Section>

            <Section title={t("dataLoss.title")}>
              <p className="text-mls-muted leading-relaxed">{t("dataLoss.body")}</p>
            </Section>

            <Section title={t("modifications.title")}>
              <p className="text-mls-muted leading-relaxed">{t("modifications.body")}</p>
            </Section>

            <Section title={t("termination.title")}>
              <p className="text-mls-muted leading-relaxed">{t("termination.body")}</p>
            </Section>

            <Section title={t("governingLaw.title")}>
              <p className="text-mls-muted leading-relaxed">{t("governingLaw.body")}</p>
            </Section>

            <Section title={t("contact.title")}>
              <p className="text-mls-muted leading-relaxed">
                {t("contact.body")}{" "}
                <a
                  href="mailto:support@myhabitstats.com"
                  className="text-mls-green hover:underline"
                >
                  support@myhabitstats.com
                </a>
              </p>
            </Section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-mls-text border-b border-mls-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-mls-green flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
