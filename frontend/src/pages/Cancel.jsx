import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cancel.css";

const Cancel = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);
  const [url, setUrl] = useState('');

  // Opcionális: visszaszámláló + automatikus visszairányítás a kosárhoz
  useEffect(() => {
    const storedUrl = localStorage.getItem("url");
    if (storedUrl) {
      setUrl(storedUrl);
    };
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/cart"); // állítsd át, ha nálad más a kosár útvonala
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="cancel-wrap">
      <div className="cancel-card">
        <div className="cancel-icon" aria-hidden="true">⚠️</div>

        <h1 className="cancel-title">A fizetés megszakadt</h1>

        <p className="cancel-text">
          Úgy tűnik, a fizetés nem fejeződött be. <b>Nem történt terhelés</b>, a kosarad megmaradt,
          bármikor újra megpróbálhatod.
        </p>

        <div className="cancel-actions">
          <Link to="/cart" className="cancel-btn primary">
            Vissza a kosárhoz
          </Link>

          <Link to={url} className="cancel-btn secondary">
            Újra próbálom
          </Link>

          <Link to="/" className="cancel-btn ghost">
            Főoldal
          </Link>
        </div>

        <p className="cancel-small">
          Automatikus visszairányítás a kosárhoz: <b>{seconds}</b> mp
        </p>
      </div>
    </div>
  );
};

export default Cancel;
