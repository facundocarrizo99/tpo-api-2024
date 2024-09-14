import React from 'react'
import {AppBar, Toolbar, Button, Container, Grid, Card, CardContent, Typography, ButtonGroup} from '@mui/material';

function Hero() {
  return (
    <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
            <Typography variant="h3" gutterBottom color='#F8F8F8'>
                Gestiona y Comparte Gastos en Grupo de Manera Sencilla
            </Typography>
            <Typography variant="h6" color="#F8F8F8" paragraph>
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
  )
}

export default Hero
