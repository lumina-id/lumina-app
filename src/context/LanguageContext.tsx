"use client";
import { createContext, ReactNode, useCallback, useContext, useState, useEffect } from "react";
import { en, type Translations } from "../locales/en";
import { id } from "../locales/id";

type Locale = "en" | "id";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const translations: Record<Locale, Translations> = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("lumina_locale") as Locale | null;
    if (savedLocale && (savedLocale === "en" || savedLocale === "id")) {
      setLocaleState(savedLocale);
    }
    setIsLoaded(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("lumina_locale", newLocale);
  }, []);

  const t = translations[locale];

  // Don't render until we've loaded the saved preference
  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
