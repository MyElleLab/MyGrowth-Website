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
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: localeAlternates("/privacy"),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("Privacy");
  const tc = useTranslations("Common");
  const bold = { b: (chunks: ReactNode) => <strong className="text-mls-text">{chunks}</strong> };

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

          <article className="prose-mls space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-mls-text">{t("title")}</h1>
              <p className="text-sm text-mls-muted">{t("lastUpdated")}</p>
            </header>

            <p className="text-mls-muted leading-relaxed">{t("intro")}</p>

            <Section title={t("short.title")}>
              <div className="p-4 rounded-xl border border-mls-green-dim bg-mls-green-1/20">
                <p className="font-semibold text-mls-green">{t("short.body")}</p>
              </div>
            </Section>

            <Section title={t("stored.title")}>
              <p className="text-mls-muted leading-relaxed">{t("stored.intro")}</p>
              <ul className="mt-3 space-y-2 text-mls-muted">
                {t.raw("stored.items").map((item: string, i: number) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </ul>
              <p className="mt-3 text-mls-muted leading-relaxed">{t("stored.footer")}</p>
            </Section>

            <Section title={t("notCollect.title")}>
              <ul className="space-y-2 text-mls-muted">
                {t.raw("notCollect.items").map((item: string, i: number) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </ul>
            </Section>

            <Section title={t("thirdParty.title")}>
              <p className="text-mls-muted leading-relaxed">{t("thirdParty.body")}</p>
            </Section>

            <Section title={t("rights.title")}>
              <p className="text-mls-muted leading-relaxed mb-4">{t("rights.intro")}</p>
              <ul className="space-y-3 text-mls-muted">
                <ListItem>{t.rich("rights.access", bold)}</ListItem>
                <ListItem>{t.rich("rights.export", bold)}</ListItem>
                <ListItem>{t.rich("rights.delete", bold)}</ListItem>
                <ListItem>{t.rich("rights.rectify", bold)}</ListItem>
              </ul>
              <p className="mt-4 text-mls-muted leading-relaxed">{t("rights.footer")}</p>
            </Section>

            <Section title={t("retention.title")}>
              <p className="text-mls-muted leading-relaxed">{t("retention.body")}</p>
            </Section>

            <Section title={t("children.title")}>
              <p className="text-mls-muted leading-relaxed">{t("children.body")}</p>
            </Section>

            <Section title={t("changes.title")}>
              <p className="text-mls-muted leading-relaxed">{t("changes.body")}</p>
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
