import AddGroupForm from "../components/AddGroupForm";
import AddExpenseForm from "../components/AddExpenseForm";
import {Button, Container, Table, Typography} from "@mui/material";
import GroupItem from "../components/GroupItem";
import {Link} from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React from "react";


function Dashboard() {
    const userName = "Facundo";
    const budgets = [];
    const expenses = [];

    return (
        <div style={{backgroundColor: "#101010"}}>
            <ResponsiveAppBar/>
            <div className="dashboard">

                <div className="grid-sm">
                    {budgets && budgets.length > 0 ? (
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddGroupForm/>
                                <AddExpenseForm budgets={budgets}/>
                            </div>
                            <h2>Existing Budgets</h2>
                            <div className="budgets">
                                {budgets.map((budget) => (
                                    <GroupItem key={budget.id} budget={budget}/>
                                ))}
                            </div>
                            {expenses && expenses.length > 0 && (
                                <div className="grid-md">
                                    <h2>Recent Expenses</h2>
                                    <Table
                                        expenses={expenses
                                            .sort((a, b) => b.createdAt - a.createdAt)
                                            .slice(0, 8)}
                                    />
                                    {expenses.length > 8 && (
                                        <Link to="expenses" className="btn btn--dark">
                                            View all expenses
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
                            <Typography variant="h3" gutterBottom color='#F8F8F8'>
                                Welcome back, <span className="accent">{userName}</span>
                            </Typography>
                            <Typography variant="h6" color="#F8F8F8" paragraph>
                                Esto esta un poco Vacio, Apreta el boton de abajo y crea tu primer grupo de gastos.
                            </Typography>
                        </Container>
                    )}
                </div>
            </div>

        </div>
    );
};
export default Dashboard;
