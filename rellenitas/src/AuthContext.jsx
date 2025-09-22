import React, { createContext, useState, useContext } from "react";

// 1️⃣ Creamos el contexto
const AuthContext = createContext();

// 2️⃣ Creamos un proveedor (provider) que envuelve la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (usuario) => {
    setUser(usuario); // Guardamos datos del usuario
  };

  const logout = () => {
    setUser(null); // Borramos la sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3️⃣ Hook para usarlo más fácil
export function useAuth() {
  return useContext(AuthContext);
}
