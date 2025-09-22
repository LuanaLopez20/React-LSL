import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Rellenitas from "./Rellenitas";
import Pedido from "./Pedido";
import Carrito from "./Carrito";
import CarritoIcon from "./CarritoIcon";
import DescripcionK from "./descripcionesK";
import Contacto from "./Contacto";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Rellenitas</h1>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/rellenitas">Nuestras Cookies</Link>
          </li>
          <li>
            <Link to="/pedido">Hace tu Pedido</Link>
          </li>
        </ul>
      </nav>

      {/* Ícono del carrito fijo arriba a la derecha */}
      <CarritoIcon cart={cart} />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rellenitas" element={<Rellenitas />} />
        <Route
          path="/pedido"
          element={<Pedido cart={cart} setCart={setCart} />}
        />
        <Route
          path="/carrito"
          element={<Carrito cart={cart} setCart={setCart} />}
        />
        <Route path="/descripcion/:id" element={<DescripcionK />} />
        <Route path="/contacto" element={<Contacto />} /> {/* Nueva ruta */}
      </Routes>
    </div>
  );
}

export default App;
