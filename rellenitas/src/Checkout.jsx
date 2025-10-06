import React, { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [step, setStep] = useState(1); // Control del paso actual
  const [paymentMethod, setPaymentMethod] = useState(""); // Método de pago seleccionado
  const [cardNumber, setCardNumber] = useState(""); // Número de tarjeta
  const [cvv, setCvv] = useState(""); // Código de seguridad
  const [cardHolder, setCardHolder] = useState(""); // Nombre del titular de la tarjeta
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false); // Estado para confirmar el pedido

  // Datos de transferencia bancaria
  const cvu = "00000000000000000000000000"; // Reemplaza por tu CVU real
  const alias = "miAliasBancario"; // Reemplaza por tu Alias real
  const email = "tuemail@dominio.com"; // Reemplaza por tu correo real

  // Funciones para manejar los pasos
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1); // Avanzar al siguiente paso
    } else if (step === 3) {
      setPedidoConfirmado(true); // Confirmar el pedido cuando se haga clic en "Confirmar compra"
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1); // Volver al paso anterior
    }
  };

  // Función para manejar el cambio del método de pago
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Función para manejar el cambio del número de tarjeta (12 dígitos)
  const handleCardNumberChange = (e) => {
    const formattedNumber = e.target.value.replace(/\D/g, "").slice(0, 12); // Limitar a 12 dígitos
    setCardNumber(formattedNumber);
  };

  return (
    <div className="checkout-container">
      <div className="steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          1. Datos Personales
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>2. Envío</div>
        <div className={`step ${step === 3 ? "active" : ""}`}>3. Pago</div>
      </div>

      {/* Paso 1 - Datos Personales */}
      {step === 1 && (
        <div className="step-content">
          <h3>Datos Personales</h3>
          <input type="email" placeholder="Correo electrónico" required />
          <input type="text" placeholder="Nombre" required />
          <input type="text" placeholder="Apellido" required />
          <div>
            <button onClick={nextStep}>Continuar</button>
          </div>
        </div>
      )}

      {/* Paso 2 - Envío */}
      {step === 2 && (
        <div className="step-content">
          <h3>Dirección de Envío</h3>
          <input type="text" placeholder="Dirección" required />
          <input type="text" placeholder="Número" required />
          <input type="text" placeholder="Código Postal" required />
          <div>
            <button onClick={prevStep}>Volver</button>
            <button onClick={nextStep}>Continuar</button>
          </div>
        </div>
      )}

      {/* Paso 3 - Pago */}
      {step === 3 && !pedidoConfirmado && (
        <div className="step-content">
          <h3>Pago</h3>

          {/* Opciones de pago: tarjeta o transferencia */}
          <div>
            <label>
              <input
                type="radio"
                value="tarjeta"
                checked={paymentMethod === "tarjeta"}
                onChange={handlePaymentMethodChange}
              />
              Pago con tarjeta
            </label>
            <label>
              <input
                type="radio"
                value="transferencia"
                checked={paymentMethod === "transferencia"}
                onChange={handlePaymentMethodChange}
              />
              Transferencia Bancaria
            </label>
          </div>

          {/* Si elige "Tarjeta", mostrar los campos de tarjeta */}
          {paymentMethod === "tarjeta" && (
            <div>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Número de tarjeta (12 dígitos)"
                maxLength="12"
                required
              />
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Código de seguridad (CVV)"
                maxLength="3"
                required
              />
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Nombre del titular de la tarjeta"
                required
              />
            </div>
          )}

          {/* Si elige "Transferencia", mostrar los campos de transferencia */}
          {paymentMethod === "transferencia" && (
            <div>
              <p>
                <strong>CVU:</strong> {cvu}
              </p>
              <p>
                <strong>Alias:</strong> {alias}
              </p>
              <p>
                <strong>Correo:</strong> {email}
              </p>
              <p>Envía el comprobante de la transferencia a este correo.</p>
            </div>
          )}

          <div>
            <button onClick={prevStep}>Volver</button>
            <button onClick={nextStep}>Confirmar compra</button>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {pedidoConfirmado && (
        <div className="mensaje-exitoso">
          <h3>¡Tu pedido fue exitoso!</h3>
          <p>
            En brevedad nos comunicaremos con vos para entregarte nuestras
            rellenitas.
          </p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
