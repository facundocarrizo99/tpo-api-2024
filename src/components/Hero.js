import React, {useContext} from 'react'
import {Button, Container, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Importar el contexto de autenticación


function Hero() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext); // Obtener el estado de autenticación y la función de logout
    const handleLogin = () => {
        navigate('/Login');
    }
    const handleRegister = () => {
        navigate('/Register');
    }

    const handleDashboard = () => {
        navigate('/home'); // Redirigir al dashboard
    };

    const handleLogout = () => {
        logout(); // Llamar a la función de logout del contexto
        navigate('/'); // Redirigir al inicio
    };

    

    return (
        <Container maxWidth="md" style={{textAlign: 'center', marginTop: '200px'}}>
            <Typography variant="h3" gutterBottom color='#F8F8F8'>
                Gestiona y Comparte Gastos en Grupo de Manera Sencilla
            </Typography>
            <Typography variant="h6" color="#F8F8F8" paragraph marginTop={"40px"}>
                ¡Olvídate de las complicaciones al dividir y gestionar gastos! Nuestra aplicación te ayuda a
                mantener todo bajo control.
            </Typography>
            <div style={{marginTop: "60px", display: "flex", justifyContent: "center", gap: "30px"}}>
                {isLoggedIn ? (
                    <>
                
                        <Button onClick={handleDashboard} variant="contained" color="success" size="large" sx={{
                                transition: "transform 0.3s ease", "&:hover": {
                                    transform: "scale(1.1)"
                                }
                            }}>
                                Vuelve a tus Grupos
                            </Button>
                            <Button onClick={handleLogout} variant="contained" color="error" size="large" sx={{
                                transition: "transform 0.3s ease", "&:hover": {
                                    transform: "scale(1.1)"
                                }
                            }}>
                                Cerrar sesion
                            </Button>
                    </>
                ):(
                    <>
                        
                        
                        <Button onClick={handleLogin} variant="contained" color="success" size="large" sx={{
                            transition: "transform 0.3s ease", "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }}>
                            Ingresar
                        </Button>
                        <Button onClick={handleRegister} variant="contained" color="success" size="large" sx={{
                            transition: "transform 0.3s ease", "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }}>
                            Registrarse
                        
                        
                        </Button>
                    </>
                )}
            </div>
        </Container>
    )
}

export default Hero
