import React from 'react';
import Main from "./layouts/Main";
import GroupPage from "./pages/GroupPage";
import Login from './pages/LogReg/Login.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/LogReg/Register';
import Dashboard from "./pages/Dashboard";

//todo home tiene que tener un usuario logueado que muestra sus grupos /home/:userId

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/group/:groupName" element={<GroupPage />} />
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/Login" element={<Login/>} />
                    <Route path="/Register" element={<Register/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
