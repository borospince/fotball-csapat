import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Product.css';

// ProductDetail - styles moved to ProductDetail.css
// Usage:
// - Route: <Route path="/product/:id" element={<ProductDetail />} />
// - Or: <ProductDetail product={productObject} /> to pass product directly

export default function ProductDetail() {
  const { id } = useParams();

  // demo fallback product (if you don't pass one or don't have backend yet)
  // const demoProduct = {
  //   id: idFromRoute ?? 'demo-1',
  //   nev: 'Minta Termék',
  //   kep: 'https://via.placeholder.com/800x800.png?text=Term%C3%A9k',
  //   termekleiras: 'Kiváló minőségű minta termék. Részletes leírás itt.',
  //   mennyisegEgyseg: '1 db',
  //   ar: 8990,
  //   mennyiseg: 12
  // };

  // const product = incomingProduct ?? demoProduct;

  // const sizes = ['XS','S','M','L','XL'];
  // const [selectedSize, setSelectedSize] = useState(sizes[1]); // alap S
 const [product, setProduct] = useState({});

  
    useEffect(() => {
        const TermekLeker = async () => {
            const response = await fetch('http://localhost:3500/api/items-frontend');
            const adat = await response.json();
            console.log(adat);
            
            const elem = adat.items.filter(elem => elem._id === id);
            console.log(elem);

            if (response.ok) {
                setProduct(elem[0]);
            } else {
                window.alert(adat.msg);
            }
        };

        TermekLeker();
    }, []);
  

  // small effect: when product changes, reset size
  // useEffect(() => setSelectedSize(sizes[1]), [product.id]);

  // function addToCart(e) {
  //   e.preventDefault();
  //   // itt tedd be a kosár logikát (context / redux / api call)
  //   alert(`${product.nev} (${selectedSize}) hozzáadva a kosárhoz`);
  // }

  return (
    <div className="pd-page">
      {/* <img src={product.kep} alt="" /> */}
      <div className="pd-wrap" role="main" aria-labelledby="pd-title">
        <div className="pd-image-wrap">
          <div className="pd-image-frame">
            <img className="pd-image" src={product.kep} alt={product.nev} />
          </div>
        </div>

        <aside className="pd-info">
          <h1 id="pd-title" className="pd-title">{product.nev}</h1>
          <p className="pd-cat">Kategória: {product.termekleiras}</p>
          <p className="pd-price">{product.ar} Ft</p>
          <p className="pd-stock">Készlet: {product.mennyiseg} db • Egység: {product.mennyisegEgyseg}</p>
          <p className="pd-desc">{product.termekleiras || 'Részletes termékleírás itt. Adatok és jellemzők.'}</p>

          <div className="pd-sizes">
            <div className="pd-sizes-label">Méret</div>
            {/* <div className="pd-sizes-list" role="list">
              {product.vAdatok.map(sz => (
                
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`pd-size-btn ${selectedSize === sz ? 'active' : ''}`}
                  aria-pressed={selectedSize === sz}
                >
                  {sz}
                </button>
              ))}
            </div> */}
          </div>

          <div className="pd-actions">
            {/* <button className="pd-add" onClick={addToCart}>Kosárba ({selectedSize})</button> */}
            <Link to="/" className="pd-buy">Vásárlás</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
