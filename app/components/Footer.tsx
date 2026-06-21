import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const tc = useTranslations("Common");
  return (
    <footer className="border-t border-mls-border px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/app-icon.png"
              alt={tc("iconAlt")}
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-semibold text-mls-text">MyGrowth</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mls-muted">
            <Link href="/privacy" className="hover:text-mls-text transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-mls-text transition-colors">
              {t("terms")}
            </Link>
            <Link href="/tutorial" className="hover:text-mls-text transition-colors">
              {t("tutorial")}
            </Link>
            <Link href="/support" className="hover:text-mls-text transition-colors">
              {t("support")}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-mls-muted">
            <span>{t("copyright", { year: new Date().getFullYear() })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
