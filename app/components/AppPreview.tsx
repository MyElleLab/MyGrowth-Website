import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AppPreview() {
  const t = useTranslations("AppPreview");
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-mls-text">
            {t("title")}
          </h2>
          <p className="text-mls-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Composite promo image — three phones side by side */}
        <div className="w-full flex justify-center">
          <Image
            src="/MyHabitStats-Promo.webp"
            alt={t("promoAlt")}
            width={1487}
            height={1058}
            priority
            className="w-full h-auto max-w-5xl"
          />
        </div>
      </div>
    </section>
  );
}
