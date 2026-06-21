import { useTranslations } from "next-intl";

const steps = [
  { number: "01", icon: "👆", key: "step1" },
  { number: "02", icon: "🗂️", key: "step2" },
  { number: "03", icon: "📈", key: "step3" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");
  return (
    <section className="px-6 py-24 bg-mls-surface/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-mls-text">
            {t("title")}
          </h2>
          <p className="text-mls-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, #30363d 20%, #39d353 50%, #30363d 80%, transparent)",
            }}
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.key} className="relative flex flex-col items-center text-center gap-4">
              {/* Step number badge */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-mls-surface border border-mls-border flex flex-col items-center justify-center">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-[10px] font-mono text-mls-green-dim mt-0.5">
                  {step.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-mls-text">{t(`${step.key}.title`)}</h3>
                <p className="text-sm text-mls-muted leading-relaxed max-w-xs mx-auto">
                  {t(`${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
