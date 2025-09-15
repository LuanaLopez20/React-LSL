import React from "react";

function Contacto() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Ubicación</h2>

      {/* Imagen opcional */}
      <img
        src="/ubicacion.jpg"
        style={{ maxWidth: "400px", width: "100%", margin: "20px auto" }}
      />

      {/* Mapa interactivo */}
      <div style={{ width: "100%", maxWidth: "800px", margin: "20px auto" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.004960561449!2d-58.453684225492545!3d-34.679824272927036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc0884322765%3A0xc2713b6b5831d8c1!2sEscuela%20Secundaria%20T%C3%A9cnica%20UBA%20en%20Villa%20Lugano!5e0!3m2!1ses-419!2sar!4v1757958487812!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Rellenitas"
        ></iframe>
      </div>
    </div>
  );
}

export default Contacto;
