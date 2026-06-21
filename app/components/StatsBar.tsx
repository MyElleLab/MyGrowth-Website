import { useTranslations } from "next-intl";

const stats = [
  { value: "9", key: "suggestedHabits" },
  { value: "∞", key: "colors" },
  { value: "25+", key: "languages" },
  { value: "100%", key: "private" },
] as const;

export default function StatsBar() {
  const t = useTranslations("Stats");
  return (
    <section className="px-6 py-16 border-y border-mls-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.key} className="space-y-1">
              <div
                className="text-5xl font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #39d353 0%, #26a641 100%)",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-mls-muted uppercase tracking-widest">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
