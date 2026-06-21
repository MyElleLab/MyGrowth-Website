"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguagePicker from "./LanguagePicker";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/tutorial", label: t("tutorial") },
    { href: "/privacy", label: t("privacy") },
    { href: "/support", label: t("support") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-mls-border bg-mls-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/MyGrowth_AppIcon_1024.png"
            alt="MyGrowth icon"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-semibold text-mls-text group-hover:text-mls-green transition-colors">
            MyGrowth
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-mls-green"
                  : "text-mls-muted hover:text-mls-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguagePicker />
        </div>

        {/* Mobile: language picker + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguagePicker />
          <button
            className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] w-full bg-mls-text rounded transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-mls-text rounded transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-mls-text rounded transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-mls-border bg-mls-bg/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`transition-colors ${
                  pathname === link.href
                    ? "text-mls-green"
                    : "text-mls-muted hover:text-mls-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
