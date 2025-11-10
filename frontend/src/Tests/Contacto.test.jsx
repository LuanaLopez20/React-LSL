// src/Tests/Contacto.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Contacto from "../Contacto";

describe("Contacto.jsx", () => {
  test("se renderiza el componente sin errores", () => {
    render(<Contacto />);
    expect(screen.getByText("Ubicación")).toBeInTheDocument();
  });

  test("muestra dos imágenes de ubicación", () => {
    render(<Contacto />);
    const imagenes = screen.getAllByAltText("Ubicación");
    expect(imagenes.length).toBe(2);
    imagenes.forEach((img) => {
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining("ubicacion.jpg")
      );
    });
  });

  test("muestra el iframe del mapa con el título correcto", () => {
    render(<Contacto />);
    const mapa = screen.getByTitle("Ubicación Rellenitas");
    expect(mapa).toBeInTheDocument();
    expect(mapa).toHaveAttribute(
      "src",
      expect.stringContaining("google.com/maps")
    );
  });

  test("estructura básica del componente", () => {
    const { container } = render(<Contacto />);
    expect(container.querySelector(".contacto-container")).toBeInTheDocument();
    expect(container.querySelector(".contacto-content")).toBeInTheDocument();
    expect(
      container.querySelector(".map-container iframe")
    ).toBeInTheDocument();
  });
});
