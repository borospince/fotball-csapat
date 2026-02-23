import { useEffect, useMemo, useState } from "react";
import "./Schedule.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const API_BASE = "http://localhost:3500";

const Schedule = () => {
  const t = useT();
  const { lang } = useLanguage();
  const dateLocale = lang === "hu" ? "hu-HU" : "en-GB";
  const [matches, setMatches] = useState([]);
  const [timeFilter, setTimeFilter] = useState("upcoming");

  const translateLeague = (value) => {
    if (lang === "en") {
      if (value === "Bajnokok Ligaja" || value === "Bajnokok Lig?ja") return "Champions League";
    }
    return value;
  };

  const translateAge = (value) => {
    if (lang === "en") {
      const v = String(value || "").toLowerCase();
      if (v === "felnott" || v === "feln?tt") return "Senior";
      if (v === "u19") return "U19";
    }
    return value;
  };

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/matches-frontend`);
        const data = await res.json();
        if (res.ok) {
          setMatches(data.matches || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    const now = Date.now();
    const withDate = (m) => {
      if (!m?.datum) return null;
      const time = new Date(m.datum).getTime();
      return Number.isFinite(time) ? time : null;
    };

    let list = matches.slice();

    list = list.filter((m) => {
      const time = withDate(m);
      if (timeFilter === "upcoming") return time !== null && time >= now;
      if (timeFilter === "past") return time !== null && time < now;
      return true;
    });

    list.sort((a, b) => {
      const ta = withDate(a) ?? 0;
      const tb = withDate(b) ?? 0;
      if (timeFilter === "past") return tb - ta;
      return ta - tb;
    });

    return list;
  }, [matches, timeFilter]);

  return (
    <div className="schedule-page">
      <h1>{t("scheduleTitle")}</h1>

      <div className="schedule-filter">
        <button
          className={timeFilter === "upcoming" ? "active" : ""}
          onClick={() => setTimeFilter("upcoming")}
        >
          {t("scheduleUpcoming")}
        </button>
        <button
          className={timeFilter === "past" ? "active" : ""}
          onClick={() => setTimeFilter("past")}
        >
          {t("schedulePast")}
        </button>
        <button
          className={timeFilter === "all" ? "active" : ""}
          onClick={() => setTimeFilter("all")}
        >
          {t("scheduleAll")}
        </button>
      </div>

      {filteredMatches.length === 0 ? (
        <p className="schedule-empty">{t("scheduleEmpty")}</p>
      ) : (
        <div className="schedule-grid">
          {filteredMatches.map((match) => (
            <article className="schedule-card" key={match._id}>
              <div className="schedule-title">
                {match.sajatCsapat} - {match.ellenfel}
              </div>
              <div className="schedule-meta">
                <div>
                  {t("matchDate")}:
                  {match.datum
                    ? ` ${new Date(match.datum).toLocaleString(dateLocale)}`
                    : ` ${t("scheduleDateUnknown")}`}
                </div>
                <div>
                  {t("matchLocation")}: {match.helyszin}
                </div>
                <div>
                  {t("matchLeague")}: {translateLeague(match.liga)}
                </div>
                <div>
                  {t("matchAge")}: {translateAge(match.korosztaly)}
                </div>
                <div>
                  {t("matchHomeAway")}: {match.hazaiIdegen === "hazai" ? t("filterHome") : match.hazaiIdegen === "idegen" ? t("filterAway") : match.hazaiIdegen}
                </div>
                <div>
                  {t("matchResult")}: {match.eredmeny || "-"}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
