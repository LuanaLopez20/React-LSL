import React from "react";
import "./Contacto.css"; // Asegúrate de importar el archivo de estilos

function Contacto() {
  return (
    <div className="contacto-container">
      <h2>Ubicación</h2>

      {/* Contenedor de la imagen y el mapa alineados */}
      <div className="contacto-content">
        <img
          src="/ubicacion.jpg"
          alt="Ubicación"
          style={{ maxWidth: "400px", width: "100%", marginTop: "20px" }}
        />
        {/* Imagen opcional */}
        <img src="/ubicacion.jpg" alt="Ubicación" />

        {/* Mapa interactivo */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.004960561449!2d-58.453684225492566!3d-34.679824272927036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc0884322765%3A0xc2713b6b5831d8c1!2sEscuela%20Secundaria%20T%C3%A9cnica%20UBA%20en%20Villa%20Lugano!5e0!3m2!1ses-419!2sar!4v1758549453997!5m2!1ses-419!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Rellenitas"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
