import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import StadiumSVG from "./StadiumSVG";
import "./Ticket.css";
import { useLanguage, useT } from "../i18n/LanguageContext.jsx";

function Ticket() {
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
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [stadiumName, setStadiumName] = useState(t("stadiumDefault"));
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
    { id: "Sajtó", price: 0, occupied: true },
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

  useEffect(() => {
    if (!match?.helyszin) {
      setStadiumName(t("stadiumDefault"));
    }
  }, [lang, match, t]);

  const handleSelect = (id) => {
    const sector = sectors.find((s) => s.id === id);
    if (sector.occupied) {
      alert(t("ticketAlertTaken"));
      return;
    }
    setSelectedSector(id);
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
    if (!customer.name || !customer.email || !customer.phone) {
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

    try {
      const ticketDraft = {
        name: customer.name,
        email: customer.email,
        match: matchLabel,
        quantity: 1,
        category: selectedSector,
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
              description: `${stadiumName} - ${selectedSector}`,
              price: sector?.price || 0,
              quantity: 1,
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
      datum: match.datum
        ? new Date(match.datum).toLocaleString(dateLocale)
        : "",
      liga: match.liga,
      korosztaly: match.korosztaly,
      hazaiIdegen: match.hazaiIdegen,
    };
  }, [match]);

  return (
    <div className="ticket-container">
      <h1>{t("ticketBooking")}</h1>

      {loading && <p className="selected-info">{t("ticketLoading")}</p>}

      {!loading && matchInfo && (
        <div className="match-summary">
          <div>{matchInfo.label}</div>
          <div>{matchInfo.datum}</div>
          <div>
            {translateLeague(matchInfo.liga)} –{" "}
            {translateAge(matchInfo.korosztaly)} –{" "}
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

      <h2 className="stadium-title">{stadiumName}</h2>

      <StadiumSVG
        sectors={sectors}
        selectedSector={selectedSector}
        onSelect={handleSelect}
      />

      <div className="customer-form">
        <h3>{t("ticketData")}</h3>

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

        {selectedSector && (
          <p className="selected-info">
            {t("ticketSector")}: {selectedSector}
          </p>
        )}

        <button
          onClick={handlePurchase}
          disabled={match && match.jegyElerheto === false}
        >
          {t("ticketReserve")}
        </button>
      </div>
    </div>
  );
}

export default Ticket;
