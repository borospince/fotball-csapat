export const getLocale = (lang) => (lang === "hu" ? "hu-HU" : "en-GB");

export const formatDateTime = (value, lang) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(getLocale(lang));
};

export const formatDate = (value, lang) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(getLocale(lang));
};
