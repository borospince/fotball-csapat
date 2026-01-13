import { useState } from "react";
import StadiumSVG from "./StadiumSVG";
import "./Ticket.css";

function Ticket() {
  const [stadiumName] = useState("Nemzeti Sportaréna");

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

  const handleSelect = (id) => {
    const sector = sectors.find((s) => s.id === id);
    if (sector.occupied) {
      alert("Ez a szektor már foglalt!");
      return;
    }
    setSelectedSector(id);
  };

  const handlePurchase = () => {
    if (!selectedSector) {
      alert("Válassz egy szektort!");
      return;
    }
    if (!customer.name || !customer.email || !customer.phone) {
      alert("Tölts ki minden adatot!");
      return;
    }

    setSectors((prev) =>
      prev.map((s) =>
        s.id === selectedSector ? { ...s, occupied: true } : s
      )
    );

    alert(`Sikeres foglalás!\nSzektor: ${selectedSector}`);

    setSelectedSector(null);
    setCustomer({ name: "", email: "", phone: "" });
  };

  return (
    <div className="ticket-container">
      <h1>Jegyfoglalás</h1>

      <h2 className="stadium-title">{stadiumName}</h2>

      {/* SVG STADION */}
      <StadiumSVG
        sectors={sectors}
        selectedSector={selectedSector}
        onSelect={handleSelect}
      />

      {/* VÁSÁRLÓI ADATOK */}
      <div className="customer-form">
        <h3>Vásárló adatai</h3>

        <input
          placeholder="Név"
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
          placeholder="Telefonszám"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        {selectedSector && (
          <p className="selected-info">
            Kiválasztott szektor: {selectedSector}
          </p>
        )}

        <button onClick={handlePurchase}>Foglalás</button>
      </div>
    </div>
  );
}

export default Ticket;
