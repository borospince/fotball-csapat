import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Product.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    const TermekLeker = async () => {
      const response = await fetch('http://localhost:3500/api/items-frontend');
      const adat = await response.json();

      const elem = adat.items.filter(elem => elem._id === id);

      if (response.ok) {
        setProduct(elem[0]);
      } else {
        window.alert(adat.msg);
      }
    };

    TermekLeker();
  }, [id]);

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
              disabled={!selectedSize}
            >
              Vásárlás {selectedSize && `(${selectedSize})`}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
