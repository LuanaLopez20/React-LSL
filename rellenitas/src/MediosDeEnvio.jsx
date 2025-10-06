import React, { useState } from "react";
import "./MediosDeEnvio.css"; // Importamos los estilos

const MediosDeEnvio = ({ onCodigoPostalChange }) => {
  const [codigoPostal, setCodigoPostal] = useState("");

  const handleInputChange = (event) => {
    const newCodigoPostal = event.target.value;
    setCodigoPostal(newCodigoPostal);
    console.log("Código Postal ingresado en MediosDeEnvio:", newCodigoPostal);
    onCodigoPostalChange(newCodigoPostal);
  };

  const handleConsultarClick = () => {
    if (codigoPostal) {
      alert(`Consultando el envío para el código postal: ${codigoPostal}`);
    } else {
      alert("Por favor, ingresa un código postal");
    }
  };

  return (
    <div className="codigo-postal">
      <label htmlFor="codigo-postal">Calcula el envio:</label>
      <input
        type="text"
        id="codigo-postal"
        value={codigoPostal}
        onChange={handleInputChange}
        placeholder="Ingresa tu código postal"
      />
      <button onClick={handleConsultarClick}>Consultar</button>
    </div>
  );
};

export default MediosDeEnvio;
