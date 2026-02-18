import { Link, Outlet } from "react-router-dom";
import "../pages/Clothes.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Clothes = () => {
  const t = useT();
  return (
    <div className="items-kontener">
      <div className="items-main-kontener">
        <h2>{t("clothesTitle")}</h2>
        <nav>
          <ul>
            <li>
              <Link to="ferfi">{t("clothesMen")}</Link>
            </li>
            <li>
              <Link to="noi">{t("clothesWomen")}</Link>
            </li>
            <li>
              <Link to="gyerek">{t("clothesKids")}</Link>
            </li>
            <li>
              <Link to="kiegészito">{t("clothesAccessories")}</Link>
            </li>
            <li>
              <Link to="minden">{t("clothesAll")}</Link>
            </li>
          </ul>
        </nav>
        <div className="items-menu-kontener">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Clothes;
