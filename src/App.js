import React from 'react';
import {AppBar, Toolbar, Button, Container, Grid, Card, CardContent, Typography, ButtonGroup} from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

function App() {
    return (<div>
            {/* Header */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Toolbar firstChild={true} float="left" alignItems="start">
                        <Typography variant="h6">Arreglemos </Typography>
                        <AssuredWorkloadIcon/>
                    </Toolbar>

                    <Toolbar alignItems="middle">
                        <ButtonGroup disableElevation
                                     variant="contained"
                                     aria-label="Disabled button group"
                                     color="">
                            <Button>Inicio</Button>
                            <Button>Contacto</Button>
                            <Button>Ayuda</Button>
                        </ButtonGroup>
                    </Toolbar>

                    <Toolbar lastChild={true} float="right">
                        <Button color="inherit"><InstagramIcon/></Button>
                        <Button color="inherit"><FacebookIcon/></Button>
                        <Button color="inherit"><XIcon/></Button>
                    </Toolbar>

                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Container maxWidth="md" style={{textAlign: 'center', marginTop: '50px'}}>
                <Typography variant="h3" gutterBottom>
                    Gestiona y Comparte Gastos en Grupo de Manera Sencilla
                </Typography>
                <Typography variant="h6" color="textSecondary" paragraph>
                    ¡Olvídate de las complicaciones al dividir y gestionar gastos! Nuestra aplicación te ayuda a
                    mantener todo bajo control.
                </Typography>
                <Button variant="contained" color="success" size="large" style={{marginRight: '20px'}}>
                    Ingresar
                </Button>
                <Button variant="contained" color="success" size="large">
                    Registrarse
                </Button>
            </Container>

            {/* Feature Section */}
            <Container maxWidth="lg" style={{marginTop: '50px'}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Divide gastos
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Calcula automáticamente quién debe cuánto en cualquier situación.
                                    Sube tus gastos para que los integrantes del grupo los vean.
                                    Elige qué tipo de división se hará para el monto final.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Lleva registro
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Todos pueden ver y revisar sus gastos en cualquier momento.
                                    Acceso fácil al registro de gastos actuales y antiguos.
                                    Comparte historiales con amigos y familiares.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Notificaciones
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Mantén a todo el grupo al tanto con notificaciones instantáneas.
                                    Recibe avisos cuando se agregan o se saldan gastos.
                                    Recordatorios periódicos para aquellos que aún deben dinero.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>);
}

export default App;
