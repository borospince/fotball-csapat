import { createContext, useContext, useState } from "react";
import { useCart } from "../context/CartContext";

const { addToCart } = useCart();

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const existing = cartItems.find(
      item => item._id === product._id && item.size === size
    );

    if (existing) {
      setCartItems(
        cartItems.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          size,
          quantity: 1
        }
      ]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item._id === id && item.size === size)));
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
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
