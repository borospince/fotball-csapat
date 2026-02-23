import "./StadiumInfo.css";
import { useT } from "../i18n/LanguageContext.jsx";

const StadiumInfo = () => {
  const t = useT();

  return (
    <div className="stadium-page">
      <header className="stadium-hero">
        <div>
          <h1>{t("stadiumTitle")}</h1>
          <p className="stadium-subtitle">{t("stadiumSubtitle")}</p>
        </div>
        <div className="stadium-capacity">
          <span>{t("stadiumCapacity")}</span>
          <strong>38 000</strong>
        </div>
      </header>

      <section className="stadium-section">
        <h2>{t("stadiumAboutTitle")}</h2>
        <p>{t("stadiumAboutText")}</p>
      </section>

      <section className="stadium-section stadium-grid">
        <div className="stadium-card">
          <h3>{t("stadiumAccessTitle")}</h3>
          <ul>
            <li>{t("stadiumAccess1")}</li>
            <li>{t("stadiumAccess2")}</li>
            <li>{t("stadiumAccess3")}</li>
          </ul>
        </div>
        <div className="stadium-card">
          <h3>{t("stadiumServicesTitle")}</h3>
          <ul>
            <li>{t("stadiumService1")}</li>
            <li>{t("stadiumService2")}</li>
            <li>{t("stadiumService3")}</li>
          </ul>
        </div>
        <div className="stadium-card">
          <h3>{t("stadiumRulesTitle")}</h3>
          <ul>
            <li>{t("stadiumRule1")}</li>
            <li>{t("stadiumRule2")}</li>
            <li>{t("stadiumRule3")}</li>
          </ul>
        </div>
      </section>

      <section className="stadium-section">
        <h2>{t("stadiumSeatingTitle")}</h2>
        <p>{t("stadiumSeatingText")}</p>
        <div className="stadium-seating-note">
          {t("stadiumSeatingNote")}
        </div>
      </section>
    </div>
  );
};

export default StadiumInfo;
