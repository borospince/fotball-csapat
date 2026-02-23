import "./Sponsors.css";
import { useT } from "../i18n/LanguageContext.jsx";

const sponsors = [
  { name: "Kitin Bank", tierKey: "sponsorTierMain" },
  { name: "BogárTech", tierKey: "sponsorTierMain" },
  { name: "Zöld Energia", tierKey: "sponsorTierGold" },
  { name: "Kitin Logistics", tierKey: "sponsorTierGold" },
  { name: "FutárExpress", tierKey: "sponsorTierSilver" },
  { name: "Arena Hotel", tierKey: "sponsorTierSilver" },
  { name: "PályaCraft", tierKey: "sponsorTierBronze" },
  { name: "Szurkoló TV", tierKey: "sponsorTierBronze" },
];

const Sponsors = () => {
  const t = useT();

  return (
    <div className="sponsors-page">
      <header className="sponsors-hero">
        <h1>{t("sponsorsTitle")}</h1>
        <p>{t("sponsorsSubtitle")}</p>
      </header>

      <section className="sponsors-grid">
        {sponsors.map((sponsor, idx) => (
          <article className="sponsor-card" key={`${sponsor.name}-${idx}`}>
            <div className="sponsor-badge">{t(sponsor.tierKey)}</div>
            <h2>{sponsor.name}</h2>
          </article>
        ))}
      </section>

      <section className="sponsors-cta">
        <h2>{t("sponsorsJoinTitle")}</h2>
        <p>{t("sponsorsJoinText")}</p>
        <button type="button">{t("sponsorsJoinButton")}</button>
      </section>
    </div>
  );
};

export default Sponsors;
