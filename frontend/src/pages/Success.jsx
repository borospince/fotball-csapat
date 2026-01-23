import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./success.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Success = () => {
  const t = useT();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    localStorage.removeItem("kosar");
  }, []);

  useEffect(() => {
    const draft = localStorage.getItem("ticketDraft");
    if (!draft) return;

    const createTicket = async () => {
      try {
        const payload = JSON.parse(draft);
        const res = await fetch("http://localhost:3500/api/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error(err.message || "Ticket save error");
        }
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem("ticketDraft");
      }
    };

    createTicket();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="success-wrap">
      <div className="success-card">
        <div className="success-icon" aria-hidden="true">
          âś…
        </div>

        <h1 className="success-title">{t("successTitle")}</h1>

        <p className="success-text">{t("successText")}</p>

        <div className="success-actions">
          <Link to="/" className="success-btn primary">
            {t("successHome")}
          </Link>

          <Link to="/shop" className="success-btn secondary">
            {t("successContinue")}
          </Link>
        </div>

        <p className="success-small">
          {t("successRedirect")}: <b>{seconds}</b> {t("secondsShort")}
        </p>
      </div>
    </div>
  );
};

export default Success;
