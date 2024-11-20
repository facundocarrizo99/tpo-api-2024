import React, { createContext, useState } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Función para iniciar sesión
    const login = () => {
        setIsLoggedIn(true);
    };

    // Función para cerrar sesión
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};