import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();

  // Cargar usuario del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <h2 className="no-login">No has iniciado sesión</h2>
        </div>
      </div>
    );
  }

  // Actualizar valores editados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Guardar cambios
  const handleGuardar = () => {
    localStorage.setItem("user", JSON.stringify(usuario));
    setEditando(false);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-titulo">Mi Perfil ✨</h2>

        <div className="perfil-datos">
          <p>
            <strong>Usuario:</strong>{" "}
            {editando ? (
              <input
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
              />
            ) : (
              usuario.nombre
            )}
          </p>
        </div>

        <h3 className="perfil-subtitulo">Información Personal</h3>
        <div className="perfil-info">
          <p>
            <strong>Teléfono:</strong>{" "}
            {editando ? (
              <input
                type="text"
                name="telefono"
                value={usuario.telefono || ""}
                onChange={handleChange}
              />
            ) : (
              usuario.telefono || "No definido"
            )}
          </p>
          <p>
            <strong>Dirección:</strong>{" "}
            {editando ? (
              <input
                type="text"
                name="direccion"
                value={usuario.direccion || ""}
                onChange={handleChange}
              />
            ) : (
              usuario.direccion || "No definida"
            )}
          </p>
          <p>
            <strong>Miembro desde:</strong> {usuario.creado || "Desconocido"}
          </p>
        </div>

        <h3 className="perfil-subtitulo">Historial de Compras 🛍️</h3>
        {usuario.historial && usuario.historial.length > 0 ? (
          <ul className="perfil-historial">
            {usuario.historial.map((compra, index) => (
              <li key={index}>{compra}</li>
            ))}
          </ul>
        ) : (
          <p className="sin-compras">Todavía no tienes ninguna compra.</p>
        )}

        <div className="perfil-botones">
          {editando ? (
            <button className="boton-guardar" onClick={handleGuardar}>
              Guardar cambios 💾
            </button>
          ) : (
            <button className="boton-editar" onClick={() => setEditando(true)}>
              Editar perfil ✏️
            </button>
          )}

          <button
            className="boton-crear-historial"
            onClick={() => navigate("/pedido")}
          >
            Crear historial
          </button>
        </div>
      </div>
    </div>
  );
}
