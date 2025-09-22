import React from "react";
import { Link } from "react-router-dom";
import "./Rellenitas.css";
import cookiesData from "./dataCookie";

export default function Rellenitas() {
  const fixedCookies = [
    {
      id: 1,
      nombre: "COOKIE DE CHOCOLATE",
      imagen: "/cookie-chocolate.jpg",
    },
    {
      id: 2,
      nombre: "COOKIE DE AVENA",
      imagen: "/cookie-avena.jpg",
    },
    {
      id: 3,
      nombre: "COOKIE DE FRUTA",
      imagen: "/cookie-fruta.jpg",
    },
    {
      id: 4,
      nombre: "COOKIE DE VAINILLA",
      imagen: "/cookie-vainilla.jpg",
    },
    {
      id: 5,
      nombre: "COOKIE DE OREO",
      imagen: "/cookie-oreo.jpg",
    },
  ];

  // Combinamos las cookies dinámicas y fijas
  const allCookies = [...cookiesData, ...fixedCookies];

  // Recortamos para mostrar solo las primeras 5 galletitas
  const firstFiveCookies = allCookies.slice(0, 5);

  return (
    <div className="galletitas-container">
      <h2>NUESTRAS COOKIES</h2>
      <div className="galletitas-grid">
        {firstFiveCookies.map((cookie) => (
          <div className="galletita" key={cookie.id}>
            <img src={cookie.imagen} alt={cookie.nombre} />
            <p>{cookie.nombre.toUpperCase()}</p>
            <Link to={`/descripcion/${cookie.id}`}>
              <button>Ver descripción</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
