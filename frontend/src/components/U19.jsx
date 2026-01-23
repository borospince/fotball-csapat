import "./u19.css";
import { useT } from "../i18n/LanguageContext.jsx";

const U19 = ({ u19 }) => {
  const t = useT();
  return (
    <div className="u19-card">
      <div className="u19-kep-kontener">
        <img src={u19.kep} alt={u19.nev} />
      </div>

      <div className="u19-adatok">
        <p className="u19-nev">{u19.nev}</p>
        <p className="u19-nemzetiseg">{u19.nemzetiseg}</p>
        <p className="u19-szuletes">
          {t("playerBorn")}: {u19.szuletes}
        </p>
        <p className="u19-poszt">
          {t("playerPosition")}: {u19.poszt}
        </p>
      </div>

      <div className="u19-stats">
        <p>
          {t("playerPrice")}: {u19.ar}
        </p>
        <p>
          {t("playerGoals")}: {u19.gol}
        </p>
        <p>
          {t("playerAssists")}: {u19.golpassz}
        </p>
      </div>
    </div>
  );
};

export default U19;
