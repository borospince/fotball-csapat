import React, { useState } from "react";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Termék 1",
      price: 4990,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Termék 2",
      price: 2990,
      quantity: 2,
      image: "https://via.placeholder.com/100"
    }
  ]);

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Kosár</h1>

      {cartItems.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString()} Ft</p>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Összesen: {totalPrice.toLocaleString()} Ft</h2>
            <button className="checkout-btn">Tovább a fizetéshez</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
