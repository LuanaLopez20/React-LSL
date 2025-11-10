import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [countdown, setCountdown] = useState(3); // Contador de 3 segundos
  const [cart, setCart] = useState([]); // Carrito de compras

  const navigate = useNavigate(); // Usamos react-router-dom para navegar

  // Datos de transferencia bancaria
  const cvu = "00000000000000000000000000"; // Reemplaza por tu CVU real
  const alias = "miAliasBancario"; // Reemplaza por tu Alias real
  const email = "tuemail@dominio.com"; // Reemplaza por tu correo real

  // Estado para manejar los errores de validación
  const [formError, setFormError] = useState("");

  // Función para permitir solo números en los inputs genéricos
  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Reemplaza cualquier cosa que no sea número por una cadena vacía
    e.target.value = numericValue; // Actualiza el valor del input solo con números
  };

  // Formato del número de tarjeta (agrega espacios cada 4 dígitos)
  const formatCardNumber = (number) => {
    return number.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // Maneja el cambio del número de tarjeta (se guarda formateado)
  const handleCardNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, ""); // mantener solo dígitos
    const truncated = digitsOnly.slice(0, 12);
    setCardNumber(formatCardNumber(truncated));
  };

  // Maneja el cambio del CVV: sólo números y máximo 3 dígitos
  const handleCvvChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, ""); // quitar todo lo que no sea dígito
    const truncated = digitsOnly.slice(0, 3); // máximo 3 dígitos
    setCvv(truncated);
  };

  // Función para vaciar el carrito después de la compra
  const clearCart = () => {
    setCart([]); // Vaciar el carrito
  };

  // Función para redirigir automáticamente al inicio después de 3 segundos
  useEffect(() => {
    if (pedidoConfirmado && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1); // Reducir el contador cada segundo
      }, 1000);

      // Limpiar el intervalo una vez llegue a 0
      setTimeout(() => {
        clearInterval(timer);
        navigate("/"); // Redirige al inicio, usando React Router
      }, 3000);

      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(timer);
    }
  }, [pedidoConfirmado, countdown, navigate]);

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
    setFormError(""); // Limpiar errores al cambiar opción
  };

  // Funciones para manejar los pasos
  const nextStep = () => {
    let hasError = false;
    setFormError("");

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

      // Validación solo si se selecciona Envío a domicilio
      if (tipoEnvio === "domicilio") {
        if (
          !addressInput.value ||
          !numberInput.value ||
          !postalCodeInput.value
        ) {
          setFormError(
            "Por favor, completa todos los campos en Dirección de Envío."
          );
          hasError = true;
        }
      } else if (!tipoEnvio) {
        setFormError("Por favor, selecciona un tipo de envío.");
        hasError = true;
      }
    }

    if (step === 3) {
      if (paymentMethod === "tarjeta") {
        // Validaciones más precisas usando el estado formateado
        if (
          !isCardNumberValid(cardNumber) ||
          !isCvvValid(cvv) ||
          !isCardHolderValid(cardHolder)
        ) {
          setFormError(
            "Por favor, completa correctamente los campos de pago con tarjeta."
          );
          hasError = true;
        }
      } else if (paymentMethod === "transferencia") {
        // Si selecciona transferencia, no es necesario hacer más validación
        setFormError(""); // Limpiar cualquier error anterior si no hay campos vacíos
      } else {
        setFormError("Por favor, selecciona un método de pago.");
        hasError = true;
      }
    }

    // Solo avanzar si no hay errores
    if (!hasError) {
      if (step < 3) {
        setStep(step + 1); // Avanzar al siguiente paso
      } else if (step === 3) {
        setPedidoConfirmado(true); // Confirmar el pedido cuando se haga clic en "Confirmar compra"
        clearCart(); // Vaciar el carrito después de la compra
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
    // opcional: limpiar campos relacionados al cambiar método
    setCardNumber("");
    setCvv("");
    setCardHolder("");
    setFormError("");
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
          <p style={{ fontSize: "0.8em", color: "#888" }}>
            Te redirigiremos al inicio en {countdown} segundos...
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

              {/* Mostrar campos solo si se selecciona "Envío a domicilio" */}
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
                    onChange={handleNumeroChange}
                  />
                  <input
                    type="text"
                    name="codigoPostal"
                    placeholder="Código Postal"
                    required
                    onChange={handleCodigoPostalChange}
                  />
                  {costoEnvio !== null && <p>Costo de envío: ${costoEnvio}</p>}
                </div>
              )}

              {/* Si se selecciona "Retiro por sucursal", no requiere más validación */}
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
                    onChange={handleCardNumberChange}
                    placeholder="Número de tarjeta (12 dígitos)"
                    maxLength="19" // incluye espacios
                    inputMode="numeric"
                    aria-label="Número de tarjeta"
                    required
                  />
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="Código de seguridad (CVV)"
                    maxLength="3"
                    inputMode="numeric"
                    pattern="\d{3}"
                    aria-label="CVV"
                    required
                  />
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Nombre del titular de la tarjeta"
                    aria-label="Nombre del titular"
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
