'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import es from '@/locales/es.json';
import en from '@/locales/en.json';

export enum Language {
  ES = 'es',
  EN = 'en',
}

const locales: Record<Language, any> = {
  [Language.ES]: es,
  [Language.EN]: en,
};

export interface LanguageProviderProps {
  children: ReactNode;
}

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

export const LANGUAGE_LOCAL_STORAGE_KEY = 'language_preference';

const getLanguageFromLocalStorage = (): Language => {
  if (typeof window === 'undefined') {
    return Language.ES;
  }

  const storedLang = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
  if (storedLang && Object.values(Language).includes(storedLang as Language)) {
    return storedLang as Language;
  }

  const browserLang = navigator.language.split('-')[0];
  if (Object.values(Language).includes(browserLang as Language)) {
    return browserLang as Language;
  }

  return Language.ES;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(Language.ES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLanguageState(getLanguageFromLocalStorage());
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = useCallback(
    (key: string) => {
      const keys = key.split('.');
      let value = locales[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
