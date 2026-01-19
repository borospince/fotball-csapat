
import React from 'react';
import './Shop.css';
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Shop = (incoming) => {
  
  const props = incoming.props ?? incoming;
  const { item, index } = props;


  const productId = item?.id ?? index ?? '';

  return (
   
    <Link to={`/product/${item._id}`} className="shop-card-link" aria-label={`Megnyitás: ${item?.nev ?? 'termék'}`}>
      <article className="shop-card" tabIndex="0" aria-labelledby={`shop-nev-${productId}`}>
        <div className="shop-kep-kontener">
          <img src={item?.kep} alt={item?.nev ?? 'Termék kép'} className="shop-kep" />
          
          <><button className="cart-btn" aria-hidden="true" tabIndex="-1">
            <FaCartArrowDown />
          </button></>
        </div>

        <div className="shop-adatok">
          <h2 id={`shop-nev-${productId}`} className="shop-nev">{item?.nev}</h2>
          <p className="shop-termekleiras">Kategória: {item?.termekleiras}</p>
          <p className="shop-mennyisegEgyseg">{item?.mennyisegEgyseg}</p>

          <div className="shop-stats">
            <p className="shop-ar">Ár: <span className="ar-ertek">{item?.ar} Ft</span></p>
            <p className="shop-keszlet">Készlet: {item?.mennyiseg} db</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Shop;
