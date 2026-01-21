import { useContext } from 'react';
import { CartContext } from './kosar/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartItem,
    decreaseCartItem,
    totalPrice,
    totalCount
  } = useContext(CartContext);

  const formatFt = (n) => (Number(n) || 0).toLocaleString('hu-HU');

  const fizetes = async () => {
        if (cartItems.length === 0) { // Itt 'items' kell, mert nálad az a state neve
          alert("Üres a kosarad!");
          return;
        }

        try {
          // Itt hívjuk meg a BACKEND-edet (ezt meg kell írnod a szerver oldalon!)
          const res = await fetch("http://localhost:3500/api/stripe/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems }) // A te items state-edet küldjük
          });

          const data = await res.json();
          console.log(data);
          

          if (data.url) {
            window.location.href = data.url;
            localStorage.setItem("url", data.url);
          } else {
            console.error("Hiba: Nem érkezett URL a szervertől.");
            
          }
        } catch (error) {
          console.error("Hálózati hiba:", error);
        }
      };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h1>Kosár</h1>
          <p className="cart-subtitle">
            {totalCount ? `${totalCount} db termék a kosárban` : 'A kosár üres'}
          </p>
        </header>

        {cartItems && cartItems.length > 0 ? (
          <>
            <div className="cart-list">
              {cartItems.map((elem) => (
                <div className="cart-item" key={`${elem._id}-${elem.size}`}>
                  <div className="cart-img-wrap">
                    <img src={elem.kep} alt={elem.nev} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <div>
                        <h3 className="cart-item-title">{elem.nev}</h3>
                        <p className="cart-item-meta">
                          Méret: <b>{elem.size}</b>
                        </p>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(elem._id, elem.size)}
                        title="Eltávolítás"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-price">
                        <span>Egységár:</span>
                        <b>{formatFt(elem.ar)} Ft</b>
                      </div>

                      {/* ✅ + / − mennyiség, készletkezeléssel */}
                      <div className="quantity-controls">
                        <button onClick={() => decreaseCartItem(elem._id, elem.size)} aria-label="Csökkentés">
                          −
                        </button>
                        <span>{elem.quantity}</span>
                        <button onClick={() => increaseCartItem(elem._id, elem.size)} aria-label="Növelés">
                          +
                        </button>
                      </div>

                      <div className="cart-line-total">
                        <span>Részösszeg:</span>
                        <b>{formatFt((elem.ar || 0) * (elem.quantity || 0))} Ft</b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <div className="summary-card">
                <div className="summary-row">
                  <span>Összes termék:</span>
                  <b>{totalCount} db</b>
                </div>
                <div className="summary-row">
                  <span>Végösszeg:</span>
                  <b className="summary-total">{formatFt(totalPrice)} Ft</b>
                </div>

                <button className="checkout-btn" onClick={fizetes}>Tovább a fizetéshez</button>
                <p className="summary-note">A szállítási költség a pénztárnál számolódik.</p>
              </div>
            </aside>
          </>
        ) : (
          <div className="cart-empty">
            <p>A kosár üres!</p>
            <a className="cart-back" href="/shops">Vissza a vásárláshoz</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
