import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { CartContext } from './kosar/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useContext(CartContext);

  // const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    const TermekLeker = async () => {
      const response = await fetch('http://localhost:3500/api/items-frontend');
      const adat = await response.json();

      const elem = adat.items.filter(elem => elem._id === id);

      if (response.ok) {
        console.log(elem[0]);
        if (elem[0].vAdatok.length > 0) setSizes(elem[0].vAdatok);
        else {
          let uresAdat = ['egy méret'];
          setSizes(uresAdat);
        }
        setProduct(elem[0]);
      } else {
        window.alert(adat.msg);
      }
    };

    TermekLeker();
  }, [id]);

  const kosarbaTesz = (termek, meret) => { 
    addToCart(termek, meret);
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

          {/* VÁSÁRLÁS */}
          <div className="pd-actions">
            <button
              className="pd-buy"
              disabled={ !selectedSize }
              onClick={() => kosarbaTesz(product, selectedSize)}
            >
              Vásárlás {selectedSize && `(${selectedSize})`}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
