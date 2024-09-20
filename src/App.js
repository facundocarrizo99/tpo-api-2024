import React from 'react';
import Main from "./layouts/Main";
import GroupPage from "./pages/GroupPage";
import ExpensesPage from "./pages/ExpensePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/budget/:id" element={<GroupPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
