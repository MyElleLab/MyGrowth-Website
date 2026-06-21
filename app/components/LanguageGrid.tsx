import { useTranslations } from "next-intl";

// Native language names stay in their own language and are not translated.
const languages = [
  "English", "Italiano", "Dansk", "Deutsch", "Français", "Español",
  "Português", "日本語", "한국어", "中文", "Türkçe", "Русский",
  "العربية", "हिन्दी", "Bahasa Indonesia", "ไทย", "Tiếng Việt",
  "Ελληνικά", "Polski", "Українська", "Română", "Bahasa Melayu", "Shqip",
];

export default function LanguageGrid() {
  const t = useTranslations("Languages");
  return (
    <section className="px-6 py-16 border-t border-mls-border">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <p className="text-sm text-mls-muted uppercase tracking-widest">
          {t("heading")}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 px-4 max-w-full text-mls-muted text-sm sm:text-base">
          {languages.map((lang) => (
            <span key={lang} className="whitespace-nowrap">{lang}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
