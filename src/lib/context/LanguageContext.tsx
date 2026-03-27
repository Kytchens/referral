"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  type Language,
  type TranslationKey,
  DEFAULT_LANGUAGE,
  t as translate,
} from "@/lib/i18n";

const LANG_STORAGE_KEY = "kytchens_language";

const LANG_TO_HTML: Record<Language, string> = {
  hinglish: "hi",
  hindi: "hi",
  marathi: "mr",
};

function loadLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "hinglish" || stored === "hindi" || stored === "marathi") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_LANGUAGE;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setLanguageState(loadLanguage());
  }, []);

  // Persist language and update <html lang>
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = LANG_TO_HTML[lang];
  }, []);

  // Set initial html lang on mount
  useEffect(() => {
    document.documentElement.lang = LANG_TO_HTML[language];
  }, [language]);

  const t = useCallback(
    (key: TranslationKey) => translate(language, key),
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
