import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cancel.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Cancel = () => {
  const t = useT();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storedUrl = localStorage.getItem("url");
    if (storedUrl) {
      setUrl(storedUrl);
    }
    localStorage.removeItem("ticketDraft");
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/cart");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="cancel-wrap">
      <div className="cancel-card">
        <div className="cancel-icon" aria-hidden="true">
          ⚠️
        </div>

        <h1 className="cancel-title">{t("cancelTitle")}</h1>

        <p className="cancel-text">{t("cancelText")}</p>

        <div className="cancel-actions">
          <Link to="/cart" className="cancel-btn primary">
            {t("cancelToCart")}
          </Link>

          <Link to={url} className="cancel-btn secondary">
            {t("cancelRetry")}
          </Link>

          <Link to="/" className="cancel-btn ghost">
            {t("cancelHome")}
          </Link>
        </div>

        <p className="cancel-small">
          {t("cancelRedirect")}: <b>{seconds}</b> {t("secondsShort")}
        </p>
      </div>
    </div>
  );
};

export default Cancel;
