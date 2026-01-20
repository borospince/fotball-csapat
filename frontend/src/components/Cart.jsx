import { useContext, useEffect, useState } from 'react';
import { CartContext } from './kosar/CartContext';
import './Cart.css';

const Cart = () => {
	const [items, setItems] = useState([]);
	const { cartItems } = useContext(CartContext);

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
            <p>Mennyiség: {elem.quantity} db</p>
          </div>
			  </div>
		  )) : (
				  <p style={{marginTop: '5em'}}>A kosár üres!</p>
		  )}
	</div>
  )
}

export default Cart;
