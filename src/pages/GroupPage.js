import {useParams} from "react-router-dom";
import {Container, List, Typography, Button, Box} from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer/Footer";
import React from "react";
import {BasicSpeedDial} from "../components/BasicSpeedDial";
import ExpenseItem from "../components/ExpenseItem";
import {findGroupByName} from "../GroupBackend";
import {useNavigate} from 'react-router-dom';


function GroupPage() {
    const {groupName} = useParams(); // Captura el parámetro de la URL
    const group = findGroupByName(groupName);
    const expenses = group ? group.expenses : [];
    const navigate = useNavigate();

    const handleBackToGroups = () => {
        navigate('/home'); // Cambia la ruta a donde necesites redirigir
    };


    return (
        <div style={{backgroundColor: "#101010"}}>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <Typography variant="h4" color="#F8F8F8">Grupo: {groupName}</Typography>
                {expenses && expenses.length > 0 ? (
                    <Container maxWidth="xl">
                        <List>
                            {expenses?.map((expense) => (
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
                    <Button variant="contained" color="error" onClick={handleBackToGroups} sx={{color: "white", '&:hover': { transform: 'scale(1.1)', }}}>Volver a tus Grupos</Button>
                </Container>
            <Footer/>
        </div>
    )
}

export default GroupPage;