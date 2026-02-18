import { useEffect, useMemo, useState } from "react";
import "./Standings.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const API_BASE = "http://localhost:3500";
const REFRESH_MS = 30000;
const LIVE_COMPETITIONS = [
  { code: "PL", labelHu: "Premier League", labelEn: "Premier League" },
  { code: "BL1", labelHu: "Bundesliga", labelEn: "Bundesliga" },
  { code: "PD", labelHu: "La Liga", labelEn: "La Liga" },
  { code: "SA", labelHu: "Serie A", labelEn: "Serie A" },
  { code: "FL1", labelHu: "Ligue 1", labelEn: "Ligue 1" },
  { code: "CL", labelHu: "Bajnokok Ligaja", labelEn: "Champions League" },
];

const Standings = () => {
  const t = useT();
  const { lang } = useLanguage();
  const [matches, setMatches] = useState([]);
  const [league, setLeague] = useState("osszes");
  const [age, setAge] = useState("osszes");
  const [competition, setCompetition] = useState("PL");
  const [liveRows, setLiveRows] = useState([]);
  const [liveCompetitionName, setLiveCompetitionName] = useState("");
  const [liveError, setLiveError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const translateLeague = (value) => {
    if (lang === "en") {
      if (value === "Bajnokok Ligaja") return "Champions League";
    }
    return value;
  };

  const translateAge = (value) => {
    if (lang === "en") {
      const v = String(value || "").toLowerCase();
      if (v === "felnott") return "Senior";
      if (v === "u19") return "U19";
    }
    return value;
  };

  useEffect(() => {
    let isMounted = true;

    const loadMatches = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/matches-frontend`);
        const data = await res.json();
        if (res.ok && isMounted) {
          setMatches(data.matches || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const loadLiveStandings = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/standings-live?competition=${competition}`
        );
        const data = await res.json();
        if (!isMounted) return;

        if (res.ok) {
          setLiveRows(data.rows || []);
          setLiveCompetitionName(data.competition || competition);
          setLiveError("");
          setLastUpdated(data.updatedAt ? new Date(data.updatedAt) : new Date());
          return;
        }

        setLiveRows([]);
        setLiveCompetitionName("");
        setLiveError(data?.message || "Elo tabella most nem elerheto.");
      } catch (error) {
        if (!isMounted) return;
        setLiveRows([]);
        setLiveCompetitionName("");
        setLiveError("Elo tabella most nem elerheto.");
      }
    };

    loadMatches();
    loadLiveStandings();
    const intervalId = setInterval(() => {
      loadMatches();
      loadLiveStandings();
    }, REFRESH_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [competition]);

  const leagues = useMemo(() => {
    const values = new Set(matches.map((m) => m.liga).filter(Boolean));
    return ["osszes", ...values];
  }, [matches]);

  const ages = useMemo(() => {
    const values = new Set(matches.map((m) => m.korosztaly).filter(Boolean));
    return ["osszes", ...values];
  }, [matches]);

  const tableRows = useMemo(() => {
    const parseScore = (result) => {
      if (!result || typeof result !== "string") return null;
      const match = result.match(/(\d+)\s*[-:]\s*(\d+)/);
      if (!match) return null;
      return { home: Number(match[1]), away: Number(match[2]) };
    };

    const rows = new Map();

    const addTeam = (team) => {
      if (!rows.has(team)) {
        rows.set(team, {
          team,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          gf: 0,
          ga: 0,
        });
      }
      return rows.get(team);
    };

    matches.forEach((m) => {
      if (league !== "osszes" && m.liga !== league) return;
      if (age !== "osszes" && m.korosztaly !== age) return;

      const score = parseScore(m.eredmeny || "");
      if (!score) return;

      const home = m.sajatCsapat;
      const away = m.ellenfel;
      if (!home || !away) return;

      const homeRow = addTeam(home);
      const awayRow = addTeam(away);

      homeRow.played += 1;
      awayRow.played += 1;

      homeRow.gf += score.home;
      homeRow.ga += score.away;
      awayRow.gf += score.away;
      awayRow.ga += score.home;

      if (score.home > score.away) {
        homeRow.wins += 1;
        awayRow.losses += 1;
      } else if (score.home < score.away) {
        awayRow.wins += 1;
        homeRow.losses += 1;
      } else {
        homeRow.draws += 1;
        awayRow.draws += 1;
      }
    });

    const list = Array.from(rows.values()).map((r) => ({
      ...r,
      gd: r.gf - r.ga,
      pts: r.wins * 3 + r.draws,
    }));

    list.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.localeCompare(b.team);
    });

    return list;
  }, [matches, league, age]);

  const visibleRows = liveRows.length ? liveRows : tableRows;
  const usingLiveData = liveRows.length > 0;

  return (
    <div className="standings-page">
      <h1>{t("standingsTitle")}</h1>
      <p className="standings-live">
        {usingLiveData
          ? `${lang === "en" ? "Live standings" : "Elo tabella"}: ${liveCompetitionName}`
          : lang === "en"
          ? "Local standings"
          : "Helyi tabella"}{" "}
        -{" "}
        {lang === "en" ? "updated" : "frissitve"}:{" "}
        {lastUpdated
          ? lastUpdated.toLocaleTimeString(lang === "en" ? "en-US" : "hu-HU")
          : "--:--:--"}
      </p>
      {!!liveError && <p className="standings-empty">{liveError}</p>}

      <div className="standings-filters">
        <label>
          {lang === "en" ? "Competition" : "Bajnoksag"}
          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
          >
            {LIVE_COMPETITIONS.map((item) => (
              <option key={item.code} value={item.code}>
                {lang === "en" ? item.labelEn : item.labelHu}
              </option>
            ))}
          </select>
        </label>

        {!usingLiveData && (
        <label>
          {t("standingsLeague")}
          <select value={league} onChange={(e) => setLeague(e.target.value)}>
            {leagues.map((l) => (
              <option key={l} value={l}>
                {l === "osszes" ? t("filterAll") : translateLeague(l)}
              </option>
            ))}
          </select>
        </label>
        )}

        {!usingLiveData && (
        <label>
          {t("standingsAge")}
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            {ages.map((a) => (
              <option key={a} value={a}>
                {a === "osszes" ? t("filterAll") : translateAge(a)}
              </option>
            ))}
          </select>
        </label>
        )}
      </div>

      {visibleRows.length === 0 ? (
        <p className="standings-empty">{t("standingsNoData")}</p>
      ) : (
        <div className="standings-table-wrap">
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("standingsTeam")}</th>
                <th>{t("standingsPlayed")}</th>
                <th>{t("standingsWins")}</th>
                <th>{t("standingsDraws")}</th>
                <th>{t("standingsLosses")}</th>
                <th>{t("standingsGF")}</th>
                <th>{t("standingsGA")}</th>
                <th>{t("standingsGD")}</th>
                <th>{t("standingsPts")}</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, idx) => (
                <tr key={row.team}>
                  <td>{idx + 1}</td>
                  <td className="team">{row.team}</td>
                  <td>{row.played}</td>
                  <td>{row.wins}</td>
                  <td>{row.draws}</td>
                  <td>{row.losses}</td>
                  <td>{row.gf}</td>
                  <td>{row.ga}</td>
                  <td>{row.gd}</td>
                  <td className="pts">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Standings;
