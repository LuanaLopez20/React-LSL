import React from "react";
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

    // Obtiene todos los elementos que contengan "Rellen¡tas"
    const elements = screen.getAllByText("Rellen¡tas");
    expect(elements.length).toBeGreaterThan(0);
  });

  test("muestra la sección ¿Qué es Rellen¡tas?", () => {
    render(
      <MemoryRouter>
        <Home cart={[]} setCart={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("¿Qué es Rellen¡tas?")).toBeInTheDocument();
  });
});
