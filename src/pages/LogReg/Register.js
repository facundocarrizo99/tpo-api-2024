import React, {useState} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import {useNavigate} from 'react-router-dom';

const Register = (registerUser) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

      const newUser = { name, email, password };

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
          <input type= "email" placeholder= "Mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

      </div>
      
      <div className= "submit-container">
        <div className="submit" onClick={handleSubmit}>Registrarse</div>
        <div className="submit gray" onClick={() => navigate('/Login')}>Ingresar</div>
      </div>

    </div>
  )
}

export default Register
