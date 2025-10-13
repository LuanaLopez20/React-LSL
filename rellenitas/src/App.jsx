import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Rellenitas from "./Rellenitas";
import Pedido from "./Pedido";
import Carrito from "./Carrito";
import CarritoIcon from "./CarritoIcon";
import DescripcionK from "./descripcionesK";
import Contacto from "./Contacto";
import Registrate from "./Registrate";
import AdminLogin from "./AdminLogin"; // Login Admin
import AdminPanel from "./AdminPanel"; // Panel de administración
import { useAuth } from "./AuthContext";
import Checkout from "./Checkout";
import RecuperarCuenta from "./RecuperarCuenta";

function App() {
  const [cart, setCart] = useState([]);
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <div className="navbar-top">
          <div style={{ width: "200px" }}></div>
          <div style={{ width: "200px" }}>
            <h1>Rellenitas</h1>
          </div>

          <div className="navbar-right">
            {user ? (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "200px" }}>
                <div></div>
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
                {role === 'admin' && (
                  <Link to="/admin">
                    <button>Panel de Administración</button>
                  </Link>
                )}
                <CarritoIcon cart={cart} />
              </div>
            ) : (
              <div className="dropdown">
                <span>Mi cuenta ▾</span>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/registrate">Registrate</Link>
                  </li>
                  <li>
                    <Link to="/admin">Inicia sesión</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="navbar-bottom">
          <ul className="navbar-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/rellenitas">Nuestras Cookies</Link></li>
            <li><Link to="/pedido">Haz tu Pedido</Link></li>
            {role === 'admin' && <li><Link to="/admin">Panel de Administración</Link></li>}
          </ul>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/rellenitas" element={<Rellenitas />} />
        <Route path="/pedido" element={<Pedido cart={cart} setCart={setCart} />} />
        <Route path="/carrito" element={<Carrito cart={cart} setCart={setCart} />} />
        <Route path="/descripcion/:id" element={<DescripcionK />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registrate" element={<Registrate />} />
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
        <Route path="/perfil" element={<h2>Mi Perfil (datos e historial)</h2>} />
        <Route path="/checkout" element={<Checkout />} /> {/* Ruta para el proceso de pago */}
        <Route path="/admin" element={<AdminLogin/>} /> 
        <Route 
          path="/admin" 
          element={role === 'admin' ? <AdminPanel /> : <h2>No autorizado</h2>} 
        /> {/* Acceso restringido para admin */}
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <ul>
          <li><Link to="/contacto">Ubicación</Link></li>
          {!user && (
            <li className="dropdown-footer">
              Mi cuenta
              <ul className="dropdown-content-footer">
                <li><Link to="/registrate">Crea tu cuenta</Link></li>
              </ul>
            </li>
          )}
        </ul>
      </footer>
    </div>
  );
}

export default App;
