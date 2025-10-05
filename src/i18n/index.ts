import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ua from "./locales/ua.json";
import en from "./locales/en.json";

const savedLang = localStorage.getItem("lang") || "ua";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ua: { translation: ua },
      en: { translation: en },
    },
    lng: savedLang,       // мова за замовчуванням
    fallbackLng: "ua",    // запасна
    interpolation: {
      escapeValue: false, // React сам ескейпить HTML
    },
  });

export default i18n;
