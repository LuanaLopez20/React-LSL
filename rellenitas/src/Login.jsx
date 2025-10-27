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
    const { usuarioEmail, password } = formData;

    if (!usuarioEmail || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    // 🔹 Recuperamos los usuarios registrados desde localStorage
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // 🔹 Buscar usuario por nombre de usuario o email (ahora sí coincide con Registrate.jsx)
    const foundUser = users.find(
      (u) =>
        u.usuario.toLowerCase() === usuarioEmail.toLowerCase() ||
        u.email.toLowerCase() === usuarioEmail.toLowerCase()
    );

    if (!foundUser) {
      setError("No tienes una cuenta creada");
      return;
    }

    if (foundUser.password !== password) {
      setError("Contraseña incorrecta");
      return;
    }

    // 🔹 Si todo está bien, iniciar sesión
    const usuarioData = {
      nombre: foundUser.nombre,
      usuario: foundUser.usuario,
      email: foundUser.email,
      historial: foundUser.historial || [],
    };

    localStorage.setItem("user", JSON.stringify(usuarioData));
    login({ email: foundUser.email });

    alert("¡Bienvenido a Rellenitas! 🍪");
    navigate("/");
  };

  return (
    <div className="login-page">
      <h2>Inicia sesión en Rellenitas 🍪</h2>

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
