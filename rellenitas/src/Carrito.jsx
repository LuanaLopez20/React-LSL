import React from "react";
import "./Carrito.css";

function Carrito({ cart, setCart }) {
  // Agrupar cookies por ID y contar cantidad
  const groupedCart = cart.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1;
    } else {
      acc[item.id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // Agregar una unidad
  const addOne = (cookie) => {
    setCart([...cart, cookie]);
  };

  // Eliminar una unidad
  const removeOne = (cookieId) => {
    const index = cart.findIndex((item) => item.id === cookieId);
    if (index === -1) return; // nada que eliminar
    const newCart = [...cart];
    newCart.splice(index, 1); // elimina solo una instancia
    setCart(newCart);
  };

  // Eliminar todas las unidades
  const removeAll = (cookieId) => {
    setCart(cart.filter((item) => item.id !== cookieId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="carrito-page">
      <h3>Tu carrito</h3>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-row">
          {Object.values(groupedCart).map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price * item.quantity}</p>
              <div className="cart-buttons">
                <button onClick={() => addOne(item)}>➕</button>
                <button onClick={() => removeOne(item.id)}>➖</button>
                <button onClick={() => removeAll(item.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="total">Total: ${total}</p>
    </div>
  );
}

export default Carrito;
