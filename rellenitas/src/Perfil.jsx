import React, { useEffect, useState } from "react";
import "./Perfil.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser raw:", storedUser);
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUsuario(null);
      }
    }
  }, []);

  if (!usuario) {
    return <h2 className="no-login">No has iniciado sesión</h2>;
  }

  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">Mi perfil (datos e historial)</h2>
      <p className="perfil-dato">
        <strong>Usuario:</strong> {usuario.nombre}
      </p>

      <h3 className="perfil-subtitulo">Historial de compras</h3>
      {usuario.historial && usuario.historial.length > 0 ? (
        <ul className="perfil-historial">
          {usuario.historial.map((compra, index) => (
            <li key={index}>{compra}</li>
          ))}
        </ul>
      ) : (
        <p className="sin-compras">Todavía no tienes ninguna compra.</p>
      )}
    </div>
  );
}
