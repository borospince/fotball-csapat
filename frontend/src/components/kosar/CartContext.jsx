import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => { 
    const tomb = JSON.parse(localStorage.getItem('kosar'));
    console.log(tomb);
    
    if (tomb) setCartItems(tomb);
    else setCartItems([]);
  }, []);
  
  const addToCart = (product, size) => {
    const existing = cartItems.find(
      item => item._id === product._id && item.size === size
    );

    if (existing) {
      let tombi = cartItems.map(item =>
        item === existing
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ); 
      setCartItems(tombi);
      localStorage.setItem('kosar', JSON.stringify(tombi));
    } else {
      let tomb = [
        ...cartItems,
        {
          ...product,
          size,
          quantity: 1
        }
      ];
      setCartItems(tomb);
      localStorage.setItem('kosar', JSON.stringify(tomb));
    }
  };
  
  const removeFromCart = (id, size) => {
    const tomb = cartItems.filter(item => !(item._id === id && item.size === size));
    setCartItems(tomb);
    localStorage.setItem('kosar', JSON.stringify(tomb));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.ar * item.quantity,
    0
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      totalPrice,
      totalCount
    }}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
