import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function RecuperarCuenta() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMensaje("Por favor ingresa tu Gmail");
      return;
    }

    setMensaje(
      "Te enviamos un código para que puedas restablecer tu contraseña."
    );

    setTimeout(() => navigate("/login"), 4000);
  };

  return (
    <div className="login-page">
      <h2>Recuperar cuenta</h2>
      <p>Ingresa tu Gmail para recibir el código de recuperación:</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Tu Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Enviar código</button>

        {mensaje && <p className="success-msg">{mensaje}</p>}
      </form>
    </div>
  );
}
