import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // 👈 Importamos el contexto
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    usuarioEmail: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 usamos login del contexto

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

    // Validar las credenciales de los administradores
    if (
      (formData.usuarioEmail === "KarenDiaz" &&
        formData.password === "Diaz1234") ||
      (formData.usuarioEmail === "LuanaLopez" &&
        formData.password === "Lopez1234")
    ) {
      // Login como admin
      login({ email: formData.usuarioEmail }, "admin");
      alert("¡Bienvenido Administrador!");
      navigate("/admin"); // Redirigir al panel de administración
    } else {
      // Verificar usuario común
      login({ email: formData.usuarioEmail });
      alert("¡Bienvenido a Rellenitas! 🍪");
      navigate("/"); // Redirigir a la página principal
    }
  };

  return (
    <div className="login-page">
      <h2>Inicia sesión en Rellenitas</h2>

      <form
        onSubmit={handleSubmit}
        className="login-form"
        data-testid="login-form"
      >
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
  );
}
