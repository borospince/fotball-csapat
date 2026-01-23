import { Link } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { MdStadium } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setIsLoggedIn(1);
    }

    if (user && user.statusz === "true") {
      setIsAdmin(1);
    }
  }, []);

  const kilep = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="navbar-kontener">
      <Link to="/">
        <MdStadium size={30} />
      </Link>
      <Link to="/tickets">{t("navTickets")}</Link>
      <Link to="/players/ff1s">{t("navPlayers")}</Link>
      <Link to="/news">{t("navNews")}</Link>
      <Link to="/shops">{t("navShop")}</Link>
      <Link to="/history">{t("navHistory")}</Link>
      <Link to="/fans">{t("navFans")}</Link>
      <Link to="/Cart">{t("navCart")}</Link>
      {isLoggedIn === 0 ? (
        <Link to="/login">
          <CgProfile size={30} />
        </Link>
      ) : (
        <button onClick={kilep}>{t("navLogout")}</button>
      )}
      <div className="lang-toggle">
        <button
          className={lang === "hu" ? "active" : ""}
          onClick={() => setLang("hu")}
        >
          HU
        </button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default Navbar;
