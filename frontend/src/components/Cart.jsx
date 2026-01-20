import { useContext, useEffect, useState } from 'react';
import { CartContext } from './kosar/CartContext';
import './Cart.css';

const Cart = () => {
	const [items, setItems] = useState([]);
	const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

	useEffect(() => {
		const tomb = JSON.parse(localStorage.getItem('kosar'));

		cartItems && cartItems.length > 0 ? setItems(cartItems) : setItems(tomb);
	}, [cartItems]);
	
  return (
	  <div className="cart-container">
      <h1>Kosár</h1>
		  {items && items.length > 0 ? items.map(elem => (
			  <div className="cart-item" key={`${elem._id}-${elem.size}`}>
				  <img src={elem.kep} alt={elem.nev} />
          <div className="cart-item-info">
            <h3>{elem.nev}</h3>
            <p>Méret: {elem.size}</p>
            <label className="cart-quantity" htmlFor={`quantity-${elem._id}-${elem.size}`}>
              Mennyiség
              <select
                id={`quantity-${elem._id}-${elem.size}`}
                value={elem.quantity}
                onChange={(event) => updateQuantity(elem._id, elem.size, event.target.value)}
              >
                {Array.from(
                  { length: Math.max(1, elem.mennyiseg ?? 99) },
                  (_, index) => index + 1
                ).map(optionValue => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className="remove-btn"
            type="button"
            onClick={() => removeFromCart(elem._id, elem.size)}
            aria-label={`Törlés: ${elem.nev}`}
          >
            ×
          </button>
			  </div>
		  )) : (
				  <p style={{marginTop: '5em'}}>A kosár üres!</p>
		  )}
	</div>
  )
}

export default Cart;
