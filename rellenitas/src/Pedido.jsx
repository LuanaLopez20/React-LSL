import React from "react";

function Pedido({ cart, setCart }) {
  const cookies = [
    { id: 1, name: "COOKIE DE CHOCOLATE", price: 150, img: "/cookie-chocolate.jpg" },
    { id: 2, name: "COOKIE OREO", price: 170, img: "/cookie-oreo.jpg" },
    { id: 3, name: "COOKIE DE FRUTA", price: 160, img: "/cookie-fruta.jpg" },
    { id: 4, name: "COOKIE AVENA", price: 170, img: "/cookie-avena.jpg" },
    { id: 5, name: "COOKIE VAINILLA", price: 160, img: "/cookie-vainilla.jpg" }
  ];

  const addToCart = (cookie) => {
    setCart([...cart, cookie]);
  };

  return (
    <div className="pedido-page">
      <h3>Hacé tu pedido</h3>

      <div className="cookies-grid">
        {cookies.map((cookie) => (
          <div key={cookie.id} className="cookie-card">
            <img src={cookie.img} alt={cookie.name} />
            <p>{cookie.name}</p>
            <p>${cookie.price}</p>
            <button onClick={() => addToCart(cookie)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <div className="carrito">
        <h4>Carrito de compras</h4>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Pedido;
