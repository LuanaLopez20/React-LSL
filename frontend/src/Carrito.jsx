import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

function Carrito({ cart, setCart }) {
  const navigate = useNavigate();
  // Agrupar cookies por ID y contar cantidad
  const groupedCart = cart.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1;
    } else {
      acc[item.id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  const [codigoPostal, setCodigoPostal] = useState("");
  const [envio, setEnvio] = useState(0);

  const handleCodigoPostalChange = (newCodigoPostal) => {
    setCodigoPostal(newCodigoPostal);
    calcularCostoEnvio(newCodigoPostal);
  };

  const calcularCostoEnvio = (codigo) => {
    if (codigo === "1234") {
      setEnvio(500);
    } else if (codigo === "5678") {
      setEnvio(800);
    } else {
      setEnvio(1000);
    }
  };

  const addOne = (cookie) => {
    setCart([...cart, cookie]);
  };

  const removeOne = (cookieId) => {
    const index = cart.findIndex((item) => item.id === cookieId);
    if (index === -1) return;
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const removeAll = (cookieId) => {
    setCart(cart.filter((item) => item.id !== cookieId));
  };

  const total = Object.values(groupedCart).reduce((sum, item) => {
    const price = Number(item.price) || 0; // Convierte price a número si no lo es
    const quantity = Number(item.quantity) || 0; // Convierte quantity a número si no lo es
    return sum + price * quantity;
  }, 0);

  const handleProceedToPayment = () => {
    navigate("/checkout");
  };

  return (
    <div className="carrito-page">
      <h3>TU CARRITO</h3>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-row">
          {Object.values(groupedCart).map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.img} alt={item.name} />
              <div className="cart-details">
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price * item.quantity}</p>{" "}
              </div>
              <div className="cart-buttons">
                <button onClick={() => addOne(item)}>➕</button>
                <button onClick={() => removeOne(item.id)}>➖</button>
                <button
                  className="delete-btn"
                  onClick={() => removeAll(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="total">Subtotal (sin envio): ${total}</p>
      {cart.length > 0 && (
        <button className="checkout-btn" onClick={handleProceedToPayment}>
          Proceder al pago
        </button>
      )}
    </div>
  );
}

export default Carrito;
