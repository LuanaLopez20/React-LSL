import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registrate.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // íconos para la contraseña

export default function Registrate() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Para manejar el estado de visibilidad de la contraseña
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = { nombre, usuario, email, password };

    // Guardar usuario en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(nuevoUsuario)); // lo loguea automáticamente

    navigate("/perfil"); // Redirigir al perfil
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Crear cuenta </h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {/* Contraseña con visibilidad toggle */}
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Registrarme </button>
        </form>

        <p className="register-login-msg">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
