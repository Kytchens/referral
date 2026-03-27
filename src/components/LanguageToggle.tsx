"use client";

import { useLanguage } from "@/lib/context/LanguageContext";
import type { Language } from "@/lib/i18n";

const languages: { key: Language; label: string }[] = [
  { key: "hinglish", label: "Hindi" },
  { key: "hindi", label: "हिंदी" },
  { key: "marathi", label: "मराठी" },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-0.5 rounded-full bg-bg p-1 border border-border/60">
      {languages.map((lang) => (
        <button
          key={lang.key}
          onClick={() => setLanguage(lang.key)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            language === lang.key
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-text hover:bg-surface"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
