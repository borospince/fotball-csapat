import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const tomb = JSON.parse(localStorage.getItem("kosar"));
    if (tomb) setCartItems(tomb);
    else setCartItems([]);
  }, []);

  const saveCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("kosar", JSON.stringify(newCart));
  };

  // ✅ egyszerű kosárba adás (készletlevonást NEM itt csináljuk, hanem ProductDetail-ben)
  const addToCart = (product, size, quantity = 1) => {
    const db = Number(quantity) || 1;

    const existing = cartItems.find(
      (item) => item._id === product._id && item.size === size
    );

    let ujKosar;

    if (existing) {
      ujKosar = cartItems.map((item) =>
        item._id === product._id && item.size === size
          ? { ...item, quantity: (item.quantity || 0) + db }
          : item
      );
    } else {
      ujKosar = [
        ...cartItems,
        {
          ...product,
          size,
          quantity: db,
        },
      ];
    }

    saveCart(ujKosar);
  };

  // ✅ TERMÉK TELJES TÖRLÉSE: visszaadjuk az összes darabot készletre
  const removeFromCart = async (id, size) => {
    const item = cartItems.find((x) => x._id === id && x.size === size);
    const qtyToReturn = Number(item?.quantity || 0);

    const ujKosar = cartItems.filter((x) => !(x._id === id && x.size === size));
    saveCart(ujKosar);

    if (qtyToReturn > 0) {
      try {
        await fetch(`http://localhost:3500/api/items-frontend/${id}/increase-stock`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: qtyToReturn }),
        });
      } catch (e) {
        console.log("Készlet visszaadás hiba:", e);
      }
    }
  };

  // ✅ + gomb a kosárban:
  // először levonunk 1-et készletből, ha sikerül → kosár mennyiség +1
  const increaseCartItem = async (id, size) => {
    const item = cartItems.find((x) => x._id === id && x.size === size);
    if (!item) return;

    try {
      const res = await fetch(`http://localhost:3500/api/items-frontend/${id}/decrease-stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.msg || "Nincs ennyi készleten!");
        return;
      }

      const ujKosar = cartItems.map((x) =>
        x._id === id && x.size === size
          ? { ...x, quantity: (x.quantity || 0) + 1 }
          : x
      );

      saveCart(ujKosar);
    } catch (e) {
      alert("Hálózati hiba!");
    }
  };

  // ✅ - gomb a kosárban:
  // kosár mennyiség -1, és visszaadunk 1-et készletre
  // ha 1 volt → törlés + visszaadás 1-re
  const decreaseCartItem = async (id, size) => {
    const item = cartItems.find((x) => x._id === id && x.size === size);
    if (!item) return;

    const currentQty = Number(item.quantity || 0);

    // ha 1 volt, akkor teljesen töröljük (removeFromCart már visszaadja az 1-et is)
    if (currentQty <= 1) {
      await removeFromCart(id, size);
      return;
    }

    // különben csökkentjük 1-gyel
    const ujKosar = cartItems.map((x) =>
      x._id === id && x.size === size ? { ...x, quantity: currentQty - 1 } : x
    );
    saveCart(ujKosar);

    // és visszaadunk 1-et készletre
    try {
      await fetch(`http://localhost:3500/api/items-frontend/${id}/increase-stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
      });
    } catch (e) {
      console.log("Készlet visszaadás hiba:", e);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.ar) || 0) * (Number(item.quantity) || 0),
    0
  );

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseCartItem,
        decreaseCartItem,
        totalPrice,
        totalCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
