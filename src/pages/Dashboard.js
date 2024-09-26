import AddGroupForm from "../components/AddGroupForm";
import {Container, Typography, Button, Box} from "@mui/material";
import GroupItem from "../components/GroupItem";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React from "react";
import Footer from "../components/Footer/Footer";
import Grid from '@mui/material/Grid2';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Modal from "@mui/material/Modal";
import {Link} from "react-router-dom";
import {fetchData } from '../GroupBackend';


function Dashboard() {
    const userName = "Facundo";
    const budgets = fetchData();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{backgroundColor: "#101010"}}>
            <ResponsiveAppBar/>
            <Container maxWidth="xl">
                <Typography variant="h3" color="#F8F8F8">Existing Groups</Typography>
                {budgets && budgets.length > 0 ? (
                    <Container maxWidth="xl">
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            {budgets.map((budget) => (
                                <Grid key={budget.name} size={{xs: 2, sm: 4, md: 4}}>
                                    {/* Envolver GroupItem en un enlace que redirige a la página del grupo */}
                                    <Link to={`/group/${budget.name}`} style={{textDecoration: 'none'}}>
                                        <GroupItem budget={budget}/>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                ) : (
                    <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
                        <Typography variant="h3" gutterBottom color='#F8F8F8'>
                            Welcome back, <span className="accent">{userName}</span>
                        </Typography>
                        <Typography variant="h6" color="#F8F8F8">
                            Esto está un poco vacío.
                            Apreta el botón de abajo y crea tu primer grupo de gastos.
                        </Typography>
                    </Container>
                )}
                <Box sx={{position: 'fixed', bottom: 30, right: 30, zIndex: 1000}}>
                    <Button variant="contained" endIcon={<AssuredWorkloadIcon/>}
                            onClick={handleOpen}>
                        Crear Grupo
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <AddGroupForm/>
                    </Modal>
                </Box>
            </Container>
            <Footer/>
        </div>
    )
}

export default Dashboard;
