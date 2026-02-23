import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Tickets.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";
import { formatDateTime } from "../i18n/formatters.js";
import { translateAgeGroup, translateLeague } from "../i18n/valueTranslations.js";

const API_BASE = "http://localhost:3500";

function Tickets() {
  const t = useT();
  const { lang } = useLanguage();
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
                {l === "osszes" ? t("filterAll") : translateLeague(l, lang)}
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
                {k === "osszes" ? t("filterAll") : translateAgeGroup(k, lang)}
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
                {formatDateTime(match.datum, lang)}
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
                {t("matchLeague")}: {translateLeague(match.liga, lang)}
              </div>
              <div>
                {t("matchAge")}: {translateAgeGroup(match.korosztaly, lang)}
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
