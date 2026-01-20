import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from './kosar/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, totalPrice, totalCount } = useContext(CartContext);
  const [items, setItems] = useState([]);

  // mindig szinkronban a contexttel (és fallback localStorage-ből)
  useEffect(() => {
    const tomb = JSON.parse(localStorage.getItem('kosar')) || [];
    if (cartItems && cartItems.length >= 0) setItems(cartItems.length ? cartItems : tomb);
  }, [cartItems]);

  const formatFt = (n) => {
    const num = Number(n) || 0;
    return num.toLocaleString('hu-HU');
  };

  const eltavolitas = (id, size) => {
    removeFromCart(id, size);
  };

  // -1 mennyiség: ha 1-ről csökkentenéd, akkor eltávolítjuk
  const csokkent = (elem) => {
    if ((elem.quantity || 1) <= 1) {
      removeFromCart(elem._id, elem.size);
      return;
    }
    // meglévő addToCart csak növel, ezért itt manuálisan csökkentünk
    const uj = items.map((it) =>
      it._id === elem._id && it.size === elem.size
        ? { ...it, quantity: (it.quantity || 1) - 1 }
        : it
    );
    setItems(uj);
    localStorage.setItem('kosar', JSON.stringify(uj));
  };

  // +1 mennyiség a contexten keresztül (ez frissíti a localStorage-t is)
  const noveles = (elem) => {
    addToCart(elem, elem.size, 1);
  };

  const osszeg = useMemo(() => totalPrice, [totalPrice]);
  const darab = useMemo(() => totalCount, [totalCount]);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h1>Kosár</h1>
          <p className="cart-subtitle">
            {darab ? `${darab} db termék a kosárban` : 'A kosár jelenleg üres'}
          </p>
        </header>

        {items && items.length > 0 ? (
          <>
            <div className="cart-list">
              {items.map((elem) => (
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
                        onClick={() => eltavolitas(elem._id, elem.size)}
                        aria-label="Termék eltávolítása"
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

                      <div className="quantity-controls">
                        <button onClick={() => csokkent(elem)} aria-label="Mennyiség csökkentése">
                          −
                        </button>
                        <span>{elem.quantity || 1}</span>
                        <button onClick={() => noveles(elem)} aria-label="Mennyiség növelése">
                          +
                        </button>
                      </div>

                      <div className="cart-line-total">
                        <span>Részösszeg:</span>
                        <b>{formatFt((elem.ar || 0) * (elem.quantity || 1))} Ft</b>
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
                  <b>{darab} db</b>
                </div>
                <div className="summary-row">
                  <span>Végösszeg:</span>
                  <b className="summary-total">{formatFt(osszeg)} Ft</b>
                </div>

                <button className="checkout-btn">
                  Tovább a fizetéshez
                </button>

                <p className="summary-note">
                  A szállítási költség a pénztárnál kerül kiszámításra.
                </p>
              </div>
            </aside>
          </>
        ) : (
          <div className="cart-empty">
            <p>A kosár üres!</p>
            <a className="cart-back" href="/">
              Vissza a vásárláshoz
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
