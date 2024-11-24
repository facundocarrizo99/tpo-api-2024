import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verifica si hay un token en sessionStorage al cargar la aplicación
  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    const storedUserId = sessionStorage.getItem("userId"); 
    if (token && storedUserId) {
      setIsLoggedIn(true);
    }
  }, []); // Este useEffect se ejecuta solo una vez, al montar el componente

    // Función para iniciar sesión
    const login = () => {
        setIsLoggedIn(true);
    };

    // Función para cerrar sesión
    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem("access-token"); // Eliminar el token al hacer logout
        sessionStorage.removeItem("userId"); // Eliminar el userId al hacer logoutt
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};