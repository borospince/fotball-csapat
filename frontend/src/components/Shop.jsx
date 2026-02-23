import React from "react";
import "./Shop.css";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useT } from "../i18n/LanguageContext.jsx";

const Shop = (incoming) => {
  const t = useT();
  const props = incoming.props ?? incoming;
  const { item, index } = props;

  const productId = item?.id ?? index ?? "";

  return (
    <Link
      to={`/product/${item._id}`}
      className="shop-card-link"
      aria-label={`${t("shopOpen")}: ${item?.nev ?? t("shopProduct")}`}
    >
      <article
        className="shop-card"
        tabIndex="0"
        aria-labelledby={`shop-nev-${productId}`}
      >
        <div className="shop-kep-kontener">
          <img
            src={item?.kep}
            alt={item?.nev ?? t("shopProductImage")}
            className="shop-kep"
          />

          <button className="cart-btn" aria-hidden="true" tabIndex="-1">
            <FaCartArrowDown />
          </button>
        </div>

        <div className="shop-adatok">
          <h2 id={`shop-nev-${productId}`} className="shop-nev">
            {item?.nev}
          </h2>
          <p className="shop-termekleiras">
            {t("shopCategory")}: {item?.termekleiras}
          </p>
          <p className="shop-mennyisegEgyseg">{item?.mennyisegEgyseg}</p>

          <div className="shop-stats">
            <p className="shop-ar">
              {t("shopPrice")}:{" "}
              <span className="ar-ertek">{item?.ar} Ft</span>
            </p>
            <p className="shop-keszlet">
              {t("shopStock")}: {item?.mennyiseg} db
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Shop;
