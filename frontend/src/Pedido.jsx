import React from "react";
import "./Pedido.css";

// 1. Aceptamos la nueva prop: isLoggedIn
function Pedido({ cart, setCart, isLoggedIn }) { 
  const cookies = [
    {
      id: 1,
      name: "COOKIE DE CHOCOLATE",
      price: 1500,
      img: "/cookie-chocolate.jpg",
    },
    { id: 2, name: "COOKIE OREO", price: 1500, img: "/cookie-oreo.jpg" },
    { id: 3, name: "COOKIE DE FRUTA", price: 1500, img: "/cookie-fruta.jpg" },
    { id: 4, name: "COOKIE AVENA", price: 1500, img: "/cookie-avena.jpg" },
    {
      id: 5,
      name: "COOKIE VAINILLA",
      price: 1500,
      img: "/cookie-vainilla.jpg",
    },
  ];

  const addToCart = (cookie) => {
    // 2. Implementamos la verificación de sesión
    if (isLoggedIn) {
      setCart([...cart, cookie]);
      alert(`¡"${cookie.name}" agregado al carrito! 🛒`);
    } else {
      // 3. Mostramos el mensaje de error si no ha iniciado sesión
      alert("Necesitas iniciar sesión o crear una cuenta para agregar productos al carrito.");
    }
  };

  return (
    <div className="pedido-page">
      <h3>HACE TU PEDIDO</h3>

      <div className="cookies-grid">
        {cookies.map((cookie) => (
          <div key={cookie.id} className="cookie-card">
            <img src={cookie.img} alt={cookie.name} />
            <p>{cookie.name}</p>
            <p>${cookie.price}</p>
            <button onClick={() => addToCart(cookie)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedido;