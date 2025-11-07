import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import "./Carrito.css";

function Carrito({ cart, setCart }) {
  const navigate = useNavigate(); // Inicializa el hook para la navegación
  // Agrupar cookies por ID y contar cantidad
  const groupedCart = cart.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1; // Asegurarse de incrementar la cantidad correctamente
    } else {
      acc[item.id] = { ...item, quantity: 1 }; // Si es nuevo, asigna cantidad 1
    }
    return acc;
  }, {});

  // Estado para código postal y costo de envío
  const [codigoPostal, setCodigoPostal] = useState("");
  const [envio, setEnvio] = useState(0); // Costo de envío

  // Función para manejar el cambio del código postal
  const handleCodigoPostalChange = (newCodigoPostal) => {
    setCodigoPostal(newCodigoPostal);
    calcularCostoEnvio(newCodigoPostal);
  };

  // Función para calcular el costo de envío dependiendo del código postal
  const calcularCostoEnvio = (codigo) => {
    if (codigo === "1234") {
      setEnvio(500); // Costo de envío para el código postal 1234
    } else if (codigo === "5678") {
      setEnvio(800); // Costo de envío para el código postal 5678
    } else {
      setEnvio(1000); // Costo de envío para otros códigos postales
    }
  };

  // Agregar una unidad
  const addOne = (cookie) => {
    setCart([...cart, cookie]); // Se agrega la cookie al carrito
  };

  // Eliminar una unidad
  const removeOne = (cookieId) => {
    const index = cart.findIndex((item) => item.id === cookieId);
    if (index === -1) return; // No existe el producto
    const newCart = [...cart];
    newCart.splice(index, 1); // Elimina solo una instancia
    setCart(newCart);
  };

  // Eliminar todas las unidades
  const removeAll = (cookieId) => {
    setCart(cart.filter((item) => item.id !== cookieId)); // Elimina todas las unidades de un producto
  };

  // Calcular el total, asegurando que `price` y `quantity` son números
  const total = Object.values(groupedCart).reduce((sum, item) => {
    const price = Number(item.price) || 0; // Convierte price a número si no lo es
    const quantity = Number(item.quantity) || 0; // Convierte quantity a número si no lo es
    return sum + price * quantity; // Calcula el total correctamente
  }, 0);

  // Función para proceder al pago
  const handleProceedToPayment = () => {
    navigate("/checkout"); // Redirige a la página de Checkout
  };

  return (
    <div className="carrito-page">
      <h3>TU CARRITO</h3>

      {/* Verifica si el carrito está vacío */}
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-row">
          {/* Muestra los productos agrupados */}
          {Object.values(groupedCart).map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.img} alt={item.name} />
              <div className="cart-details">
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price * item.quantity}</p>{" "}
                {/* Calcula correctamente el precio total del producto */}
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

      {/* Mostrar el subtotal */}
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
