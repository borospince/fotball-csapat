import { Link, Outlet } from "react-router-dom";
import "../pages/players.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Players = () => {
  const t = useT();
  return (
    <div className="players-kontener">
      <div className="sidebar-kontener">
        <Link to="/players/ff1s">{t("playersAdults")}</Link>
        <Link to="/players/u19s">{t("playersU19")}</Link>
      </div>
      <div className="players-main-kontener">
        <Outlet />
      </div>
    </div>
  );
};

export default Players;
