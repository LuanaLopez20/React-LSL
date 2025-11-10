import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Checkout from "../Checkout";

describe("Checkout.jsx - Flujo de Compra Completo", () => {
  const renderCheckout = () =>
    render(
      <Router>
        <Checkout />
      </Router>
    );

  // Limpiar después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Pedido con transferencia bancaria", async () => {
    const { getByRole, getByText, getByPlaceholderText } = renderCheckout();

    // PASO 1: Datos personales
    await userEvent.type(
      getByPlaceholderText("Correo electrónico"),
      "test@ejemplo.com"
    );
    await userEvent.type(getByPlaceholderText("Nombre"), "Ana");
    await userEvent.type(getByPlaceholderText("Apellido"), "Gomez");
    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Continuar/i }));
    });

    // PASO 2: Envío
    await act(async () => {
      await userEvent.click(getByRole("radio", { name: /Envío a domicilio/i }));
    });

    // Llenar dirección
    await userEvent.type(getByPlaceholderText("Dirección"), "Calle Falsa");
    await userEvent.type(getByPlaceholderText("Número"), "123");
    await userEvent.type(getByPlaceholderText("Código Postal"), "1425");

    expect(getByText(/Costo de envío: \$2000/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Continuar/i }));
    });

    // PASO 3: Pago
    await act(async () => {
      await userEvent.click(
        getByRole("radio", { name: /Transferencia Bancaria/i })
      );
    });

    expect(getByText(/CVU:/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Confirmar compra/i }));
    });

    // Verificación final
    expect(getByText("¡Tu pedido fue exitoso!")).toBeInTheDocument();
  });

  test("Pedido con tarjeta y retiro en sucursal", async () => {
    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      queryByPlaceholderText,
    } = renderCheckout();

    // PASO 1: Datos personales
    await userEvent.type(
      getByPlaceholderText("Correo electrónico"),
      "otro@ejemplo.com"
    );
    await userEvent.type(getByPlaceholderText("Nombre"), "Beto");
    await userEvent.type(getByPlaceholderText("Apellido"), "Perez");
    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Continuar/i }));
    });

    // PASO 2: Envío
    await act(async () => {
      await userEvent.click(
        getByRole("radio", { name: /Retiro por sucursal/i })
      );
    });

    expect(getByText(/Ubicación de la Sucursal/i)).toBeInTheDocument();
    expect(getByText(/Calle Ficticia 123/i)).toBeInTheDocument();
    expect(queryByPlaceholderText("Dirección")).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Continuar/i }));
    });

    // PASO 3: Pago
    await act(async () => {
      await userEvent.click(getByRole("radio", { name: /Pago con tarjeta/i }));
    });

    await userEvent.type(
      getByPlaceholderText("Número de tarjeta (12 dígitos)"),
      "111122223333"
    );
    await userEvent.type(
      getByPlaceholderText("Código de seguridad (CVV)"),
      "456"
    );
    await userEvent.type(
      getByPlaceholderText("Nombre del titular de la tarjeta"),
      "Beto Perez"
    );

    await act(async () => {
      await userEvent.click(getByRole("button", { name: /Confirmar compra/i }));
    });

    expect(getByText("¡Tu pedido fue exitoso!")).toBeInTheDocument();
  });
});
