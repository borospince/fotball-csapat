import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import StadiumSVG from "./StadiumSVG";
import "./Ticket.css";

function Ticket() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [stadiumName, setStadiumName] = useState("Nemzeti SportarĂ©na");
  const [loading, setLoading] = useState(true);

  const [sectors, setSectors] = useState([
    { id: "A1", price: 5000, occupied: false },
    { id: "A2", price: 5000, occupied: false },
    { id: "A3", price: 5000, occupied: false },
    { id: "A4", price: 5000, occupied: true },
    { id: "A5", price: 5000, occupied: false },

    { id: "B1", price: 4500, occupied: false },
    { id: "B2", price: 4500, occupied: false },
    { id: "B3", price: 4500, occupied: false },
    { id: "B4", price: 4500, occupied: true },
    { id: "B5", price: 4500, occupied: false },
    { id: "B6", price: 4500, occupied: false },
    { id: "B7", price: 4500, occupied: false },
    { id: "B8", price: 4500, occupied: false },
    { id: "B9", price: 4500, occupied: false },

    { id: "C1", price: 4000, occupied: false },
    { id: "C2", price: 4000, occupied: false },
    { id: "C3", price: 4000, occupied: false },
    { id: "C4", price: 4000, occupied: false },
    { id: "C5", price: 4000, occupied: false },
    { id: "C6", price: 4000, occupied: true },
    { id: "C7", price: 4000, occupied: false },

    { id: "D1", price: 3500, occupied: false },
    { id: "D2", price: 3500, occupied: false },
    { id: "D3", price: 3500, occupied: false },
    { id: "D4", price: 3500, occupied: true },
    { id: "D5", price: 3500, occupied: false },
    { id: "D6", price: 3500, occupied: false },
    { id: "D7", price: 3500, occupied: false },
    { id: "D8", price: 3500, occupied: false },

    { id: "VIP", price: 12000, occupied: false },
    { id: "SajtĂł", price: 0, occupied: true },
  ]);

  const [selectedSector, setSelectedSector] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadMatch = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3500/api/matches-frontend");
        const data = await res.json();
        if (res.ok && data.matches) {
          const found = data.matches.find((m) => m._id === id);
          setMatch(found || null);
          if (found?.helyszin) {
            setStadiumName(found.helyszin);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  const handleSelect = (id) => {
    const sector = sectors.find((s) => s.id === id);
    if (sector.occupied) {
      alert("Ez a szektor mĂˇr foglalt!");
      return;
    }
    setSelectedSector(id);
  };

  const handlePurchase = async () => {
    if (match && match.jegyElerheto === false) {
      alert("Erre a meccsre most nem lehet jegyet foglalni.");
      return;
    }
    if (!selectedSector) {
      alert("VĂˇlassz egy szektort!");
      return;
    }
    if (!customer.name || !customer.email || !customer.phone) {
      alert("TĂ¶lts ki minden adatot!");
      return;
    }

    const sector = sectors.find((s) => s.id === selectedSector);
    const matchLabel = match
      ? `${match.sajatCsapat} - ${match.ellenfel}`
      : "Ismeretlen meccs";

    try {
      const response = await fetch("http://localhost:3500/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: customer.name,
          email: customer.email,
          match: matchLabel,
          quantity: 1,
          category: selectedSector,
          price: sector?.price || 0,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Hiba tĂ¶rtĂ©nt a foglalĂˇskor!");
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Hiba tĂ¶rtĂ©nt a foglalĂˇskor!");
      return;
    }

    setSectors((prev) =>
      prev.map((s) =>
        s.id === selectedSector ? { ...s, occupied: true } : s
      )
    );

    alert(`Sikeres foglalĂˇs!\nSzektor: ${selectedSector}`);

    setSelectedSector(null);
    setCustomer({ name: "", email: "", phone: "" });
  };

  const matchInfo = useMemo(() => {
    if (!match) return null;
    return {
      label: `${match.sajatCsapat} - ${match.ellenfel}`,
      datum: match.datum
        ? new Date(match.datum).toLocaleString("hu-HU")
        : "",
      liga: match.liga,
      korosztaly: match.korosztaly,
      hazaiIdegen: match.hazaiIdegen,
    };
  }, [match]);

  return (
    <div className="ticket-container">
      <h1>JegyfoglalĂˇs</h1>

      {loading && <p className="selected-info">BetĂ¶ltĂ©s</p>}

      {!loading && matchInfo && (
        <div className="match-summary">
          <div>{matchInfo.label}</div>
          <div>{matchInfo.datum}</div>
          <div>
            {matchInfo.liga} â€“ {matchInfo.korosztaly} â€“{" "}
            {matchInfo.hazaiIdegen}
          </div>
          <div>
            Jegy elĂ©rhetĹ‘: {match?.jegyElerheto ? "igen" : "nem"}
          </div>
        </div>
      )}

      <h2 className="stadium-title">{stadiumName}</h2>

      {/* SVG STADION */}
      <StadiumSVG
        sectors={sectors}
        selectedSector={selectedSector}
        onSelect={handleSelect}
      />

      {/* VĂSĂRLĂ“I ADATOK */}
      <div className="customer-form">
        <h3>VĂˇsĂˇrlĂˇs adatai</h3>

        <input
          placeholder="NĂ©v"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />

        <input
          placeholder="TelefonszĂˇm"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        {selectedSector && (
          <p className="selected-info">
            KivĂˇlasztott szektor: {selectedSector}
          </p>
        )}

        <button
          onClick={handlePurchase}
          disabled={match && match.jegyElerheto === false}
        >
          FoglalĂˇs
        </button>
      </div>
    </div>
  );
}

export default Ticket;
