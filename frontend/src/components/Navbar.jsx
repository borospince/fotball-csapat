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
      <div className="nav-group">
        <span className="nav-trigger">{t("navMatches")}</span>
        <div className="nav-menu">
          <Link to="/tickets">{t("navTickets")}</Link>
          <Link to="/schedule">{t("navSchedule")}</Link>
          <Link to="/standings">{t("navStandings")}</Link>
        </div>
      </div>
      <div className="nav-group">
        <span className="nav-trigger">{t("navTeam")}</span>
        <div className="nav-menu">
          <Link to="/players/ff1s">{t("navPlayers")}</Link>
          <Link to="/staff">{t("navStaff")}</Link>
        </div>
      </div>
      <div className="nav-group">
        <span className="nav-trigger">{t("navClub")}</span>
        <div className="nav-menu">
          <Link to="/news">{t("navNews")}</Link>
          <Link to="/history">{t("navHistory")}</Link>
          <Link to="/fans">{t("navFans")}</Link>
          <Link to="/stadium">{t("navStadium")}</Link>
          <Link to="/gallery">{t("navGallery")}</Link>
          <Link to="/sponsors">{t("navSponsors")}</Link>
        </div>
      </div>
      <div className="nav-group">
        <span className="nav-trigger">{t("navShopMenu")}</span>
        <div className="nav-menu">
          <Link to="/shops">{t("navShop")}</Link>
          <Link to="/cart">{t("navCart")}</Link>
        </div>
      </div>
      {isLoggedIn === 0 ? (
        <Link to="/login">
          <CgProfile size={30} />
        </Link>
      ) : (
        <button className="logout-btn" onClick={kilep}>
          {t("navLogout")}
        </button>
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
