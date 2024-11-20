import React, {useContext} from 'react';
import Main from "./layouts/Main";
import GroupPage from "./pages/GroupPage";
import Login from './pages/LogReg/Login.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/LogReg/Register';
import Dashboard from "./pages/Dashboard";
import { AuthContext, AuthProvider } from './components/AuthContext'; // Importar el contexto de autenticación

//todo home tiene que tener un usuario logueado que muestra sus grupos /home/:userId

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/Login" />;
}

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/group/:groupName" element={<GroupPage />} />
                        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/Login" element={<Login/>} />
                        <Route path="/Register" element={<Register/>} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
