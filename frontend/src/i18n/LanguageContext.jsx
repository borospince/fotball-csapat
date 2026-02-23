import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("hu");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) {
      setLang(stored);
    }
  }, []);

  const changeLang = (next) => {
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const value = useMemo(() => ({ lang, setLang: changeLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
};

export const useT = () => {
  const { lang } = useLanguage();
  return (key) =>
    translations[lang]?.[key] ?? translations.hu?.[key] ?? key;
};
