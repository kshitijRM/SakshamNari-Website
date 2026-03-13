import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/lib/i18n";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({ language: 'en', setLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('preferred_language').eq('id', user.id).single()
        .then(({ data }) => {
          if (data?.preferred_language) setLanguageState(data.preferred_language as Language);
        });
    }
  }, [user]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      await supabase.from('profiles').update({ preferred_language: lang }).eq('id', user.id);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
