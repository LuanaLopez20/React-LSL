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

  const agregarAlCarrito = (cookie) => {
    if (isLoggedIn) {
      setCart([...cart, cookie]);
    } else {
      alert(
        "Necesitas iniciar sesión o crear una cuenta para agregar productos al carrito."
      );
    }
  };

  return (
    <div className="pedido">
      <h1>Elige tu Cookie</h1>
      <div className="cookies-list">
        {cookies.map((cookie) => (
          <div key={cookie.id} className="cookie">
            <img src={cookie.img} alt={cookie.name} />
            <h3>{cookie.name}</h3>
            <p>Precio: ${cookie.price}</p>
            <button onClick={() => agregarAlCarrito(cookie)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedido;
