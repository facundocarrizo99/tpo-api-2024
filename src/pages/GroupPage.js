import {Link, useParams} from "react-router-dom";
import {Box, Button, Container, List, ListItem, ListItemText, Typography} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer/Footer";
import React from "react";
import {BasicSpeedDial} from "../components/BasicSpeedDial";
import ExpenseItem from "../components/ExpenseItem";
import {findGroupByName} from "../helpers";


function GroupPage() {
    const {groupName} = useParams(); // Captura el parámetro de la URL
    const group = findGroupByName(groupName);
    const {expenses} = group.expenses;

    return (
        <div style={{backgroundColor: "#101010"}}>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <Typography variant="h4">Grupo: {groupName}</Typography>
                {expenses && expenses.length > 0 ? (
                    <Container maxWidth="xl">
                        <List>
                            {expenses.map((expense) => (
                                <ExpenseItem expense={expense}/>
                            ))}
                        </List>
                    </Container>
                ) : (
                    <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
                        <Typography variant="h6" color="#F8F8F8">
                            Esto está un poco vacío.
                            Apreta el botón de abajo y carga el primer gasto del grupo.
                        </Typography>
                    </Container>
                )}
                <BasicSpeedDial/>
            </Container>
            <Footer/>
        </div>
    )
}

export default GroupPage;