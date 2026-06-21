import { useTranslations } from "next-intl";
import HeatmapAnimation from "./HeatmapAnimation";

export default function HeroSection() {
  const t = useTranslations("Hero");
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background texture — faint heatmap grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 18px,
            #39d353 18px,
            #39d353 19px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 18px,
            #39d353 18px,
            #39d353 19px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(57,211,83,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-mls-text leading-[1.1]">
          <span className="block">{t("headlineLine1")}</span>
          <span
            className="block text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #39d353 0%, #26a641 60%, #006d32 100%)",
            }}
          >
            {t("headlineLine2")}
          </span>
        </h1>

        {/* Subheadline */}
        <div className="flex flex-col items-center gap-2 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          <p className="text-mls-text font-bold whitespace-pre-line">{t("sub1")}</p>
          <p className="text-mls-muted">{t("sub2")}</p>
          <p className="text-[#39d353]">{t("sub3")}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/app/id6761617617"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mls-text text-mls-bg font-semibold text-sm hover:bg-mls-green transition-colors"
            aria-label={t("ctaDownloadAria")}
          >
            <AppleIcon />
            {t("ctaDownload")}
          </a>
          <a
            href="#features"
            className="text-sm text-mls-muted hover:text-mls-text transition-colors"
          >
            {t("seeFeatures")} ↓
          </a>
        </div>

        {/* CTA supporting line */}
        <p className="text-sm text-mls-muted">{t("ctaSupport")}</p>

        {/* Heatmap visual */}
        <div className="mt-12 w-full max-w-3xl mx-auto overflow-hidden">
          <HeatmapAnimation />
          <p className="mt-3 text-xs text-mls-muted">
            {t("heatmapCaption")}
          </p>
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
