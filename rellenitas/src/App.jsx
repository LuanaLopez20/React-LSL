import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Rellenitas from "./Rellenitas";
import Pedido from "./Pedido";
import Carrito from "./Carrito";
import CarritoIcon from "./CarritoIcon";
import DescripcionK from "./descripcionesK";
import Registrate from "./Registrate";
import Login from "./Login";
import RecuperarCuenta from "./RecuperarCuenta";
import { useAuth } from "./AuthContext";

// Componente de Ubicación
function Contacto() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Ubicación</h2>
      <p>Aquí puedes poner tu ubicación y una foto del lugar.</p>
      <img
        src="/ubicacion.jpg"
        alt="Ubicación"
        style={{ maxWidth: "400px", width: "100%", marginTop: "20px" }}
      />
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        {/* Fila 1: Título + Carrito + Cuenta */}
        <div className="navbar-top">
          <h1>Rellenitas</h1>

          <div className="navbar-right">
            {/* Mi cuenta primero */}
            {user ? (
              <div className="dropdown user-menu">
                <span>Mi cuenta ▾</span>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/perfil">Mi perfil</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Cerrar sesión</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <span>Mi cuenta ▾</span>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/registrate">Registrate</Link>
                  </li>
                  <li>
                    <Link to="/login">Inicia sesión</Link>
                  </li>
                </ul>
              </div>
            )}

            {/* Carrito después */}
            <CarritoIcon cart={cart} />
          </div>
        </div>

        {/* Fila 2: Links centrados (sin cambios) */}
        <div className="navbar-bottom">
          <ul className="navbar-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/rellenitas">Nuestras Cookies</Link>
            </li>
            <li>
              <Link to="/pedido">Haz tu Pedido</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
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
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registrate" element={<Registrate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
        <Route path="/perfil" element={<h2>Mi Perfil (datos e historial)</h2>} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <ul>
          <li>
            <Link to="/contacto">Ubicación</Link>
          </li>
          {!user && (
            <li className="dropdown-footer">
              Mi cuenta
              <ul className="dropdown-content-footer">
                <li>
                  <Link to="/registrate">Crea tu cuenta</Link>
                </li>
                <li>
                  <Link to="/login">Inicia sesión</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </footer>
    </div>
  );
}

export default App;
