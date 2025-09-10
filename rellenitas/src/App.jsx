import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";        
import Rellenitas from "./Rellenitas";
import Pedido from "./Pedido"; 

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Las mejores galletitas.</h1>
        <ul>
          <li><Link to="/">Página principal</Link></li>
          <li><Link to="/rellenitas">Rellenitas</Link></li>
          <li><Link to="/pedido">Hace tu pedido</Link></li>
        </ul>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/rellenitas" element={<Rellenitas cart={cart} setCart={setCart} />} />
        <Route path="/pedido" element={<Pedido cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}


export default App;
