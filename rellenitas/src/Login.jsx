import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    usuarioEmail: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.usuarioEmail || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Simulamos un objeto usuario que normalmente vendría del backend
    const usuarioMock = {
      nombre: formData.usuarioEmail, // uso el email como nombre temporal
      historial: ["Compra 1", "Compra 2"], // ejemplo de historial
    };

    // Guardamos el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(usuarioMock));

    // Hacemos login en el contexto (si tu login necesita algo más ajusta aquí)
    login({ email: formData.usuarioEmail });

    alert("¡Bienvenido a Rellenitas! 🍪");
    navigate("/");
  };

  return (
    <div className="login-page">
      <h2>Inicia sesión en Rellenitas 🍪</h2>

      {/* 🔹 SOLO el formulario dentro del recuadro */}
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="usuarioEmail"
            placeholder="Usuario o Gmail"
            value={formData.usuarioEmail}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Link to="/recuperar-cuenta" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Inicia sesión</button>

          <p className="login-register-msg">
            ¿No tenés cuenta todavía? <Link to="/registrate">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
