import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Tickets.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const API_BASE = "http://localhost:3500";

function Tickets() {
  const t = useT();
  const { lang } = useLanguage();
  const dateLocale = lang === "hu" ? "hu-HU" : "en-GB";
  const translateLeague = (value) => {
    if (lang === "en") {
      if (value === "Bajnokok Ligája") return "Champions League";
    }
    return value;
  };
  const translateAge = (value) => {
    if (lang === "en") {
      const v = String(value || "").toLowerCase();
      if (v === "felnőtt" || v === "felnott") return "Senior";
      if (v === "u19") return "U19";
    }
    return value;
  };
  const [matches, setMatches] = useState([]);
  const [liga, setLiga] = useState("osszes");
  const [korosztaly, setKorosztaly] = useState("osszes");
  const [hazaiIdegen, setHazaiIdegen] = useState("osszes");
  const [jegyElerheto, setJegyElerheto] = useState("osszes");

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

  const ligak = useMemo(() => {
    const values = new Set(matches.map((m) => m.liga).filter(Boolean));
    return ["osszes", ...values];
  }, [matches]);

  const korosztalyok = useMemo(() => {
    const values = new Set(matches.map((m) => m.korosztaly).filter(Boolean));
    return ["osszes", ...values];
  }, [matches]);

  const szurtMeccsek = useMemo(() => {
    return matches.filter((m) => {
      if (liga !== "osszes" && m.liga !== liga) return false;
      if (korosztaly !== "osszes" && m.korosztaly !== korosztaly) return false;
      if (hazaiIdegen !== "osszes" && m.hazaiIdegen !== hazaiIdegen)
        return false;
      if (jegyElerheto !== "osszes") {
        const desired = jegyElerheto === "igen";
        if (Boolean(m.jegyElerheto) !== desired) return false;
      }
      return true;
    });
  }, [matches, liga, korosztaly, hazaiIdegen, jegyElerheto]);

  return (
    <div className="container-match">
      <h1>{t("ticketsTitle")}</h1>

      <div className="match-filters">
        <label>
          {t("filterLeague")}
          <select value={liga} onChange={(e) => setLiga(e.target.value)}>
            {ligak.map((l) => (
              <option key={l} value={l}>
                {l === "osszes" ? t("filterAll") : translateLeague(l)}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t("filterAge")}
          <select
            value={korosztaly}
            onChange={(e) => setKorosztaly(e.target.value)}
          >
            {korosztalyok.map((k) => (
              <option key={k} value={k}>
                {k === "osszes" ? t("filterAll") : translateAge(k)}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t("filterHomeAway")}
          <select
            value={hazaiIdegen}
            onChange={(e) => setHazaiIdegen(e.target.value)}
          >
            <option value="osszes">{t("filterAll")}</option>
            <option value="hazai">{t("filterHome")}</option>
            <option value="idegen">{t("filterAway")}</option>
          </select>
        </label>

        <label>
          {t("filterTicket")}
          <select
            value={jegyElerheto}
            onChange={(e) => setJegyElerheto(e.target.value)}
          >
            <option value="osszes">{t("filterAll")}</option>
            <option value="igen">{t("ticketYes")}</option>
            <option value="nem">{t("ticketNo")}</option>
          </select>
        </label>
      </div>

      <div className="match-grid">
        {szurtMeccsek.map((match) => (
          <div className="match-card" key={match._id}>
            <div className="match-title">
              {match.sajatCsapat} - {match.ellenfel}
            </div>
            <div className="match-meta">
              <div>
                {t("matchLocation")}: {match.helyszin}
              </div>
              <div>
                {t("matchDate")}:{" "}
                {match.datum
                  ? new Date(match.datum).toLocaleString(dateLocale)
                  : ""}
              </div>
              <div>
                {t("matchHomeAway")}:{" "}
                {match.hazaiIdegen === "hazai"
                  ? t("filterHome")
                  : match.hazaiIdegen === "idegen"
                  ? t("filterAway")
                  : match.hazaiIdegen}
              </div>
              <div>
                {t("matchLeague")}: {translateLeague(match.liga)}
              </div>
              <div>
                {t("matchAge")}: {translateAge(match.korosztaly)}
              </div>
              <div>
                {t("matchResult")}: {match.eredmeny || "-"}
              </div>
              <div>
                {t("ticketAvailable")}:{" "}
                {match.jegyElerheto ? t("ticketYes") : t("ticketNo")}
              </div>
            </div>
            {match.jegyElerheto ? (
              <Link className="match-cta" to={`/tickets/${match._id}`}>
                {t("ticketBuy")}
              </Link>
            ) : (
              <div className="match-cta disabled">{t("ticketNone")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;
