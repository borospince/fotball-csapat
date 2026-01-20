import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const tomb = JSON.parse(localStorage.getItem("kosar"));
    if (tomb) setCartItems(tomb);
    else setCartItems([]);
  }, []);

  // ✅ MÓDOSÍTVA: addToCart már fogad mennyiséget is (db)
  // Használat: addToCart(product, size, quantity)
  const addToCart = (product, size, quantity = 1) => {
    const db = Number(quantity) || 1;

    const existing = cartItems.find(
      (item) => item._id === product._id && item.size === size
    );

    let ujKosar;

    if (existing) {
      // ✅ Ha már létezik ugyanaz a termék+méret, növeljük a mennyiséget db-vel
      ujKosar = cartItems.map((item) =>
        item._id === product._id && item.size === size
          ? { ...item, quantity: (item.quantity || 0) + db }
          : item
      );
    } else {
      // ✅ Új tétel beszúrása db mennyiséggel
      ujKosar = [
        ...cartItems,
        {
          ...product,
          size,
          quantity: db,
        },
      ];
    }

    setCartItems(ujKosar);
    localStorage.setItem("kosar", JSON.stringify(ujKosar));
  };

  const removeFromCart = (id, size) => {
    const tomb = cartItems.filter(
      (item) => !(item._id === id && item.size === size)
    );
    setCartItems(tomb);
    localStorage.setItem("kosar", JSON.stringify(tomb));
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
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalPrice,
        totalCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
