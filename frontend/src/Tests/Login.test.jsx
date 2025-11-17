import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../AdminLogin"; // Asumiendo que el componente está en el directorio superior

// 1. Mocking useNavigate para espiar la redirección
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  // Mockeamos Link para que no falle el renderizado
  Link: ({ children }) => <a>{children}</a>,
}));

// 2. Mocking useAuth para espiar la función 'login'
const mockLogin = jest.fn();
jest.mock("../AuthContext", () => ({
  useAuth: () => ({
    user: null,
    role: null,
    login: mockLogin, // Reemplazamos el login real con nuestro espía (jest.fn())
    logout: jest.fn(),
  }),
}));

// 3. Mocking window.alert para evitar que se muestre en el entorno de pruebas
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks(); // Limpiamos los espías después de cada prueba
});

describe("Login.jsx - Funcionalidad de Inicio de Sesión (Éxito)", () => {
  // Helper para realizar el login con un usuario y una contraseña
  const realizarLogin = async (usuario, contraseña) => {
    await userEvent.type(
      screen.getByPlaceholderText(/Usuario o Gmail/i),
      usuario
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Contraseña/i),
      contraseña
    );
    await userEvent.click(
      screen.getByRole("button", { name: /inicia sesión/i })
    );
  };

  // Caso de prueba para verificar que el formulario se renderiza correctamente
  test("renderiza correctamente el título y los campos", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Inicia sesión en Rellenitas")).toBeInTheDocument();
    // Usar un matcher más flexible en getByText
    <p data-testid="emoji-container">🍪</p>;
    expect(screen.getByPlaceholderText(/Usuario o Gmail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /inicia sesión/i })
    ).toBeInTheDocument();
  });

  // Caso 1: Login de Administrador exitoso (KarenDiaz)
  test("login de Administrador (KarenDiaz) llama a login con rol 'admin' y navega a /admin", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await realizarLogin("KarenDiaz", "Diaz1234");

    // 1. Verificar que se llamó a la función de login con el rol 'admin'
    expect(mockLogin).toHaveBeenCalledWith({ email: "KarenDiaz" }, "admin");

    // 2. Verificar el mensaje de alerta
    expect(window.alert).toHaveBeenCalledWith("¡Bienvenido Administrador!");

    // 3. Verificar la redirección
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/admin"));
  });

  // Caso 2: Login de Administrador exitoso (LuanaLopez)
  test("login de Administrador (LuanaLopez) llama a login con rol 'admin' y navega a /admin", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await realizarLogin("LuanaLopez", "Lopez1234");

    // 1. Verificar que se llamó a la función de login con el rol 'admin'
    expect(mockLogin).toHaveBeenCalledWith({ email: "LuanaLopez" }, "admin");

    // 2. Verificar el mensaje de alerta
    expect(window.alert).toHaveBeenCalledWith("¡Bienvenido Administrador!");

    // 3. Verificar la redirección
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/admin"));
  });

  // Caso 3: Login de Usuario Común exitoso
  test("login de Usuario Común llama a login sin rol y navega a /", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await realizarLogin("usuario-comun", "contrasena-normal");

    // 1. Verificar que se llamó a la función de login (sin el rol 'admin')
    expect(mockLogin).toHaveBeenCalledWith({ email: "usuario-comun" });

    // 2. Verificar el mensaje de alerta
    expect(window.alert).toHaveBeenCalledWith("¡Bienvenido a Rellenitas! 🍪");

    // 3. Verificar la redirección a la página principal
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });
});
