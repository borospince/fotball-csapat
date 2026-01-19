import { useContext, useEffect, useState } from 'react'
import { CartContext } from './kosar/CartContext';

const Cart = () => {
	const [items, setItems] = useState([]);
	const { cartItems } = useContext(CartContext);

	useEffect(() => {
		const tomb = JSON.parse(localStorage.getItem('kosar'));
		
		cartItems && cartItems.length > 0 ? setItems(cartItems) : setItems(tomb);
	}, []);
	
  return (
	  <div style={{marginTop: '5em'}}>
		  {items ? items.map(elem => (
			  <div key={ elem._id }>
				  <p>Leírás: { elem.nev }</p>
				  <img src={elem.kep} alt="" />
			  </div>
		  )) : <>
				  <p style={{marginTop: '5em'}}>A kosár üres!</p>
		  </> }
	</div>
  )
}

export default Cart;