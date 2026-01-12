import { useState, useEffect } from 'react';
import './Ticket.css'

function Ticket() {
    const [stadiumName, setStadiumName] = useState("Nemzeti Sportaréna");
    const [rows, setRows] = useState(20);
    const [seatsPerRow, setSeatsPerRow] = useState(30);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
    const [step, setStep] = useState(1); // 1: stadion nézet, 2: helyválasztás, 3: adatbevitel, 4: összegzés
    const [ticketPrice, setTicketPrice] = useState(5000);
    const [showStats, setShowStats] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        match: '',
        quantity: 1,
        category: 'Normál'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceTable = {
            'Normál': 3000,
            'VIP': 8000,
            'Ultra': 12000,
        };

        const ticketData = {
            ...form,
            price: priceTable[form.category] * form.quantity
        };

        const res = await fetch('http://localhost:3500/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });

        const data = await res.json();
        alert("Sikeres jegyfoglalás!");
        console.log(data);
    };

    // Stadion inicializálása
  useEffect(() => {
    initializeSeats();
    // Betöltés localStorage-ból
    const savedSeats = localStorage.getItem('stadiumSeats');
    if (savedSeats) {
      try {
        const parsedSeats = JSON.parse(savedSeats);
        if (parsedSeats.length === rows && parsedSeats[0].length === seatsPerRow) {
          setSeats(parsedSeats);
        }
      } catch (error) {
        console.log("Nem sikerült betölteni a korábbi foglalásokat");
      }
    }
  }, []);

  // Helyek mentése változás esetén
  useEffect(() => {
    if (seats.length > 0) {
      localStorage.setItem('stadiumSeats', JSON.stringify(seats));
    }
  }, [seats]);

  const initializeSeats = () => {
    const newSeats = [];
    for (let row = 0; row < rows; row++) {
      const seatRow = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {
        seatRow.push({
          row: row + 1,
          seat: seat + 1,
          occupied: false,
          customer: null,
          price: calculatePrice(row + 1, seat + 1)
        });
      }
      newSeats.push(seatRow);
    }
    setSeats(newSeats);
  };

  const calculatePrice = (row, seat) => {
    if (row <= 5) {
      return Math.floor(ticketPrice * 1.3);
    } else if (row <= 10) {
      return Math.floor(ticketPrice * 1.15);
    } else if (row > rows - 5) {
      return Math.floor(ticketPrice * 0.8);
    } else {
      return ticketPrice;
    }
  };

  const handleSeatClick = (row, seat) => {
    if (step !== 2) return;
    
    if (seats[row-1][seat-1].occupied) {
      alert(`A(z) ${row}. sor ${seat}. széke már foglalt!`);
      return;
    }

    const seatKey = `${row}-${seat}`;
    const isSelected = selectedSeats.some(s => s.key === seatKey);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.key !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, { 
        row, 
        seat, 
        key: seatKey,
        price: seats[row-1][seat-1].price 
      }]);
    }
  };

  const calculateTotal = () => {
    let total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    if (selectedSeats.length >= 5) {
      total *= 0.9; // 10% kedvezmény
    }
    return Math.floor(total);
  };

  const handlePurchase = () => {
    if (!customer.name || !customer.email || !customer.phone) {
      alert("Kérjük, töltsd ki minden mezőt!");
      return;
    }

    if (!customer.email.includes('@') || !customer.email.includes('.')) {
      alert("Kérjük, érvényes e-mail címet adj meg!");
      return;
    }

    const updatedSeats = [...seats];
    selectedSeats.forEach(s => {
      updatedSeats[s.row-1][s.seat-1].occupied = true;
      updatedSeats[s.row-1][s.seat-1].customer = { ...customer };
    });

    setSeats(updatedSeats);
    
    alert(`Sikeres vásárlás! Összeg: ${calculateTotal()} Ft\nJegyeid elküldtük a következő e-mail címre: ${customer.email}`);
    
    // Visszaállítás
    setSelectedSeats([]);
    setCustomer({ name: '', email: '', phone: '' });
    setStep(1);
  };

  const countAvailableSeats = () => {
    return seats.reduce((total, row) => 
      total + row.filter(seat => !seat.occupied).length, 0);
  };

  const countOccupiedSeats = () => {
    return seats.reduce((total, row) => 
      total + row.filter(seat => seat.occupied).length, 0);
  };

  const resetStadium = () => {
    if (window.confirm("Biztosan törölni akarod az összes foglalást?")) {
      initializeSeats();
      localStorage.removeItem('stadiumSeats');
      setSelectedSeats([]);
      setStep(1);
    }
  };

//   const renderStadium = () => {
//     return (
//       <div className="stadium-container">
//         <div className="stadium-header">
//           <h2>{stadiumName} - Ülőhelyek</h2>
//           <div className="legend">
//             <div className="legend-item">
//               <span className="seat-icon available"></span> Szabad
//             </div>
//             <div className="legend-item">
//               <span className="seat-icon occupied"></span> Foglalt
//             </div>
//             <div className="legend-item">
//               <span className="seat-icon selected"></span> Kiválasztott
//             </div>
//           </div>
//         </div>
        
