import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../Carrito";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Carrito.jsx", () => {
  const sampleCart = [
    { id: 1, name: "Cookie de Chocolate", price: 100, img: "cookie1.jpg" },
    { id: 2, name: "Cookie de Vainilla", price: 150, img: "cookie2.jpg" },
    { id: 1, name: "Cookie de Chocolate", price: 100, img: "cookie1.jpg" },
  ];

  let setCartMock;

  beforeEach(() => {
    setCartMock = jest.fn();
    jest.clearAllMocks();
  });

  test("muestra mensaje si el carrito está vacío", () => {
    render(
      <MemoryRouter>
        <Carrito cart={[]} setCart={setCartMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/el carrito está vacío/i)).toBeInTheDocument();
  });

  test("muestra los productos agrupados correctamente", () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/cookie de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/cookie de vainilla/i)).toBeInTheDocument();
    expect(screen.getByText(/cantidad: 2/i)).toBeInTheDocument();
  });

  test("permite agregar una unidad al hacer clic en ➕", async () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    const addButtons = screen.getAllByRole("button", { name: "➕" });
    await userEvent.click(addButtons[0]);

    expect(setCartMock).toHaveBeenCalledTimes(1);
  });

  test("permite eliminar una unidad al hacer clic en ➖", async () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    const removeButtons = screen.getAllByRole("button", { name: "➖" });
    await userEvent.click(removeButtons[0]);

    expect(setCartMock).toHaveBeenCalledTimes(1);
  });

  test("permite eliminar todos los productos de un tipo al hacer clic en 🗑️", async () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByRole("button", { name: "🗑️" });
    await userEvent.click(deleteButtons[0]);

    expect(setCartMock).toHaveBeenCalledTimes(1);
  });

  test("muestra subtotal correcto según cantidad y precio", () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/subtotal \(sin envio\): \$350/i)
    ).toBeInTheDocument();
  });

  test("navega al checkout al presionar 'Proceder al pago'", async () => {
    render(
      <MemoryRouter>
        <Carrito cart={sampleCart} setCart={setCartMock} />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByRole("button", {
      name: /proceder al pago/i,
    });

    await userEvent.click(checkoutButton);
    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
