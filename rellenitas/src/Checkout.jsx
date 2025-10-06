import React, { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [step, setStep] = useState(1); // Control del paso actual
  const [paymentMethod, setPaymentMethod] = useState(""); // Método de pago seleccionado
  const [cardNumber, setCardNumber] = useState(""); // Número de tarjeta
  const [cvv, setCvv] = useState(""); // Código de seguridad
  const [cardHolder, setCardHolder] = useState(""); // Nombre del titular de la tarjeta
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false); // Estado para confirmar el pedido
  const [costoEnvio, setCostoEnvio] = useState(null); // Costo de envío
  const [tipoEnvio, setTipoEnvio] = useState(""); // Tipo de envío seleccionado (domicilio o retiro)

  // Datos de transferencia bancaria
  const cvu = "00000000000000000000000000"; // Reemplaza por tu CVU real
  const alias = "miAliasBancario"; // Reemplaza por tu Alias real
  const email = "tuemail@dominio.com"; // Reemplaza por tu correo real

  // Estado para manejar los errores de validación
  const [formError, setFormError] = useState("");

  // Función para permitir solo números en los inputs
  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Reemplaza cualquier cosa que no sea número por una cadena vacía
    e.target.value = numericValue; // Actualiza el valor del input solo con números
  };

  // Función para manejar el cambio del código postal (solo números)
  const handleCodigoPostalChange = (e) => {
    handleInputChange(e); // Usamos la misma lógica de entrada numérica
    const value = e.target.value;
    let costo = 0;

    // Lógica para calcular el costo de envío basado en el código postal
    if (value.startsWith("1")) {
      costo = 2000; // Buenos Aires
    } else if (parseInt(value) <= 250000) {
      costo = 5000; // Menos de 250 km
    } else {
      costo = 7500; // Más de 250 km
    }

    setCostoEnvio(costo); // Actualizar el costo de envío
  };

  // Función para manejar el cambio del número de dirección (solo números)
  const handleNumeroChange = (e) => {
    handleInputChange(e); // Usamos la misma lógica de entrada numérica
  };

  // Función para manejar la elección del tipo de envío
  const handleTipoEnvioChange = (e) => {
    setTipoEnvio(e.target.value);
    setCostoEnvio(null); // Resetear el costo de envío cuando cambian las opciones
  };

  // Funciones para manejar los pasos
  const nextStep = () => {
    let hasError = false;

    // Validación en cada paso
    if (step === 1) {
      const emailInput = document.querySelector('input[type="email"]');
      const nameInput = document.querySelector('input[name="nombre"]');
      const lastNameInput = document.querySelector('input[name="apellido"]');

      if (!emailInput.value || !nameInput.value || !lastNameInput.value) {
        setFormError(
          "Por favor, completa todos los campos en Datos Personales."
        );
        hasError = true;
      }
    }

    if (step === 2) {
      const addressInput = document.querySelector('input[name="direccion"]');
      const numberInput = document.querySelector('input[name="numero"]');
      const postalCodeInput = document.querySelector(
        'input[name="codigoPostal"]'
      );

      if (!addressInput.value || !numberInput.value || !postalCodeInput.value) {
        setFormError(
          "Por favor, completa todos los campos en Dirección de Envío."
        );
        hasError = true;
      }
    }

    if (step === 3) {
      if (paymentMethod === "tarjeta") {
        if (!cardNumber || !cvv || !cardHolder) {
          setFormError(
            "Por favor, completa todos los campos de pago con tarjeta."
          );
          hasError = true;
        }
      } else if (paymentMethod === "transferencia") {
        // Si selecciona transferencia, no es necesario hacer más validación
        setFormError(""); // Limpiar cualquier error anterior si no hay campos vacíos
      }
    }

    // Solo avanzar si no hay errores
    if (!hasError) {
      if (step < 3) {
        setStep(step + 1); // Avanzar al siguiente paso
      } else if (step === 3) {
        setPedidoConfirmado(true); // Confirmar el pedido cuando se haga clic en "Confirmar compra"
      }
    }
  };

  const prevStep = () => {
    // Limpiar datos del formulario al ir hacia atrás
    setFormError(""); // Limpiar errores
    setPedidoConfirmado(false); // Limpiar el mensaje de éxito
    setCostoEnvio(null); // Limpiar el costo de envío
    setTipoEnvio(""); // Limpiar el tipo de envío

    if (step > 1) {
      setStep(step - 1); // Volver al paso anterior
    }
  };

  // Función para manejar el cambio del método de pago
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="checkout-container">
      {/* Si el pedido está confirmado, solo mostrar el mensaje de éxito */}
      {pedidoConfirmado ? (
        <div className="mensaje-exitoso">
          <h3>¡Tu pedido fue exitoso!</h3>
          <p>
            En brevedad nos comunicaremos con vos para entregarte nuestras
            rellenitas.
          </p>
        </div>
      ) : (
        <>
          <div className="steps">
            <div className={`step ${step === 1 ? "active" : ""}`}>
              1. Datos Personales
            </div>
            <div className={`step ${step === 2 ? "active" : ""}`}>2. Envío</div>
            <div className={`step ${step === 3 ? "active" : ""}`}>3. Pago</div>
          </div>

          {/* Mostrar mensaje de error si hay campos faltantes */}
          {formError && <div className="form-error">{formError}</div>}

          {/* Paso 1 - Datos Personales */}
          {step === 1 && (
            <div className="step-content">
              <h3>Datos Personales</h3>
              <input type="email" placeholder="Correo electrónico" required />
              <input type="text" name="nombre" placeholder="Nombre" required />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                required
              />
              <div>
                <button onClick={nextStep}>Continuar</button>
              </div>
            </div>
          )}

          {/* Paso 2 - Envío */}
          {step === 2 && (
            <div className="step-content">
              <h3>Selecciona el tipo de envío</h3>
              <div>
                <label>
                  <input
                    type="radio"
                    value="domicilio"
                    checked={tipoEnvio === "domicilio"}
                    onChange={handleTipoEnvioChange}
                  />
                  Envío a domicilio
                </label>
                <label>
                  <input
                    type="radio"
                    value="sucursal"
                    checked={tipoEnvio === "sucursal"}
                    onChange={handleTipoEnvioChange}
                  />
                  Retiro por sucursal
                </label>
              </div>

              {tipoEnvio === "domicilio" && (
                <div>
                  <h4>Dirección de Envío</h4>
                  <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    required
                  />
                  <input
                    type="text"
                    name="numero"
                    placeholder="Número"
                    required
                    onChange={handleNumeroChange} // Validación de solo números
                  />
                  <input
                    type="text"
                    name="codigoPostal"
                    placeholder="Código Postal"
                    required
                    onChange={handleCodigoPostalChange} // Validación de solo números
                  />
                  {costoEnvio !== null && <p>Costo de envío: ${costoEnvio}</p>}
                </div>
              )}

              {tipoEnvio === "sucursal" && (
                <div>
                  <h4>Ubicación de la Sucursal</h4>
                  <p>
                    Dirección: Calle Ficticia 123, Local 5, Ciudad de Buenos
                    Aires
                  </p>
                </div>
              )}

              <div>
                <button onClick={prevStep}>Volver</button>
                <button onClick={nextStep}>Continuar</button>
              </div>
            </div>
          )}

          {/* Paso 3 - Pago */}
          {step === 3 && (
            <div className="step-content">
              <h3>Pago</h3>
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
                    onChange={(e) => setCardNumber(e.target.value)}
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
        </>
      )}
    </div>
  );
}

export default Checkout;
