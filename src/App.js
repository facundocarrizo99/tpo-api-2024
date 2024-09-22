import React from 'react';
import Main from "./layouts/Main";
import GroupPage from "./pages/GroupPage";
import ExpensesPage from "./pages/ExpensePage";
import Login from './pages/LogReg/Login.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/LogReg/Register';
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/budget/:id" element={<GroupPage />} />
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="/Login" element={<Login/>} />
                    <Route path="/Register" element={<Register/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
