import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pedido from "../Pedido";

describe("Pedido.jsx", () => {
  test("renderiza correctamente el título y todas las cookies", () => {
    render(<Pedido cart={[]} setCart={jest.fn()} />);
    expect(screen.getByText(/COOKIE DE CHOCOLATE/i)).toBeInTheDocument();
    expect(screen.getByText(/COOKIE OREO/i)).toBeInTheDocument();
    expect(screen.getByText(/COOKIE DE FRUTA/i)).toBeInTheDocument();
    expect(screen.getByText(/COOKIE AVENA/i)).toBeInTheDocument();
    expect(screen.getByText(/COOKIE VAINILLA/i)).toBeInTheDocument();
  });

  test('llama a "setCart" al agregar una cookie', () => {
    const mockSetCart = jest.fn();
    const mockCart = [];

    render(<Pedido cart={mockCart} setCart={mockSetCart} />);

    const boton = screen.getAllByText(/Agregar al carrito/i)[0];

    fireEvent.click(boton);

    expect(mockSetCart).toHaveBeenCalledTimes(1);
    const llamada = mockSetCart.mock.calls[0][0];
    expect(llamada.length).toBe(1);
    expect(llamada[0].name).toBe("COOKIE DE CHOCOLATE");
  });

  test("muestra correctamente el precio de las cookies", () => {
    render(<Pedido cart={[]} setCart={jest.fn()} />);

    const precios = screen.getAllByText(/\$1500/i);
    expect(precios.length).toBe(5);
  });
});
