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
  const t = await getTranslations({ locale, namespace: "Metadata.tutorial" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/tutorial`,
      languages: localeAlternates("/tutorial"),
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TutorialContent />;
}

// Pre-built habits — concrete example data, intentionally left untranslated.
const DEFAULT_HABITS = [
  ["Sleep", "hours", "8"],
  ["Workout", "minutes", "45"],
  ["Meditation", "minutes", "15"],
  ["Running", "km", "5"],
  ["Calories", "kcal", "2000"],
  ["Water", "liters", "2.5"],
  ["Reading", "pages", "25"],
  ["Biking", "km", "10"],
  ["Intervals", "sprints", "6"],
];

function TutorialContent() {
  const t = useTranslations("Tutorial");
  const tc = useTranslations("Common");
  const bold = { b: (chunks: ReactNode) => <span className="text-mls-text font-semibold">{chunks}</span> };

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

          <header className="mb-12 space-y-3">
            <h1 className="text-4xl font-bold text-mls-text">{t("title")}</h1>
            <p className="text-lg text-mls-muted leading-relaxed">{t("intro")}</p>
          </header>

          {/* Section 1 — Import Daily Logs */}
          <Section title={t("importLogs.title")}>
            <p className="text-mls-muted leading-relaxed mb-6">{t("importLogs.intro")}</p>

            <div className="mb-6">
              <p className="text-xs text-mls-muted uppercase tracking-widest mb-2">
                {t("importLogs.templateLabel")}
              </p>
              <CodeBlock>{`date,habit,unit,value,note
2026-01-15,Sleep,hours,7.5,
2026-01-15,Workout,minutes,45,Leg day
2026-01-16,Running,km,6.2,Morning run
2026-01-16,Water,liters,2.5,`}</CodeBlock>
            </div>

            <div className="space-y-4 mb-6">
              <ColumnDoc col="date" required requiredLabel={t("importLogs.requiredBadge")} desc={t("importLogs.colDateDesc")} />
              <ColumnDoc col="habit" required requiredLabel={t("importLogs.requiredBadge")} desc={t("importLogs.colHabitDesc")} />
              <ColumnDoc col="unit" requiredLabel={t("importLogs.requiredBadge")} desc={t("importLogs.colUnitDesc")} />
              <ColumnDoc col="value" required requiredLabel={t("importLogs.requiredBadge")} desc={t("importLogs.colValueDesc")} />
              <ColumnDoc col="note" requiredLabel={t("importLogs.requiredBadge")} desc={t("importLogs.colNoteDesc")} />
            </div>

            <a
              href="/mhs-import-template.csv"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-mls-green-dim bg-mls-green-1/20 text-mls-green text-sm font-medium hover:bg-mls-green-1/40 transition-colors mb-8"
            >
              <DownloadIcon />
              {t("importLogs.downloadCsv")}
            </a>

            <div className="space-y-3">
              {t.raw("importLogs.tips").map((tip: string, i: number) => (
                <Tip key={i}>{tip}</Tip>
              ))}
            </div>
          </Section>

          {/* Section 2 — Backup & Restore */}
          <Section title={t("backup.title")}>
            <p className="text-mls-muted leading-relaxed mb-6">{t("backup.intro")}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm font-semibold text-mls-text mb-3">{t("backup.exportTitle")}</p>
                <ol className="space-y-3">
                  {t.raw("backup.exportSteps").map((step: string, i: number) => (
                    <NumberedStep key={i} n={i + 1}>{step}</NumberedStep>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-sm font-semibold text-mls-text mb-3">{t("backup.restoreTitle")}</p>
                <ol className="space-y-3">
                  {t.raw("backup.restoreSteps").map((step: string, i: number) => (
                    <NumberedStep key={i} n={i + 1}>{step}</NumberedStep>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-mls-muted uppercase tracking-widest mb-2">
                {t("backup.formatLabel")}
              </p>
              <CodeBlock>{`#HABITS
name,unit,icon,color,targetValue,scheduledDays,createdAt
Sleep,hours,🛏️,#39d353,8.0,,2026-04-04
Workout,minutes,💪,#f97316,45.0,"1,3,5",2026-04-04

#LOGS
date,habit,unit,value,note
2025-08-26,Sleep,hours,8.33,
2025-09-15,Workout,minutes,45,Leg day`}</CodeBlock>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-mls-surface border border-mls-border">
              <span className="text-mls-green mt-0.5 flex-shrink-0">→</span>
              <p className="text-sm text-mls-muted leading-relaxed">
                {t.rich("backup.autoDetect", {
                  code: (chunks) => <code className="inline-code">{chunks}</code>,
                })}
              </p>
            </div>
          </Section>

          {/* Section 3 — Default Habits */}
          <Section title={t("prebuilt.title")}>
            <p className="text-mls-muted leading-relaxed mb-6">{t("prebuilt.intro")}</p>

            <div className="rounded-xl border border-mls-border overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-mls-border bg-mls-surface">
                    <th className="text-left px-4 py-3 text-mls-muted font-medium">{t("prebuilt.colHabit")}</th>
                    <th className="text-left px-4 py-3 text-mls-muted font-medium">{t("prebuilt.colUnit")}</th>
                    <th className="text-left px-4 py-3 text-mls-muted font-medium">{t("prebuilt.colTarget")}</th>
                  </tr>
                </thead>
                <tbody>
                  {DEFAULT_HABITS.map(([habit, unit, target], i) => (
                    <tr
                      key={habit}
                      className={`border-b border-mls-border last:border-0 ${
                        i % 2 === 0 ? "" : "bg-mls-surface/50"
                      }`}
                    >
                      <td className="px-4 py-3 text-mls-text font-medium">{habit}</td>
                      <td className="px-4 py-3 text-mls-muted">{unit}</td>
                      <td className="px-4 py-3 text-mls-muted">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Tip>{t("prebuilt.note")}</Tip>
          </Section>

          {/* Section 4 — Notifications */}
          <Section title={t("reminders.title")}>
            <p className="text-mls-muted leading-relaxed mb-6">{t("reminders.intro")}</p>
            <div className="space-y-3 mb-6">
              <Tip>{t.rich("reminders.morning", bold)}</Tip>
              <Tip>{t.rich("reminders.evening", bold)}</Tip>
            </div>
            <p className="text-sm text-mls-muted leading-relaxed">{t("reminders.footer")}</p>
          </Section>

          {/* Section 5 — Dual-Input Habits */}
          <Section title={t("pace.title")}>
            <p className="text-mls-muted leading-relaxed mb-6">{t("pace.intro")}</p>
            <div className="space-y-3 mb-6">
              <Tip>{t.rich("pace.running", bold)}</Tip>
              <Tip>{t.rich("pace.biking", bold)}</Tip>
            </div>
            <p className="text-sm text-mls-muted leading-relaxed">{t("pace.footer")}</p>
          </Section>

          {/* Section 6 — Smart Streaks */}
          <Section title={t("streaks.title")}>
            <div className="space-y-3">
              {t.raw("streaks.tips").map((tip: string, i: number) => (
                <Tip key={i}>{tip}</Tip>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl border border-mls-green-dim bg-mls-green-1/10 text-center space-y-3">
            <p className="text-mls-text font-medium">{t("cta.title")}</p>
            <a
              href="/mhs-import-template.csv"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mls-green text-mls-bg font-semibold text-sm hover:bg-mls-green-3 transition-colors"
            >
              <DownloadIcon />
              {t("cta.download")}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-mls-text mb-6 pb-3 border-b border-mls-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-mls-surface border border-mls-border">
      <span className="text-mls-green mt-0.5 flex-shrink-0">→</span>
      <p className="text-sm text-mls-muted leading-relaxed">{children}</p>
    </div>
  );
}

function NumberedStep({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mls-green-1 border border-mls-green-dim text-mls-green text-xs font-bold flex items-center justify-center">
        {n}
      </span>
      <span className="text-sm text-mls-muted leading-relaxed pt-0.5">{children}</span>
    </li>
  );
}

function ColumnDoc({
  col,
  required,
  requiredLabel,
  desc,
}: {
  col: string;
  required?: boolean;
  requiredLabel: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-lg bg-mls-surface border border-mls-border">
      <div className="flex items-center gap-2 flex-shrink-0">
        <code className="text-mls-green font-mono text-sm">{col}</code>
        {required && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-mls-green-dim border border-mls-green-dim rounded px-1 py-0.5">
            {requiredLabel}
          </span>
        )}
      </div>
      <p className="text-sm text-mls-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="p-4 rounded-lg bg-mls-surface border border-mls-border overflow-x-auto text-sm font-mono text-mls-green leading-relaxed">
      {children}
    </pre>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
