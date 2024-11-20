import {useParams} from "react-router-dom";
import {Container, List, Typography, Button, Box, ListItem, LinearProgress} from "@mui/material";
import Footer from "../components/Footer/Footer";
import React from "react";
import {BasicSpeedDialAdd} from "../components/BasicSpeedDialAdd";
import ExpenseItem from "../components/ExpenseItem";
import {findGroupByName} from "../GroupBackend";
import {useNavigate} from 'react-router-dom';
import NavBarDashboard from "../components/NavBarDashboard";
import { BasicSpeedDialMod } from "../components/BasicSpeedDialMod";


function GroupPage() {
    const {groupName} = useParams(); // Captura el parámetro de la URL
    const group = findGroupByName(groupName);
    const expenses = group ? group.expenses : [];
    const navigate = useNavigate();

    const handleBackToGroups = () => {
        navigate('/home'); // Cambia la ruta a donde necesites redirigir
    };

    // Función para calcular cuánto debe cada usuario
    const calculateUserDebts = () => {
        if (!group || !group.users || expenses.length === 0) return [];

        const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const userDebts = group.users.map(user => {
            // Calcula cuánto ha aportado cada usuario
            const userContribution = expenses
                .filter(expense => expense.user === user.name)
                .reduce((sum, expense) => sum + expense.amount, 0);

            // Cuota que debería pagar cada usuario
            const userShare = totalExpense / group.users.length;
            const amountOwed = userShare - userContribution;

            return {
                name: user.name,
                owes: amountOwed.toFixed(2), // Redondea a dos decimales
                share: userShare.toFixed(2), // Cuota que debería aportar
                contribution: userContribution.toFixed(2),
            };
        });

        return { userDebts, totalExpense };
    };

    const { userDebts, totalExpense } = calculateUserDebts();





    return (
        <div style={{backgroundColor: "#101010"}}>
            <NavBarDashboard/>
            <Container maxWidth="xl">
                <Typography variant="h4" color="#F8F8F8" marginBottom={1}>Grupo {groupName}</Typography>
                
                {expenses && expenses.length > 0 ? (
                    <Container maxWidth="xl">

                    <Typography variant="h5" style={{ color: '#F8F8F8', textAlign: 'start' }}>Resumen de Deudas</Typography>
                    <List>
                            {userDebts.map(user => {
                                const progressValue = user.owes > 0 
                                ? Math.abs(user.owes) 
                                : Math.abs(user.owes);
                                
                                return(
                                <ListItem key={user.name}>
                                <Box sx={{width: '100%', marginBottom: 2}}>
                                    <Typography variant="body1" color="#F8F8F8">
                                    {user.owes > 0
                                            ? `${user.name} gasto ${user.contribution}$ y tiene que pagar: ${Math.abs(user.owes)} $`
                                            : `${user.name} gasto ${user.contribution}$ y le tienen que pagar: ${Math.abs(user.owes)} $`}
                                    </Typography>

                                    <LinearProgress
                                    variant="determinate"
                                    value={Math.min(100, progressValue)} // Valor asegurado entre 0-100
                                    sx={{height: 10, borderRadius: 5, marginTop: 1, '& .MuiLinearProgress-bar': {backgroundColor: user.owes > 0 ? '#D32F2F' : '#388E3C', // Rojo si debe, verde si le deben
                                    },
                                    }}
                                    />
                                    </Box>
                                </ListItem>

                )})}
                        </List>

                        <Typography variant="h6" color="#F8F8F8" marginTop={1}>
                                                Total gastado: ${totalExpense.toFixed(2)}
                        </Typography>

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
                        
                    <Box sx={{marginTop: 15, display: "flex", justifyContent: "center", position: "relative"}}>
                        <Box sx={{ position: "absolute", display: "flex", justifyContent: "space-around", right: 20, bottom: 20 }}>
                            <BasicSpeedDialMod/>
                            <BasicSpeedDialAdd/>                      
                        </Box>
                        <Button variant="contained" color="error" onClick={handleBackToGroups} sx={{color: "white", '&:hover': { transform: 'scale(1.1)', }}}>Volver a tus Grupos</Button>
                    </Box>

            </Container>
        <Footer/>
    </div>
    )
}

export default GroupPage;