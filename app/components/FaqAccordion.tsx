"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Question keys in display order. q3 additionally links to the Privacy Policy.
const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export default function FaqAccordion() {
  const t = useTranslations("Faq");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqKeys.map((key, i) => {
        const hasLink = key === "q3";
        return (
          <div
            key={key}
            className="rounded-xl border border-mls-border bg-mls-surface overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left group"
              aria-expanded={open === i}
            >
              <span className="font-medium text-mls-text group-hover:text-mls-green transition-colors">
                {t(`${key}.question`)}
              </span>
              <span
                className="text-mls-muted ml-4 flex-shrink-0 transition-transform duration-200"
                style={{
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-6 pb-5 text-sm text-mls-muted leading-relaxed border-t border-mls-border pt-4">
                <p>{t(`${key}.answer`)}</p>
                {hasLink && (
                  <Link
                    href="/privacy"
                    className="mt-2 inline-block text-mls-green hover:underline"
                  >
                    {t("q3.linkText")} →
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
