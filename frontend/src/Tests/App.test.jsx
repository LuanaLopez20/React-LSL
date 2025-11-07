import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Simulamos el contexto de autenticación
jest.mock("../AuthContext", () => ({
  useAuth: jest.fn(() => ({
    user: null,
    logout: jest.fn(),
    role: null,
  })),
}));

describe("App.jsx", () => {
  test("renderiza el título principal Rellenitas", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Busca el título del navbar
    expect(screen.getByText(/rellenitas/i)).toBeInTheDocument();
  });

  test("muestra enlaces de navegación principales", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/nuestras cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/haz tu pedido/i)).toBeInTheDocument();
  });
});
