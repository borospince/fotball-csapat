import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import StadiumSVG from "./StadiumSVG";
import "./Ticket.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";
import { formatDateTime } from "../i18n/formatters.js";
import { translateAgeGroup, translateLeague } from "../i18n/valueTranslations.js";

function Ticket() {
  const t = useT();
  const { lang } = useLanguage();
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [stadiumName, setStadiumName] = useState(t("stadiumDefault"));
  const [loading, setLoading] = useState(true);

  const initialSectors = [
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
    { id: "Sajtó", price: 0, occupied: true },
  ];

  const [sectors, setSectors] = useState(initialSectors);
  const [seatsBySector, setSeatsBySector] = useState(() => {
    const map = {};
    initialSectors.forEach((sector) => {
      map[sector.id] = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        occupied: false,
      }));
    });
    return map;
  });
  const [occupiedBySector, setOccupiedBySector] = useState({});

  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setCustomer((prev) => ({
        ...prev,
        name: user.nev || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, []);

  useEffect(() => {
    const loadOccupiedSeats = async () => {
      if (!id) return;
      try {
        const res = await fetch(
          `http://localhost:3500/api/tickets/occupied?matchId=${id}`
        );
        const data = await res.json();
        if (!res.ok) return;

        const map = {};
        (data.tickets || []).forEach((ticket) => {
          if (!ticket.sector || ticket.seat === undefined) return;
          const seatNumber = Number(ticket.seat);
          if (Number.isNaN(seatNumber)) return;
          if (!map[ticket.sector]) {
            map[ticket.sector] = new Set();
          }
          map[ticket.sector].add(seatNumber);
        });
        setOccupiedBySector(map);
        setSeatsBySector((prev) => {
          const next = { ...prev };
          Object.entries(map).forEach(([sectorId, seats]) => {
            const list = next[sectorId];
            if (!list) return;
            next[sectorId] = list.map((seat) =>
              seats.has(seat.id) ? { ...seat, occupied: true } : seat
            );
          });
          return next;
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadOccupiedSeats();
  }, [id]);

  useEffect(() => {
    if (!match?.helyszin) {
      setStadiumName(t("stadiumDefault"));
    }
  }, [lang, match, t]);

  const handleSelect = (sectorId) => {
    const sector = sectors.find((s) => s.id === sectorId);
    if (sector.occupied) {
      alert(t("ticketAlertTaken"));
      return;
    }
    setSelectedSector(sectorId);
    setSelectedSeats([]);
  };

  const handleSeatSelect = (seatId) => {
    if (!selectedSector) return;
    const seats = seatsBySector[selectedSector] || [];
    const seat = seats.find((s) => s.id === seatId);
    const occupiedSet = occupiedBySector[selectedSector];
    const isOccupied = (occupiedSet && occupiedSet.has(seatId)) || seat?.occupied;
    if (isOccupied) {
      alert(t("seatTakenAlert"));
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((selectedId) => selectedId !== seatId)
        : [...prev, seatId]
    );
  };

  const handlePurchase = async () => {
    if (match && match.jegyElerheto === false) {
      alert(t("ticketAlertMatchClosed"));
      return;
    }
    if (!selectedSector) {
      alert(t("ticketAlertPickSector"));
      return;
    }
    if (selectedSeats.length === 0) {
      alert(t("seatPickAlert"));
      return;
    }
    if (!isLoggedIn && (!customer.name || !customer.email || !customer.phone)) {
      alert(t("ticketAlertFillAll"));
      return;
    }

    const sector = sectors.find((s) => s.id === selectedSector);
    if (!sector || sector.price <= 0) {
      alert(t("ticketAlertNoPurchase"));
      return;
    }
    const matchLabel = match
      ? `${match.sajatCsapat} - ${match.ellenfel}`
      : "Ismeretlen meccs";
    const orderedSeats = [...selectedSeats].sort((a, b) => a - b);

    try {
      const ticketDraft = {
        name: customer.name,
        email: customer.email,
        match: matchLabel,
        matchId: id,
        sector: selectedSector,
        seat: orderedSeats[0],
        seats: orderedSeats,
        quantity: orderedSeats.length,
        category: orderedSeats.map((seat) => `${selectedSector}-${seat}`).join(","),
        price: sector?.price || 0,
      };

      const response = await fetch(
        "http://localhost:3500/api/stripe/create-ticket-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              name: matchLabel,
              description: `${stadiumName} - ${selectedSector}/${orderedSeats.join(",")}`,
              price: sector?.price || 0,
              quantity: orderedSeats.length,
            },
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        alert(err.error || t("ticketPayError"));
        return;
      }

      const data = await response.json();
      setSeatsBySector((prev) => {
        const next = { ...prev };
        const list = next[selectedSector] || [];
        next[selectedSector] = list.map((seat) =>
          orderedSeats.includes(seat.id) ? { ...seat, occupied: true } : seat
        );
        return next;
      });
      setOccupiedBySector((prev) => {
        const next = { ...prev };
        const set = new Set(next[selectedSector] || []);
        orderedSeats.forEach((seatId) => set.add(seatId));
        next[selectedSector] = set;
        return next;
      });
      localStorage.setItem("ticketDraft", JSON.stringify(ticketDraft));
      localStorage.setItem("url", `/tickets/${id}`);
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(t("ticketPayError"));
      return;
    }
  };

  const matchInfo = useMemo(() => {
    if (!match) return null;
    return {
      label: `${match.sajatCsapat} - ${match.ellenfel}`,
      datum: formatDateTime(match.datum, lang),
      liga: match.liga,
      korosztaly: match.korosztaly,
      hazaiIdegen: match.hazaiIdegen,
    };
  }, [match, lang]);

  return (
    <div className="ticket-page">
      <div className="ticket-container">
      <h1>{t("ticketBooking")}</h1>

      {loading && <p className="selected-info">{t("ticketLoading")}</p>}

      {!loading && matchInfo && (
        <div className="match-summary">
          <div>{matchInfo.label}</div>
          <div>{matchInfo.datum}</div>
          <div>
            {translateLeague(matchInfo.liga, lang)} –{" "}
            {translateAgeGroup(matchInfo.korosztaly, lang)} –{" "}
            {matchInfo.hazaiIdegen === "hazai"
              ? t("filterHome")
              : matchInfo.hazaiIdegen === "idegen"
              ? t("filterAway")
              : matchInfo.hazaiIdegen}
          </div>
          <div>
            {t("ticketAvailable")}:{" "}
            {match?.jegyElerheto ? t("ticketYes") : t("ticketNo")}
          </div>
        </div>
      )}

      <div className="ticket-layout">
        <section className="ticket-stage">
          <h2 className="stadium-title">{stadiumName}</h2>
          <StadiumSVG
            sectors={sectors}
            selectedSector={selectedSector}
            onSelect={handleSelect}
          />
          <div className="seat-legend">
            <span className="legend-item">
              <span className="legend-dot available"></span>
              {t("seatLegendAvailable")}
            </span>
            <span className="legend-item">
              <span className="legend-dot selected"></span>
              {t("seatLegendSelected")}
            </span>
            <span className="legend-item">
              <span className="legend-dot occupied"></span>
              {t("seatLegendOccupied")}
            </span>
          </div>
        </section>

        <aside className="ticket-side">
          {selectedSector && (
            <div className="seat-picker">
              <h4>
                {t("seatTitle")} – {selectedSector} (
                {sectors.find((s) => s.id === selectedSector)?.price ?? "-"} Ft)
              </h4>
              <div className="seat-grid seat-grid-labeled">
                {(() => {
                  const seats = seatsBySector[selectedSector] || [];
                  const cols = 8;
                  const rows = 5;
                  const cells = [];
                  cells.push(
                    <div key="corner" className="seat-label corner"></div>
                  );
                  for (let c = 1; c <= cols; c++) {
                    cells.push(
                      <div key={`col-${c}`} className="seat-label">
                        {c}
                      </div>
                    );
                  }
                  for (let r = 1; r <= rows; r++) {
                    cells.push(
                      <div key={`row-${r}`} className="seat-label row">
                        {r}
                      </div>
                    );
                    for (let c = 1; c <= cols; c++) {
                      const seatId = (r - 1) * cols + c;
                      const seat = seats.find((s) => s.id === seatId);
                      const occupiedSet = occupiedBySector[selectedSector];
                      const isOccupied =
                        (occupiedSet && occupiedSet.has(seatId)) ||
                        seat?.occupied;
                      cells.push(
                        <button
                          key={`${selectedSector}-${seatId}`}
                          className={`seat-btn${
                            isOccupied ? " occupied" : ""
                          }${selectedSeats.includes(seatId) ? " selected" : ""} row-${r}`}
                          onClick={() => handleSeatSelect(seatId)}
                          disabled={isOccupied}
                        >
                          {seatId}
                        </button>
                      );
                    }
                  }
                  return cells;
                })()}
              </div>
            </div>
          )}

          <div className="customer-form">
        <h3>{t("ticketData")}</h3>

        {!isLoggedIn && (
          <>
            <input
              placeholder={t("ticketName")}
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />

            <input
              placeholder={t("ticketEmail")}
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />

            <input
              placeholder={t("ticketPhone")}
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
          </>
        )}

        {selectedSector && (
          <p className="selected-info">
            {t("ticketSector")}: {selectedSector}
          </p>
        )}
        {selectedSeats.length > 0 && (
          <p className="selected-info">
            {t("seatSelected")}: {selectedSeats.slice().sort((a, b) => a - b).join(", ")} ({selectedSeats.length} db)
          </p>
        )}

            <button
              onClick={handlePurchase}
              disabled={match && match.jegyElerheto === false}
            >
              {t("ticketReserve")}
            </button>
          </div>
        </aside>
      </div>
    </div>
    </div>
  );
}

export default Ticket;
