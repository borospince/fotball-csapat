import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { CartContext } from "./kosar/CartContext";
import { useT } from "../i18n/LanguageContext.jsx";

export default function ProductDetail() {
  const t = useT();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const TermekLeker = async () => {
      const response = await fetch("http://localhost:3500/api/items-frontend");
      const adat = await response.json();

      const elem = adat.items.filter((elem) => elem._id === id);

      if (response.ok) {
        if (elem[0]?.vAdatok?.length > 0) setSizes(elem[0].vAdatok);
        else setSizes([t("productOneSize")]);

        setProduct(elem[0] || {});

        setSelectedSize("");
        setQuantity(1);
      } else {
        window.alert(adat.msg);
      }
    };

    TermekLeker();
  }, [id]);

  const kosarbaTesz = async (termek, meret, db) => {
    try {
      const res = await fetch(
        `http://localhost:3500/api/items-frontend/${termek._id}/decrease-stock`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: db }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.msg || t("productStockError"));
        return;
      }

      addToCart(termek, meret, db);
      setProduct((prev) => ({ ...prev, mennyiseg: data.mennyiseg }));
    } catch (e) {
      alert(t("productNetworkError"));
    }
  };

  const maxQty = Math.min(5, Number(product?.mennyiseg || 0));

  return (
    <div className="pd-page">
      <div className="pd-wrap">
        <div className="pd-image-wrap">
          <img className="pd-image" src={product.kep} alt={product.nev} />
        </div>

        <aside className="pd-info">
          <h1 className="pd-title">{product.nev}</h1>
          <p className="pd-price">{product.ar} Ft</p>
          <p className="pd-stock">
            {t("productStock")}: {product.mennyiseg}
          </p>

          <div className="pd-sizes">
            <span>{t("productSize")}:</span>
            <div className="pd-sizes-list">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-quantity">
            <label htmlFor="quantity">{t("productQty")}:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={maxQty <= 0}
            >
              {maxQty > 0 ? (
                Array.from({ length: maxQty }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {t("unitPiece")}
                  </option>
                ))
              ) : (
                <option value={0}>{t("productNoStock")}</option>
              )}
            </select>
          </div>

          <div className="pd-actions">
            <button
              className="pd-buy"
              disabled={!selectedSize || maxQty <= 0}
              onClick={() => kosarbaTesz(product, selectedSize, quantity)}
            >
              {t("productBuy")} ({quantity} {t("unitPiece")}
              {selectedSize && `, ${selectedSize}`})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