//         <div className="stage">SZÍNPAJZS</div>
        
//         <div className="seats-grid">
//           {seats.map((row, rowIndex) => (
//             <div key={rowIndex} className="seat-row">
//               <div className="row-label">{rowIndex + 1}. sor</div>
//               {row.map((seat, seatIndex) => {
//                 const seatKey = `${rowIndex + 1}-${seatIndex + 1}`;
//                 const isSelected = selectedSeats.some(s => s.key === seatKey);
//                 let seatClass = "seat";
//                 if (seat.occupied) {
//                   seatClass += " occupied";
//                 } else if (isSelected) {
//                   seatClass += " selected";
//                 } else {
//                   seatClass += " available";
//                 }
                
//                 return (
//                   <button
//                     key={seatIndex}
//                     className={seatClass}
//                     onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
//                     disabled={seat.occupied || step !== 2}
//                     title={`${rowIndex + 1}. sor ${seatIndex + 1}. szék - ${seat.price} Ft`}
//                   >
//                     {seatIndex + 1}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
        
//         <div className="stadium-info">
//           <p>Összesen {rows} sor, soronként {seatsPerRow} ülőhely</p>
//           <p>Szabad helyek: {countAvailableSeats()} | Foglalt helyek: {countOccupiedSeats()}</p>
//         </div>
//       </div>
//     );
//   };

//   const renderCustomerForm = () => {
//     return (
//       <div className="customer-form">
//         <h3>Vásárló adatai</h3>
//         <div className="form-group">
//           <label htmlFor="name">Név:</label>
//           <input
//             type="text"
//             id="name"
//             value={customer.name}
//             onChange={(e) => setCustomer({...customer, name: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">E-mail cím:</label>
//           <input
//             type="email"
//             id="email"
//             value={customer.email}
//             onChange={(e) => setCustomer({...customer, email: e.target.value})}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Telefonszám:</label>
//           <input
//             type="tel"
//             id="phone"
//             value={customer.phone}
//             onChange={(e) => setCustomer({...customer, phone: e.target.value})}
//             required
//           />
//         </div>
//       </div>
//     );
//   };

//   const renderSummary = () => {
//     const total = calculateTotal();
//     const discount = selectedSeats.length >= 5 ? total * 0.1 : 0;
    
//     return (
//       <div className="summary">
//         <h3>Vásárlás összegzése</h3>
//         <div className="summary-details">
//           <p><strong>Vásárló:</strong> {customer.name}</p>
//           <p><strong>E-mail:</strong> {customer.email}</p>
//           <p><strong>Telefonszám:</strong> {customer.phone}</p>
//         </div>
        
//         <div className="selected-seats-list">
//           <h4>Kiválasztott helyek:</h4>
//           {selectedSeats.map((seat, index) => (
//             <div key={seat.key} className="seat-item">
//               {index + 1}. {seat.row}. sor {seat.seat}. szék - {seat.price} Ft
//             </div>
//           ))}
//         </div>
        
//         <div className="price-summary">
//           <p>Jegyek összesen: {selectedSeats.reduce((sum, s) => sum + s.price, 0)} Ft</p>
//           {selectedSeats.length >= 5 && (
//             <p>10% csoportkedvezmény: -{discount} Ft</p>
//           )}
//           <p className="total-price">Összesen: {total} Ft</p>
//         </div>
//       </div>
//     );
//   };

//   const renderStatistics = () => {
//     const totalSeats = rows * seatsPerRow;
//     const occupied = countOccupiedSeats();
//     const available = countAvailableSeats();
//     const occupancyRate = (occupied / totalSeats * 100).toFixed(1);
    
//     let revenue = 0;
//     seats.forEach(row => {
//       row.forEach(seat => {
//         if (seat.occupied) {
//           revenue += seat.price;
//         }
//       });
//     });

//     // Legnépszerűbb sorok
//     const rowStats = seats.map((row, index) => {
//       const occupiedInRow = row.filter(seat => seat.occupied).length;
//       return { row: index + 1, occupied: occupiedInRow };
//     }).sort((a, b) => b.occupied - a.occupied).slice(0, 3);

