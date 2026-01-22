import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Tickets.css";

const API_BASE = "http://localhost:3500";

function Tickets() {
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
      <h1>Meccsek</h1>

      <div className="match-filters">
        <label>
          Liga
          <select value={liga} onChange={(e) => setLiga(e.target.value)}>
            {ligak.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label>
          Korosztály
          <select
            value={korosztaly}
            onChange={(e) => setKorosztaly(e.target.value)}
          >
            {korosztalyok.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label>
          Hazai / idegen
          <select
            value={hazaiIdegen}
            onChange={(e) => setHazaiIdegen(e.target.value)}
          >
            <option value="osszes">osszes</option>
            <option value="hazai">hazai</option>
            <option value="idegen">idegen</option>
          </select>
        </label>

        <label>
          Jegy elérhető
          <select
            value={jegyElerheto}
            onChange={(e) => setJegyElerheto(e.target.value)}
          >
            <option value="osszes">osszes</option>
            <option value="igen">igen</option>
            <option value="nem">nem</option>
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
              <div>Helyszín: {match.helyszin}</div>
              <div>
                Dátum:{" "}
                {match.datum
                  ? new Date(match.datum).toLocaleString("hu-HU")
                  : ""}
              </div>
              <div>Hazai/idegen: {match.hazaiIdegen}</div>
              <div>Liga: {match.liga}</div>
              <div>Korosztály: {match.korosztaly}</div>
              <div>Eredmény: {match.eredmeny || "-"}</div>
              <div>Jegy elérhető: {match.jegyElerheto ? "igen" : "nem"}</div>
            </div>
            {match.jegyElerheto ? (
              <Link className="match-cta" to={`/tickets/${match._id}`}>
                Jegyvásárlás
              </Link>
            ) : (
              <div className="match-cta disabled">Nincs jegy</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;
