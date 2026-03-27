import hinglish from "./hinglish.json";
import hindi from "./hindi.json";
import marathi from "./marathi.json";

export type Language = "hinglish" | "hindi" | "marathi";

export const DEFAULT_LANGUAGE: Language = "hinglish";

export type TranslationKey = keyof typeof hinglish;

export type Translations = Record<TranslationKey, string>;

const translations: Record<Language, Translations> = {
  hinglish,
  hindi,
  marathi,
};

export const getTranslations = (lang: Language): Translations =>
  translations[lang];

export const t = (lang: Language, key: TranslationKey): string =>
  translations[lang][key] ?? translations["hinglish"][key] ?? key;
