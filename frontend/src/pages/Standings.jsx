import { useEffect, useMemo, useState } from "react";
import "./Standings.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

const API_BASE = "http://localhost:3500";

const Standings = () => {
  const t = useT();
  const { lang } = useLanguage();
  const [matches, setMatches] = useState([]);
  const [league, setLeague] = useState("osszes");
  const [age, setAge] = useState("osszes");

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

  return (
    <div className="standings-page">
      <h1>{t("standingsTitle")}</h1>

      <div className="standings-filters">
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
      </div>

      {tableRows.length === 0 ? (
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
              {tableRows.map((row, idx) => (
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
