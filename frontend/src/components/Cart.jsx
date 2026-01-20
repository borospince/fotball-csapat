import { useContext, useEffect, useState } from 'react'
import { CartContext } from './kosar/CartContext';

const Cart = () => {
	const [items, setItems] = useState([]);
	const { cartItems, removeFromCart,  totalPrice, totalCount} = useContext(CartContext);

	useEffect(() => {
		const tomb = JSON.parse(localStorage.getItem('kosar'));
		
		cartItems && cartItems.length > 0 ? setItems(cartItems) : setItems(tomb);
	}, []);

	const eltavolitas = (id, size) => {
		removeFromCart(id, size);
		window.location.href = '/cart';
	};
	
  return (
	  <div style={{marginTop: '5em'}}>
		  {items && items.length > 0 ? items.map(elem => (
			  <div key={ elem._id }>
				  <p>Leírás: { elem.nev }</p>
				  <img src={elem.kep} alt="" />
				  <button onClick={() => eltavolitas(elem._id, elem.size)}>Termék eltávolítása</button>
			  </div>
		  )) : <>
				  <p style={{marginTop: '5em'}}>A kosár üres!</p>
		  </> }
	</div>
  )
}

export default Cart;