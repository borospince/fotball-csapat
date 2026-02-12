import { Link } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { MdStadium } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);
  const [openMenu, setOpenMenu] = useState("");
  const navRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setOpenMenu("");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const kilep = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? "" : menuName));
  };

  const closeMenu = () => {
    setOpenMenu("");
  };

  return (
    <div className="navbar-kontener" ref={navRef}>
      <Link to="/" onClick={closeMenu}>
        <MdStadium size={30} />
      </Link>
      <div className={`nav-group ${openMenu === "matches" ? "open" : ""}`}>
        <button
          type="button"
          className="nav-trigger"
          onClick={() => toggleMenu("matches")}
        >
          {t("navMatches")}
        </button>
        <div className="nav-menu">
          <Link to="/tickets" onClick={closeMenu}>
            {t("navTickets")}
          </Link>
          <Link to="/schedule" onClick={closeMenu}>
            {t("navSchedule")}
          </Link>
          <Link to="/standings" onClick={closeMenu}>
            {t("navStandings")}
          </Link>
        </div>
      </div>
      <div className={`nav-group ${openMenu === "team" ? "open" : ""}`}>
        <button
          type="button"
          className="nav-trigger"
          onClick={() => toggleMenu("team")}
        >
          {t("navTeam")}
        </button>
        <div className="nav-menu">
          <Link to="/players/ff1s" onClick={closeMenu}>
            {t("navPlayers")}
          </Link>
          <Link to="/staff" onClick={closeMenu}>
            {t("navStaff")}
          </Link>
        </div>
      </div>
      <div className={`nav-group ${openMenu === "club" ? "open" : ""}`}>
        <button
          type="button"
          className="nav-trigger"
          onClick={() => toggleMenu("club")}
        >
          {t("navClub")}
        </button>
        <div className="nav-menu">
          <Link to="/news" onClick={closeMenu}>
            {t("navNews")}
          </Link>
          <Link to="/history" onClick={closeMenu}>
            {t("navHistory")}
          </Link>
          <Link to="/fans" onClick={closeMenu}>
            {t("navFans")}
          </Link>
          <Link to="/stadium" onClick={closeMenu}>
            {t("navStadium")}
          </Link>
          <Link to="/gallery" onClick={closeMenu}>
            {t("navGallery")}
          </Link>
          <Link to="/sponsors" onClick={closeMenu}>
            {t("navSponsors")}
          </Link>
        </div>
      </div>
      <div className={`nav-group ${openMenu === "shop" ? "open" : ""}`}>
        <button
          type="button"
          className="nav-trigger"
          onClick={() => toggleMenu("shop")}
        >
          {t("navShopMenu")}
        </button>
        <div className="nav-menu">
          <Link to="/shops" onClick={closeMenu}>
            {t("navShop")}
          </Link>
          <Link to="/cart" onClick={closeMenu}>
            {t("navCart")}
          </Link>
        </div>
      </div>
      {isLoggedIn === 0 ? (
        <Link to="/login" onClick={closeMenu}>
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
