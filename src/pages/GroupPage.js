import {Container, List, Typography, Button, Box, ListItem, CircularProgress} from "@mui/material";
import Footer from "../components/Footer/Footer";
import React, {useState, useEffect} from "react";
import {BasicSpeedDialAdd} from "../components/BasicSpeedDialAdd";
import ExpenseItem from "../components/ExpenseItem";
import {useNavigate} from 'react-router-dom';
import NavBarDashboard from "../components/NavBarDashboard";
import EditIcon from '@mui/icons-material/Edit';
import ModificarGrupo from "../components/ModificarGrupo";
import imgPerfil from '../assets/perfil.png';
import ArregloItem from "../components/ArregloItem";


function GroupPage() {

    const token = sessionStorage.getItem('access-token');
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de los datos
    const [actualGroup, setActualGroup] = useState(false);

    const actualGroupId = JSON.parse(sessionStorage.getItem("actualGroup"))._id;
    

    // Ejecutar la función fetchBudget cuando el componente se monte
    React.useEffect(() => {
        console.log('useEffect ejecutado, actualGroupId:', actualGroupId);


        const fetchBudget = async () => {
            try {

                const response = await fetch('http://localhost:4000/api/groups/groupByID', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        'groupid': actualGroupId,
                    },
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
                console.log(data.data);
                setActualGroup(data.data);  // Almacenar los datos en el estado
                //setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
            } catch (error) {
                setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
                console.error('Error fetching groups:', error);
                //setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
            }
        };
        fetchBudget();
    }, []);  

    const groupName = actualGroup.name;
    const expenses = actualGroup ? actualGroup.expenses : []; // Usamos expenses desde actualGroup
    const arreglos = actualGroup ? actualGroup.arreglos : []; // Usamos arreglos desde actualGroup
    const users = actualGroup ? actualGroup.participants : []; // Usamos participants desde actualGroup
    const navigate = useNavigate();

    console.log(expenses);
    console.log(arreglos);
    console.log(users);

    const [isModalOpen, setModalOpen] = useState(false);

    // Funciones para abrir y cerrar el modal
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    
    const handleBackToGroups = () => {
        navigate('/home'); // Cambia la ruta a donde necesites redirigir
    }; 

    
    // Verificar si los datos necesarios están disponibles antes de proceder
    const calculateUserDebts = () => {
        const currentUserId = sessionStorage.getItem('user_id');
        
        if (!currentUserId || users.length === 0 || expenses.length === 0) return [];

        let payments = {};

        // Recorre los arreglos y actualiza los pagos
        arreglos.forEach(arreglo => {
            if (arreglo.payer && arreglo.receiver && arreglo.amount) {
                const amount = parseFloat(arreglo.amount);
                console.log(`Arreglo: ${arreglo.payer} paga a ${arreglo.receiver} ${amount}`); // Depuración

                if (!payments[arreglo.receiver]) payments[arreglo.receiver] = 0;
                if (!payments[arreglo.payer]) payments[arreglo.payer] = 0;
            
                payments[arreglo.receiver] += amount;
                payments[arreglo.payer] -= amount;
            }
        });

        return users
            .map(user => {
                const totalPaidByUser = expenses
                    .filter(expense => expense.owner === user._id)
                    .reduce((sum, expense) => {
                        const amount = parseFloat(expense.amount);
                        console.log(`Gasto de ${user.name}: ${amount}`); // Depuración
                        return sum + amount;
                    }, 0);
                
                //Verificación de total pagado por el usuario
                console.log(`Total pagado por ${user.name}: ${totalPaidByUser}`);

                const userShare = expenses
                    .filter(expense => expense.participants.includes(user._id))
                    .reduce((sum, expense) => {
                        const amount = parseFloat(expense.amount);
                        const share = amount / expense.participants.length;
                        //console.log(`Parte de ${user.name} en el gasto: ${share}`); // Depuración
                        return sum + share;
                    }, 0);

                //Verificación de la parte que debe pagar el usuario
               console.log(`Parte que debe pagar ${user.name}: ${userShare}`);

                const adjustedBalance = Math.round((totalPaidByUser - userShare) - (payments[user._id] || 0));
                console.log(`Balance ajustado de ${user.name}: ${adjustedBalance}`); // Depuración

                return {
                    ...user,
                    balance: adjustedBalance,
                };
            })
    };

    const userDebts = calculateUserDebts();
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);



    return (
        
        <div style={{backgroundColor: "#101010"}}>
            <NavBarDashboard/>
            <Container maxWidth="xl">


            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h3" color="#F8F8F8" marginBottom={1}>{groupName}</Typography>
                <EditIcon sx={{ marginLeft: 1 ,cursor: "pointer", color: "#F8F8F8",'&:hover': { transform: 'scale(1.4)' }}} onClick={handleOpenModal}/>
            </Box>

            {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ):(

                expenses.length > 0 ? (
                    <Container maxWidth="xl">

                    <Typography variant="h4" style={{ color: '#F8F8F8', textAlign: 'start' }}>Resumen de Deudas</Typography>

                    <List>
                        {userDebts.map((user, index) => {
                            const textColor = user.balance < 0 
                                ? '#ef5350' // Deuda pendiente (le debes)
                                : user.balance > 0 
                                    ? '#4caf50' // Deuda a tu favor (te deben)
                                    : '#B0B0B0'; // Deuda saldada (gris claro)

                            return (
                                <ListItem key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: 2,
                                            borderRadius: 2,
                                            backgroundColor: '#2E2E2E', // Fondo para destacar
                                            marginBottom: 2,
                                        }}
                                    >
                                        {/* Sección izquierda: Foto y nombre */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            component="img"
                                            src={user.profilePicture || imgPerfil} // Imagen por defecto si no hay foto
                                            alt={`Foto de perfil de ${user.name}`}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                marginRight: 2,
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease', // Suaviza la animación
                                                    '&:hover': {
                                                transform: 'scale(1.4)', // Escala la imagen al 120%
                                                    },
                                                }}
                                            />
                                        <Typography variant="h6" color="#F8F8F8">
                                            {user.name}
                                        </Typography>
                                    </Box>

                                        {/* Sección derecha: Estado de la deuda */}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: textColor,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                        
                                        {user.balance < 0
                                            ? `Debe pagar ${user.balance.toFixed(2)} $`
                                            : user.balance > 0
                                                ? `Debe recibir ${Math.abs(user.balance).toFixed(2)} $`
                                                : `Deuda saldada`}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </List>

                        <Typography variant="h4" color="#F8F8F8" marginTop={1} sx={{ textAlign: 'right' }}>
                                                Total gastado: ${totalExpense.toFixed(2)}
                        </Typography>

                        <Typography variant="h4" color="#F8F8F8" marginTop={3} sx={{ textDecoration: 'underline', textDecorationColor: '#01579b', textDecorationThickness: 4 }}>
                                    Resumen de Gastos</Typography>
                        <List>
                            {expenses?.map((expense) => (
                                <ExpenseItem key={expense._id} expense={expense} users={users}/>
                            ))}
                        </List>

                        <Typography variant="h4" color="#F8F8F8" marginTop={3} sx={{ textDecoration: 'underline', textDecorationColor: '#01579b', textDecorationThickness: 4 }}>
                                    Resumen de Arreglos</Typography>
                        <List>
                            {arreglos?.map((arreglo) => (
                                <ArregloItem key={arreglo._id} arreglo={arreglo} users={users} />
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
                )
                )}
                        
                    <Box sx={{marginTop: 15, display: "flex", justifyContent: "center", position: "relative"}}>
                        <Box sx={{ position: "absolute", display: "flex", justifyContent: "space-around", right: 20, bottom: 20 }}>
                            <BasicSpeedDialAdd/>                      
                        </Box>
                        <Button variant="contained" color="error" onClick={handleBackToGroups} sx={{color: "white", '&:hover': { transform: 'scale(1.1)', }}}>Volver a tus Grupos</Button>
                    </Box>

            </Container>

            <ModificarGrupo
                open={isModalOpen}
                onClose={handleCloseModal}
            />

        <Footer/>
    </div>
    )
}

export default GroupPage;