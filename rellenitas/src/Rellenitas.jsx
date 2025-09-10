import React from "react";
import "./Rellenitas.css"; // para estilos propios de esta página

export default function Rellenitas() {
  return (
    <div className="rellenitas-page">
      <h2>NUESTRAS COOKIES</h2>
      <div className="cookies-grid">
        <div>
          <img src="/cookie-chocolate.jpg" alt="Cookie chocolate" />
          <p>COOKIE DE CHOCOLATE</p>
        </div>
        <div>
          <img src="/cookie-avena.jpg" alt="Cookie avena" />
          <p>COOKIE DE AVENA</p>
        </div>
        <div>
          <img src="/cookie-fruta.jpg" alt="Cookie fruta" />
          <p>COOKIE DE FRUTA</p>
        </div>
        <div>
          <img src="/cookie-vainilla.jpg" alt="Cookie vainilla" />
          <p>COOKIE DE VAINILLA</p>
        </div>
        <div>
          <img src="/cookie-oreo.jpg" alt="Cookie oreo" />
          <p>COOKIE DE OREO</p>
        </div>
      </div>
    </div>
  );
}
