import React, { createContext, useState, useContext } from "react";

// 1️⃣ Creamos el contexto
const AuthContext = createContext();

// 2️⃣ Creamos un proveedor (provider) que envuelve la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Usuario general
  const [role, setRole] = useState(null);  // Role del usuario (cliente/admin)

  const login = (usuario, role) => {
    setUser(usuario);  // Guardamos datos del usuario
    setRole(role);     // Guardamos el role (cliente o admin)
  };

  const logout = () => {
    setUser(null);     // Borramos la sesión
    setRole(null);     // Borramos el role
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3️⃣ Hook para usarlo más fácil
export function useAuth() {
  return useContext(AuthContext);
}
