import "./ff1.css";
import { useT } from "../i18n/LanguageContext.jsx";

const FF1 = ({ ff1 }) => {
  const t = useT();
  return (
    <div className="ff1-card">
      <div className="ff1-kep-kontener">
        <img src={ff1.kep} alt={ff1.nev} />
      </div>
      <div className="ff1-adatok">
        <h2 className="ff1-nev">{ff1.nev}</h2>
        <p className="ff1-nemzetiseg">{ff1.nemzetiseg}</p>
        <p className="ff1-szuletes">
          {t("playerBorn")}: {ff1.szuletes}
        </p>
        <p className="ff1-poszt">
          {t("playerPosition")}: {ff1.poszt}
        </p>
        <div className="ff1-stats">
          <p>
            {t("playerPrice")}: {ff1.ar}
          </p>
          <p>
            {t("playerGoals")}: {ff1.gol}
          </p>
          <p>
            {t("playerAssists")}: {ff1.golpassz}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FF1;
