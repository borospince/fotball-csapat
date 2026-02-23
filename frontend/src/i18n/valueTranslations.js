import { translations } from "./translations";

export const translateLeague = (value, lang) => {
  if (!value) return "";
  if (lang === "en") {
    if (value === "Bajnokok Ligája") return translations.en.leagueUcl;
    if (value === "NB I") return translations.en.leagueNb1;
  }
  return value;
};

export const translateAgeGroup = (value, lang) => {
  if (!value) return "";
  const v = String(value).toLowerCase();
  if (lang === "en") {
    if (v === "felnőtt" || v === "felnott") return translations.en.ageSenior;
    if (v === "u19") return translations.en.ageU19;
  }
  return value;
};
