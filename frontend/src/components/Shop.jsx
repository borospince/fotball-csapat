import './Shop.css';

const Shop = ({ shop }) => {
  return (
    <div className="shop-card">
      <div className="shop-kep-kontener">
        <img src={shop.kep} alt={shop.nev} />
      </div>

      <div className="shop-adatok">
        <h2 className="shop-nev">{shop.nev}</h2>
        <p className="shop-termekleiras">Kategória: {shop.termekleiras}</p>
        <p className="shop-mennyisegEgyseg">{shop.mennyisegEgyseg}</p>
        <p className="shop-kep">{shop.kep}</p>

        <div className="shop-stats">
          <p>Ár: {shop.ar} Ft</p>
          <p>Készlet: {shop.mennyiseg} db</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
