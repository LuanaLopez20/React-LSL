import React from "react";
import { useAuth } from "./AuthContext";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) {
    return <h2>No has iniciado sesión</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Mi perfil</h2>
      <p>
        <b>Usuario:</b> {user.nombre}
      </p>
      <h3>Historial de compras</h3>
      <ul>
        {user.historial.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
