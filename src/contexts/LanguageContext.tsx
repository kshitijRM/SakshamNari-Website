import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/lib/i18n";
import { useAuth } from "./AuthContext";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({ language: 'en', setLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

const getLanguageKey = (userId?: string) =>
  userId ? `app_language_${userId}` : "app_language_guest";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem(getLanguageKey(user?.id));
    if (saved) {
      setLanguageState(saved as Language);
    }
  }, [user]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(getLanguageKey(user?.id), lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
