import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

describe("Home.jsx", () => {
  test("renderiza correctamente el título principal", () => {
    render(
      <MemoryRouter>
        <Home cart={[]} setCart={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/rellen¡tas/i)).toBeInTheDocument();
  });

  test("muestra la sección ¿Qué es Rellen¡tas?", () => {
    render(
      <MemoryRouter>
        <Home cart={[]} setCart={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/¿qué es rellen¡tas\?/i)).toBeInTheDocument();
  });
});
