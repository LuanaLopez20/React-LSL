import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Registrate from "../Registrate";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Registrate.jsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente el título y los campos", () => {
    render(
      <MemoryRouter>
        <Registrate />
      </MemoryRouter>
    );

    expect(screen.getByText(/Regístrate en Rellenitas/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Crea tu usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
  });

  test("muestra error si el usuario ya existe", async () => {
    render(
      <MemoryRouter>
        <Registrate />
      </MemoryRouter>
    );

    // Sofía intenta registrarse con un usuario ya registrado
    await userEvent.type(screen.getByPlaceholderText(/Tu nombre/i), "juan");
    await userEvent.type(
      screen.getByPlaceholderText(/Crea tu usuario/i),
      "juan123"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Tu email/i),
      "juan@mail.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/Contraseña/i), "12345");

    await userEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    expect(
      screen.getByText(/ese usuario ya está ocupado/i)
    ).toBeInTheDocument();
  });

  test("permite mostrar y ocultar la contraseña", async () => {
    render(
      <MemoryRouter>
        <Registrate />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);
    const toggle = screen.getByText("👁️‍🗨️");

    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(toggle);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggle);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("realiza el registro exitosamente y navega a Home", async () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <Registrate />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/Tu nombre/i), "Lucía");
    await userEvent.type(
      screen.getByPlaceholderText(/Crea tu usuario/i),
      "lucia"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Tu email/i),
      "lucia@mail.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/Contraseña/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "¡Te registraste en Rellenitas! 🎉🍪"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/", {
      state: { usuario: "lucia" },
    });
  });
});
