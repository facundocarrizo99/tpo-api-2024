import AddGroupForm from "../components/AddGroupForm";
import {Container, Typography, Button, Box, CircularProgress} from "@mui/material";
import GroupItem from "../components/GroupItem";
import React, { useState, useEffect} from 'react';
import Footer from "../components/Footer/Footer";
import Grid from '@mui/material/Grid2';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Modal from "@mui/material/Modal";
import {Link} from "react-router-dom";
import NavBarDashboard from "../components/NavBarDashboard";
import ModificarPerfil from "../components/ModificarPerfil";

//TODO fetch de la data de los grupos get grupos

function Dashboard() {
    const [budgets, setBudgets] = React.useState([]); // Estado para almacenar los presupuestos o grupos de gastos
    const [openNewGroup, setOpen] = React.useState(false); // Estado para manejar el modal del grupo
    const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para manejar el modal de perfil
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de los datos


    const userId = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('access-token');
    const name = sessionStorage.getItem('userName');
    const nameParts = name.split(' ');
    const firstName = nameParts[0];



    // Función para abrir el modal
    const handleNewGroupOpen = () => setOpen(true);
    // Función para cerrar el modal
    const handleNewGroupClose = () => setOpen(false);
    // Función para abrir el modal
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    // Función para cerrar el modal
    const handleCloseProfileModal = () => setOpenProfileModal(false);


        const fetchBudgets = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/groups/myGroups', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBudgets(data.data); // Suponiendo que los grupos están en data.data según tu controlador
                setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
            } catch (error) {
                console.error('Error fetching groups:', error);
                setLoading(false); // Cambiar el estado de loading cuando los datos estén listos
            }
        };
      

    React.useEffect(() => {
        fetchBudgets();
    }, []);
    


    return (
        <div style={{backgroundColor: "#101010", minHeight: "100vh", display: "flex", flexDirection:"column"}}>
        
            <NavBarDashboard onProfileClick={handleOpenProfileModal}/>

            <Container maxWidth="xl">
                <Typography variant="h3" color="#F8F8F8">Mis Grupos</Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ):(
                budgets && budgets.length > 0 ? (
                    <Container maxWidth="xl">
                        <Typography variant="h4" color="#F8F8F8" marginTop={5} marginBottom={5}>Desde esta ventana puedes gestionar tus Grupos!</Typography>
                        <Grid container spacing={{xs: 2, md: 8}} columns={{xs: 4, sm: 8, md: 12}}>
                            {console.log("budgets:", budgets)}
                            {budgets.map((budget) => {
                                
                            return(  
                                <Grid key={budget.name} size={{xs: 2, sm: 4, md: 4}}>
                                    {/* Envolver GroupItem en un enlace que redirige a la página del grupo */}
                                    <Link to={`/group/${budget.name}`} style={{textDecoration: 'none'}} onClick={sessionStorage.setItem('actualBudget', JSON.stringify(budget))}>
                                        <GroupItem budget={budget}/>
                                    </Link>
                                </Grid>
                            );
                            })}
                        </Grid>
                    </Container>
                ) : (
                    <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
                        <Typography variant="h3" gutterBottom color='#F8F8F8'>
                            Bienvenido de vuelta, <span className="accent">{firstName}</span>
                        </Typography>
                        <Typography variant="h6" color="#F8F8F8">
                            Esto está un poco vacío.
                            Apreta el botón de abajo y crea tu primer grupo de gastos.
                        </Typography>
                    </Container>
                )
                )}
                <Box sx={{marginTop:5, marginLeft: 100, textAlign: "center"}}>
                    <Button variant="contained" color="success" endIcon={<AssuredWorkloadIcon/>}
                            onClick={handleNewGroupOpen} sx={{color: "white", '&:hover': { transform: 'scale(1.1)', }}}>
                        Crear Grupo
                    </Button>
                </Box>
                    <Modal open={openNewGroup} onClose={handleNewGroupClose}>
                        <AddGroupForm open={openNewGroup} onClose={handleNewGroupClose} refreshData={fetchBudgets}/>
                    </Modal>

                    <Modal open={openProfileModal} onClose={handleCloseProfileModal}>
                        <ModificarPerfil open={openProfileModal} onClose={handleCloseProfileModal} refreshData={fetchBudgets}/>
                    </Modal>
                
            </Container>
            <Footer/>
        </div>
    )
}

export default Dashboard;
