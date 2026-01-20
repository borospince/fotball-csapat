import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { CartContext } from './kosar/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1); // <-- ÚJ: mennyiség (alapból 1)
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const TermekLeker = async () => {
      const response = await fetch('http://localhost:3500/api/items-frontend');
      const adat = await response.json();

      const elem = adat.items.filter(elem => elem._id === id);

      if (response.ok) {
        console.log(elem[0]);

        if (elem[0].vAdatok.length > 0) setSizes(elem[0].vAdatok);
        else setSizes(['egy méret']);

        setProduct(elem[0]);

        // ha új termékre váltasz, reseteljünk
        setSelectedSize('');
        setQuantity(1);
      } else {
        window.alert(adat.msg);
      }
    };

    TermekLeker();
  }, [id]);

  // <-- MÓDOSÍTVA: db paraméter is megy a kosárba
  const kosarbaTesz = (termek, meret, db) => {
    addToCart(termek, meret, db);
  };

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
            Készlet: {product.mennyiseg} {product.mennyisegEgyseg}
          </p>

          {/* MÉRET VÁLASZTÁS */}
          <div className="pd-sizes">
            <span>Méret:</span>
            <div className="pd-sizes-list">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* MENNYISÉG VÁLASZTÁS (1-5) */}
          <div className="pd-quantity">
            <label htmlFor="quantity">Mennyiség:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} db
                </option>
              ))}
            </select>
          </div>

          {/* VÁSÁRLÁS */}
          <div className="pd-actions">
            <button
              className="pd-buy"
              disabled={!selectedSize}
              onClick={() => kosarbaTesz(product, selectedSize, quantity)}
            >
              Vásárlás ({quantity} db{selectedSize && `, ${selectedSize}`})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
