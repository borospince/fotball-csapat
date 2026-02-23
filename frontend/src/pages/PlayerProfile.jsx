import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PlayerProfile.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const API_BASE = "http://localhost:3500";

const PlayerProfile = () => {
  const t = useT();
  const { lang } = useLanguage();
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const translateAge = (value) => {
    if (lang === "en") {
      const v = String(value || "").toLowerCase();
      if (v === "felnott") return "Senior";
      if (v === "u19") return "U19";
    }
    return value;
  };

  useEffect(() => {
    const loadPlayer = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/players-frontend`);
        const data = await res.json();
        if (res.ok) {
          const found = (data.players || []).find((p) => p._id === id);
          setPlayer(found || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="player-profile-page">
        <p className="player-profile-loading">{t("playerLoading")}</p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="player-profile-page">
        <h1>{t("playerProfileTitle")}</h1>
        <p className="player-profile-empty">{t("playerNotFound")}</p>
        <Link className="player-back" to="/players/ff1s">
          {t("playerBack")}
        </Link>
      </div>
    );
  }

  return (
    <div className="player-profile-page">
      <div className="player-profile-card">
        <div className="player-profile-image">
          <img src={player.kep} alt={player.nev} />
        </div>

        <div className="player-profile-info">
          <h1 className="player-profile-name">{player.nev}</h1>
          <p className="player-profile-position">{player.poszt}</p>

          <div className="player-profile-grid">
            <div>
              <span>{t("playerNationality")}:</span>
              <strong>{player.nemzetiseg}</strong>
            </div>
            <div>
              <span>{t("playerBorn")}:</span>
              <strong>{player.szuletes}</strong>
            </div>
            <div>
              <span>{t("playerAgeGroup")}:</span>
              <strong>{translateAge(player.korosztaly)}</strong>
            </div>
            <div>
              <span>{t("playerPreferredFoot")}:</span>
              <strong>{player.ugyesebblaba}</strong>
            </div>
            <div>
              <span>{t("playerPrice")}:</span>
              <strong>{player.ar}</strong>
            </div>
          </div>

          <div className="player-profile-stats">
            <div>
              <span>{t("playerGoals")}:</span>
              <strong>{player.gol}</strong>
            </div>
            <div>
              <span>{t("playerAssists")}:</span>
              <strong>{player.golpassz}</strong>
            </div>
          </div>

          <Link className="player-back" to="/players/ff1s">
            {t("playerBack")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
