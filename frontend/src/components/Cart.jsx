import { useContext } from "react";
import { CartContext } from "./kosar/CartContext";
import "./Cart.css";
import { useT } from "../i18n/LanguageContext.jsx";

const Cart = () => {
  const t = useT();
  const {
    cartItems,
    removeFromCart,
    increaseCartItem,
    decreaseCartItem,
    totalPrice,
    totalCount,
  } = useContext(CartContext);

  const formatFt = (n) => (Number(n) || 0).toLocaleString("hu-HU");

  const fizetes = async () => {
    if (cartItems.length === 0) {
      alert(t("cartEmpty"));
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3500/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.url) {
        window.location.href = data.url;
        localStorage.setItem("url", data.url);
      } else {
      console.error("No URL returned from server.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h1>{t("cartTitle")}</h1>
          <p className="cart-subtitle">
            {totalCount
              ? `${totalCount} ${t("cartItems")}`
              : t("cartEmpty")}
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
                          {t("cartSize")}: <b>{elem.size}</b>
                        </p>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(elem._id, elem.size)}
                        title={t("cartRemove")}
                      >
                        âś•
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-price">
                        <span>{t("cartUnitPrice")}:</span>
                        <b>{formatFt(elem.ar)} Ft</b>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() => decreaseCartItem(elem._id, elem.size)}
                        aria-label={t("cartDecrease")}
                        >
                          â’
                        </button>
                        <span>{elem.quantity}</span>
                        <button
                          onClick={() => increaseCartItem(elem._id, elem.size)}
                          aria-label={t("cartIncrease")}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-line-total">
                        <span>{t("cartLineTotal")}:</span>
                        <b>
                          {formatFt(
                            (elem.ar || 0) * (elem.quantity || 0)
                          )}{" "}
                          Ft
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <div className="summary-card">
                <div className="summary-row">
                  <span>{t("cartTotalItems")}:</span>
                  <b>{totalCount} db</b>
                </div>
                <div className="summary-row">
                  <span>{t("cartTotal")}:</span>
                  <b className="summary-total">{formatFt(totalPrice)} Ft</b>
                </div>

                <button className="checkout-btn" onClick={fizetes}>
                  {t("cartCheckout")}
                </button>
                <p className="summary-note">{t("cartShippingNote")}</p>
              </div>
            </aside>
          </>
        ) : (
          <div className="cart-empty">
            <p>{t("cartEmpty")}!</p>
            <a className="cart-back" href="/shops">
              {t("cartBackShop")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
