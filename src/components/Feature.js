import React from 'react'
import {Container, Card, CardContent, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid2';

function Feature() {
  return (
    <Container maxWidth="false" style={{marginTop: "200px"}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Card style={{opacity: 0.85}}>
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
                        <Card style={{opacity: 0.85}}>
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
                        <Card style={{opacity: 0.85}}>
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
  )
}

export default Feature
