import React from 'react';
import Main, {mainLoader} from "./layouts/Main";
import Error from "./pages/Error";
import {deleteBudget} from "./actions/deleteBudget";
import {logoutAction} from "./actions/logout";
import GroupPage, {budgetAction, budgetLoader} from "./pages/GroupPage";
import ExpensesPage, {expensesAction, expensesLoader} from "./pages/ExpensePage";
import {Router, Route, Routes} from "react-router-dom";



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
