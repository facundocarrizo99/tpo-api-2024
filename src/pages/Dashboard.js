import AddGroupForm from "../components/AddGroupForm";
import {Container, Typography, Button, Box} from "@mui/material";
import GroupItem from "../components/GroupItem";
import React, { useState } from 'react';
import Footer from "../components/Footer/Footer";
import Grid from '@mui/material/Grid2';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Modal from "@mui/material/Modal";
import {Link} from "react-router-dom";
import {fetchData } from '../GroupBackend';
import NavBarDashboard from "../components/NavBarDashboard";
import ModificarPerfil from "../components/ModificarPerfil";

//TODO fetch de la data de los grupos get grupos

function Dashboard() {
    const userName = "Facundo"; // Nombre del usuario, puedes reemplazarlo por uno dinámico si lo prefieres
    const [budgets, setBudgets] = React.useState([]); // Estado para almacenar los presupuestos o grupos de gastos
    const [openNewGroup, setOpen] = React.useState(false); // Estado para manejar el modal del grupo
    const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para manejar el modal de perfil


    // Función para abrir el modal
    const handleNewGroupOpen = () => setOpen(true);
    // Función para cerrar el modal
    const handleNewGroupClose = () => setOpen(false);
    // Función para abrir el modal
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    // Función para cerrar el modal
    const handleCloseProfileModal = () => setOpenProfileModal(false);

    
    
        // Simulación de la función fetchData que obtiene los grupos de gastos
    React.useEffect(() => {
        const fetchBudgets = async () => {
            const data = await fetchData();  // Asume que fetchData es una función que devuelve los datos
            console.log('Fetched Data:', data); // Revisa la estructura aquí
            setBudgets(data); // Guarda los datos en el estado
        };
        fetchBudgets();
    }, []);

   

    

    return (
        <div style={{backgroundColor: "#101010", minHeight: "100vh", display: "flex", flexDirection:"column"}}>
        
            <NavBarDashboard onProfileClick={handleOpenProfileModal}/>

            <Container maxWidth="xl">
                <Typography variant="h3" color="#F8F8F8">Mis Grupos</Typography>
                {budgets && budgets.length > 0 ? (
                    <Container maxWidth="xl">
                        <Typography variant="h4" color="#F8F8F8" marginTop={5} marginBottom={5}>Desde esta ventana puedes gestionar tus Grupos!</Typography>
                        <Grid container spacing={{xs: 2, md: 8}} columns={{xs: 4, sm: 8, md: 12}}>
                            {console.log("budgets:", budgets)}
                            {budgets.map((budget) => {
                                console.log("Budget Name:", budget.groupName);
                                
                            return(  
                                <Grid key={budget.groupName} size={{xs: 2, sm: 4, md: 4}}>
                                    {/* Envolver GroupItem en un enlace que redirige a la página del grupo */}
                                    <Link to={`/group/${budget.groupName}`} style={{textDecoration: 'none'}}>
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
                            Bienvenido de vuelta, <span className="accent">{userName}</span>
                        </Typography>
                        <Typography variant="h6" color="#F8F8F8">
                            Esto está un poco vacío.
                            Apreta el botón de abajo y crea tu primer grupo de gastos.
                        </Typography>
                    </Container>
                )}
                <Box sx={{marginTop:5, marginLeft: 100, textAlign: "center"}}>
                    <Button variant="contained" color="success" endIcon={<AssuredWorkloadIcon/>}
                            onClick={handleNewGroupOpen} sx={{color: "white", '&:hover': { transform: 'scale(1.1)', }}}>
                        Crear Grupo
                    </Button>
                </Box>
                    <Modal open={openNewGroup} onClose={handleNewGroupClose}>
                        <AddGroupForm open={openNewGroup} onClose={handleNewGroupClose}/>
                    </Modal>

                    <Modal open={openProfileModal} onClose={handleCloseProfileModal}>
                        <ModificarPerfil open={openProfileModal} onClose={handleCloseProfileModal} />
                    </Modal>
                
            </Container>
            <Footer/>
        </div>
    )
}

export default Dashboard;
