import React, { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Creamos el contexto
const AuthContext = createContext();

// 2️⃣ Creamos un proveedor (provider) que envuelve la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Recuperar usuario de localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Para debugear o desarrollo
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const login = (usuario) => {
    setUser(usuario);
    localStorage.setItem("user", JSON.stringify(usuario));
  };

  // Al cerrar sesión, limpiar state y localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
