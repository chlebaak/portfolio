import { createContext, useState, useContext } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "cs";
  });

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "cs" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key) => {
    const keys = key.split(".");
    let translation = translations[language];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
