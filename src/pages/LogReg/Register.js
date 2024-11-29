import React, {useState} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import {useNavigate} from 'react-router-dom';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const Register = (registerUser) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado
  const [email, setEmail] = useState("");
  const [safetyAnswer, setSafetyAnswer] = useState(""); // Estado para la pregunta de seguridad
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar modal y ejecutar el registro
    handleSubmit();
  };

  const handleCancelModal = () => {
    setIsModalOpen(false); // Cierra el modal al hacer clic en "Cancelar"
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (password !== confirmPassword) { // Validación de contraseñas
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }


      const newUser = { name, email, password, safetyAnswer };
      console.log(newUser);

      try {
        // Llamada al backend para crear un usuario
        const response = await fetch('http://localhost:4000/api/users/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        // Manejo de respuesta del backend
        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || 'Hubo un problema con el registro.'}`);
          return;
        }
        console.log(response)
        
        // Redirigir al login
        alert("Registro exitoso. Ya puedes iniciar sesión.");
        navigate('/Login');
      } catch (error) {
        console.error("Error durante el registro:", error);
        alert("Error al conectar con el servidor.");
      }
    };
    
   
  return (
    <div className= "container">

      <div className= "header">
        <div className= "text-arreglemos"  onClick={() => navigate('/')}>Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">Registrarse</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        <div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Nombre de Usuario" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        
        <div className= "input">
          <EmailIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "email" placeholder= "Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Repita la contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        </div>

      </div>
      
      <div className= "submit-container">
        <div className="submit" onClick={setIsModalOpen}>Registrarse</div>
        <div className="submit gray" onClick={() => navigate('/Login')}>Ingresar</div>
      </div>

      {/* Modal para la pregunta de seguridad */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Pregunta de Seguridad
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            ¿Cual es el nombre de tu mascota?
          </Typography>
          <TextField
            fullWidth
            label="Respuesta"
            variant="outlined"
            value={safetyAnswer}
            onChange={(e) => setSafetyAnswer(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleCloseModal}
          >
            Confirmar
          </Button>

          <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleCancelModal} // Cierra el modal sin ejecutar la acción
        >
          Cancelar
        </Button>
        </Box>
      </Modal>

    </div>

  )
}

export default Register
