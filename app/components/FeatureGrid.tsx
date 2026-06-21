import { useTranslations } from "next-intl";

const features = [
  { id: "heatmap", icon: <HeatmapIcon /> },
  { id: "streaks", icon: <StreakIcon /> },
  { id: "reminders", icon: <BellIcon /> },
  { id: "pace", icon: <PaceIcon /> },
  { id: "charts", icon: <TrendingUpIcon /> },
  { id: "private", icon: <LockIcon /> },
  { id: "languages", icon: <GlobeIcon /> },
  { id: "customizable", icon: <PaletteIcon /> },
] as const;

export default function FeatureGrid() {
  const t = useTranslations("Features");
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-mls-text">
            {t("title")}
          </h2>
          <p className="text-mls-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={t(`${feature.id}.title`)}
              description={t(`${feature.id}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-6 rounded-xl bg-mls-surface border border-mls-border hover:border-mls-green-dim transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(57,211,83,0.08)]">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-mls-text mb-2">{title}</h3>
      <p className="text-sm text-mls-muted leading-relaxed">{description}</p>
    </div>
  );
}

function HeatmapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 10 + 1}
            y={row * 10 + 1}
            width="7"
            height="7"
            rx="1.5"
            stroke="#39d353"
            strokeWidth="1.5"
            fill="none"
          />
        ))
      )}
    </svg>
  );
}

function StreakIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#39d353" strokeWidth="1.5" />
      <path d="M14 8v6l4 2.5" stroke="#39d353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 12a7 7 0 0114 0v4l2 3H5l2-3v-4z" stroke="#39d353" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 22a2 2 0 004 0" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PaceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="15" r="9" stroke="#39d353" strokeWidth="1.5" />
      <path d="M11 3h6" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 15l4-4" stroke="#39d353" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="15" r="1.5" fill="#39d353" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3C7.9 3 3 7.9 3 14s4.9 11 11 11c1.7 0 2.5-1.3 2.5-2.5 0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5 0-1.2.8-2 2-2H20c2.8 0 5-2.2 5-5C25 7 20.1 3 14 3z" stroke="#39d353" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="12" r="1.5" fill="#39d353" />
      <circle cx="12" cy="8" r="1.5" fill="#39d353" />
      <circle cx="17" cy="8" r="1.5" fill="#39d353" />
      <circle cx="20" cy="13" r="1.5" fill="#39d353" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polyline
        points="4,22 10,14 16,18 24,8"
        stroke="#39d353"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="14" r="2" fill="#39d353" />
      <circle cx="16" cy="18" r="2" fill="#39d353" />
      <circle cx="24" cy="8" r="2" fill="#39d353" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="6" y="13" width="16" height="12" rx="2" stroke="#39d353" strokeWidth="1.5" />
      <path
        d="M9 13V9a5 5 0 0110 0v4"
        stroke="#39d353"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="19" r="1.5" fill="#39d353" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke="#39d353" strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="5" ry="11" stroke="#39d353" strokeWidth="1.5" />
      <path d="M3 10h22M3 18h22" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

