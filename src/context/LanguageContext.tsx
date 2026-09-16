import React, { createContext, useContext, useState } from 'react';
import { SupportedLanguageCode, LanguageItem } from '@/types';
import { SUPPORTED_LANGUAGES, resolveTranslation } from '@/i18n';

interface LanguageContextType {
  language: SupportedLanguageCode;
  setLanguage: (lang: SupportedLanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguageMeta: LanguageItem;
  supportedLanguages: LanguageItem[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguageCode>(() => {
    try {
      const stored = localStorage.getItem('farmlink_language');
      if (stored) {
        // Handle both codes ('ta', 'hi') and full names ('Tamil', 'Hindi')
        const found = SUPPORTED_LANGUAGES.find(
          (l) => l.code === stored || l.name.toLowerCase() === stored.toLowerCase()
        );
        if (found) return found.code;
      }
    } catch {
      // Ignore localStorage errors in restricted environments
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('farmlink_language', lang);
      const found = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
      if (found) {
        localStorage.setItem('farmlink_language_name', found.name);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const t = (key: string, fallback?: string): string => {
    return resolveTranslation(language, key, fallback);
  };

  const currentLanguageMeta = 
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageMeta,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
