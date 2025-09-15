import React from "react";
import "./RellenitasK.css"; // para estilos propios de esta página

export default function Rellenitas() {
  return (
    <div className="galletitas-container">
      <h2>NUESTRAS COOKIES</h2>
      <div className="galletitas-grid">
        <div>
          <div className="galletita">
            <img src="/cookie-chocolate.jpg" alt="Cookie chocolate" />
            <p>COOKIE DE CHOCOLATE</p>
          </div>
        </div>
        <div>
          <div className="galletita">
            <img src="/cookie-avena.jpg" alt="Cookie avena" />
            <p>COOKIE DE AVENA</p>
          </div>
        </div>
        <div>
          <div className="galletita">
            <img src="/cookie-fruta.jpg" alt="Cookie fruta" />
            <p>COOKIE DE FRUTA</p>
          </div>
        </div>
        <div>
          <div className="galletita">
            <img src="/cookie-vainilla.jpg" alt="Cookie vainilla" />
            <p>COOKIE DE VAINILLA</p>
          </div>
        </div>
        <div>
          <div className="galletita">
            <img src="/cookie-oreo.jpg" alt="Cookie oreo" />
            <p>COOKIE DE OREO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
