import React, {useContext} from 'react'
import {AppBar, Toolbar, Button, Container, Grid, Card, CardContent, Typography, ButtonGroup, Avatar} from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Importar el contexto de autenticación

function NavBarDashboard  ({onProfileClick}) {

    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext); // Obtener el estado de autenticación y la función de logout
    const handleLanding = () => {
        navigate('/');
    }
    const handleLogout = () => {
      logout(); // Llamar a la función de logout del contexto
      navigate('/'); // Redirigir al inicio
  };

    //Falta agregar imagen y nombre de usuario como prop. Falta agregar funcionalidad de las pestañas a los botones de perfil y proyectos//

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>

        <div style={{ display: "flex", alignItems: "center", cursor: "pointer", transition: "transform 0.3s ease"}} onClick={handleLanding}  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
          <Typography variant="h6" style={{ color: "#F8F8F8", marginRight: 0 }}>Arreglemos</Typography>
          <AssuredWorkloadIcon className="Logo" style={{ color: "#F8F8F8" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center"}}>
        <Typography variant="body1" style={{ color: "#F8F8F8", marginRight: 30}}>
            Bienvenido, Juan
          </Typography>

          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", transition: "transform 0.3s ease", marginRight: 30}} onClick={onProfileClick} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <Typography variant="body1" style={{ color: "#F8F8F8", marginRight: 10}}>
                Mi Perfil
            </Typography>
            <Avatar 
                alt="Perfil" 
                // Utiliza el parámetro pasado
                style={{ width: 30, height: 30, marginRight: 8 }}/>
          </div>

          <Button variant="contained" sx={{ backgroundColor: "#CC0F0F", color: "white", '&:hover': {transform: 'scale(1.1)', transition: 'transform 0.3s ease'}}} onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

      </Toolbar>
    </AppBar>
  )
}

export default NavBarDashboard