//     return (
//       <div className="statistics">
//         <h3>Statisztikák</h3>
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h4>Elhelyezkedés</h4>
//             <p>Összes ülőhely: {totalSeats}</p>
//             <p>Foglalt: {occupied} ({occupancyRate}%)</p>
//             <p>Szabad: {available}</p>
//           </div>
//           <div className="stat-card">
//             <h4>Pénzügyi</h4>
//             <p>Bevétel: {revenue} Ft</p>
//             <p>Átlagár: {occupied > 0 ? Math.floor(revenue / occupied) : 0} Ft</p>
//           </div>
//           <div className="stat-card">
//             <h4>Legnépszerűbb sorok</h4>
//             {rowStats.map(stat => (
//               <p key={stat.row}>
//                 {stat.row}. sor: {stat.occupied} foglalt
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

    return (
        <div className="ticket-container">
            <h1>Jegyfoglalás</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Név" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />

                <select name="match" onChange={handleChange} required>
                    <option value="">Válassz meccset</option>
                    <option value="Foci Klub – Rivális FC">Ízelt Lábúak FC – FC Barcelona</option>
                    <option value="Foci Klub – Legendák FC">Ízelt Lábúak FC – Újpest</option>
                </select>

                <select name="category" onChange={handleChange}>
                    <option value="Normál">Normál</option>
                    <option value="VIP">VIP</option>
                    <option value="Ultra">Ultra</option>
                </select>

                <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                />

                <button type="submit">Jegy foglalás</button>
            </form>
        </div>);
}

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Stadion Jegyvásárló Rendszer</h1>
//         <p>{stadiumName}</p>
//       </header>

//       <main className="main-content">
//         <div className="controls">
//           <div className="step-indicator">
//             <button 
//               className={`step-btn ${step === 1 ? 'active' : ''}`}
//               onClick={() => setStep(1)}
//             >
//               1. Stadion nézet
//             </button>
//             <button 
//               className={`step-btn ${step === 2 ? 'active' : ''}`}
//               onClick={() => setStep(2)}
//               disabled={selectedSeats.length > 0 && step > 2}
//             >
//               2. Helyválasztás
//             </button>
//             <button 
//               className={`step-btn ${step === 3 ? 'active' : ''}`}
//               onClick={() => selectedSeats.length > 0 && setStep(3)}
//               disabled={selectedSeats.length === 0}
//             >
//               3. Adatbevitel
//             </button>
//             <button 
//               className={`step-btn ${step === 4 ? 'active' : ''}`}
//               onClick={() => selectedSeats.length > 0 && customer.name && setStep(4)}
//               disabled={selectedSeats.length === 0 || !customer.name}
//             >
//               4. Összegzés
//             </button>
//           </div>

//           <div className="action-buttons">
//             <button 
//               className="stats-btn"
//               onClick={() => setShowStats(!showStats)}
//             >
//               {showStats ? 'Statisztikák elrejtése' : 'Statisztikák megjelenítése'}
//             </button>
//             <button 
//               className="reset-btn"
//               onClick={resetStadium}
//             >
//               Stadion alaphelyzetbe
//             </button>
//           </div>
//         </div>

//         {showStats && renderStatistics()}

//         <div className="content-area">
//           <div className="left-panel">
//             {renderStadium()}
//           </div>
          
//           <div className="right-panel">
//             {step === 2 && (
//               <div className="selection-info">
//                 <h3>Helyválasztás módban</h3>
//                 <p>Kattints az ülőhelyekre a kijelöléshez</p>
//                 <p>Kiválasztott helyek: {selectedSeats.length}</p>
//                 {selectedSeats.length > 0 && (
//                   <button 
//                     className="next-btn"
//                     onClick={() => setStep(3)}
//                   >
//                     Tovább az adatbevitelhez
//                   </button>
//                 )}
//               </div>
//             )}
            
//             {step === 3 && (
//               <>
//                 {renderCustomerForm()}
//                 <button 
//                   className="next-btn"
//                   onClick={() => setStep(4)}
//                   disabled={!customer.name || !customer.email || !customer.phone}
//                 >
//                   Tovább az összegzéshez
//                 </button>
//               </>
//             )}
            
//             {step === 4 && (
//               <>
//                 {renderSummary()}
//                 <div className="purchase-buttons">
//                   <button 
//                     className="purchase-btn"
//                     onClick={handlePurchase}
//                   >
//                     Vásárlás megerősítése
//                   </button>
//                   <button 
//                     className="cancel-btn"
//                     onClick={() => setStep(2)}
//                   >
//                     Módosítás
//                   </button>
//                 </div>
//               </>
//             )}
            
//             {selectedSeats.length > 0 && step >= 2 && (
//               <div className="current-selection">
//                 <h4>Jelenleg kiválasztva:</h4>
//                 {selectedSeats.map(seat => (
//                   <div key={seat.key} className="selected-seat">
//                     {seat.row}. sor {seat.seat}. szék - {seat.price} Ft
//                     <button 
//                       className="remove-seat"
//                       onClick={() => setSelectedSeats(selectedSeats.filter(s => s.key !== seat.key))}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//                 <div className="selection-total">
//                   Összesen: {calculateTotal()} Ft
//                   {selectedSeats.length >= 5 && (
//                     <span className="discount-badge">10% kedvezmény!</span>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="app-footer">
//         <p>Stadion Jegyvásárló Rendszer &copy; 2024</p>
//         <p>Alapár: {ticketPrice} Ft | Sorok: {rows} | Székek/sor: {seatsPerRow}</p>
//       </footer>
//     </div>
//   );
// };

export default Ticket;
