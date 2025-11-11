import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 agregamos useNavigate
import "./Registrate.css";

export default function Registrate() {
  const navigate = useNavigate(); // 👈 para redirigir
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Simulación de usuarios ya registrados
  const usuariosRegistrados = ["juan123", "maria456", "carlos789"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // limpiar error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: usuario ya registrado
    if (usuariosRegistrados.includes(formData.usuario.toLowerCase())) {
      setError("Ese usuario ya está ocupado ");
      return;
    }

    // Simulamos registro exitoso
    console.log("Datos enviados:", formData);
    alert("¡Te registraste en Rellenitas! 🎉🍪");

    // Redirigir a Home con mensaje de bienvenida
    navigate("/", { state: { usuario: formData.usuario } });

    setFormData({ nombre: "", usuario: "", email: "", password: "" });
  };

  return (
    <div className="rln-page">
      <h2 className="rln-title">Regístrate en Rellenitas 🍪</h2>
      <p className="rln-desc">
        Creá tu cuenta y sé parte de nuestra comunidad para participar en
        sorteos, recibir sorpresas y mucho más.
      </p>

      <form onSubmit={handleSubmit} className="rln-form">
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="usuario"
          placeholder="Crea tu usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <button type="submit">Registrarme</button>

        {/* Mensaje de login */}
        <p className="rln-login-msg">
          ¿Ya estás registrado? Inicia sesión con tu{" "}
          <Link to="/AdminLogin">Gmail o usuario y contraseña</Link>.
        </p>
      </form>
    </div>
  );
}
