import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./success.css";

const Success = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(8);

  // Kosár törlése egyszer, amikor betölt az oldal
  useEffect(() => {
    localStorage.removeItem("kosar");
  }, []);

  // Visszaszámláló + automata átirányítás
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
        <div className="success-icon" aria-hidden="true">✅</div>

        <h1 className="success-title">Sikeres vásárlás!</h1>

        <p className="success-text">
          Köszönjük a rendelésed. A kosarad kiürítettük, és hamarosan kapsz visszaigazolást.
        </p>

        <div className="success-actions">
          <Link to="/" className="success-btn primary">
            Vissza a főoldalra
          </Link>

          <Link to="/shop" className="success-btn secondary">
            Vásárlás folytatása
          </Link>
        </div>

        <p className="success-small">
          Automatikus átirányítás: <b>{seconds}</b> mp
        </p>
      </div>
    </div>
  );
};

export default Success;
