import "./Gallery.css";
import { useT } from "../i18n/LanguageContext.jsx";

const galleryItems = [
  { titleKey: "galleryItemMatchday", categoryKey: "galleryCategoryMatchday" },
  { titleKey: "galleryItemTraining", categoryKey: "galleryCategoryTraining" },
  { titleKey: "galleryItemFans", categoryKey: "galleryCategoryFans" },
  { titleKey: "galleryItemAcademy", categoryKey: "galleryCategoryAcademy" },
  { titleKey: "galleryItemAway", categoryKey: "galleryCategoryAway" },
  { titleKey: "galleryItemTrophy", categoryKey: "galleryCategoryTrophy" },
];

const Gallery = () => {
  const t = useT();

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <h1>{t("galleryTitle")}</h1>
        <p>{t("gallerySubtitle")}</p>
      </header>

      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <article className="gallery-card" key={`${item.titleKey}-${idx}`}>
            <div className="gallery-image">
              <div className="gallery-image-badge">
                {t(item.categoryKey)}
              </div>
            </div>
            <div className="gallery-info">
              <h2>{t(item.titleKey)}</h2>
              <span>{t(item.categoryKey)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
