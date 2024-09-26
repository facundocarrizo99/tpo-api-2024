import React, {useState} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import {useNavigate} from 'react-router-dom';
import {users, findUser, createUser } from '../../backendLog';

const Register = (registerUser) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = findUser(users, username);
    const existingEmail = users.find(user => user.email === email);

    if (validateEmail(email)) {

      if (existingEmail) {
        console.error("El correo electrónico ya está en uso.");
        alert("El correo electrónico ya está en uso.");
        return;
      }

      if (existingUser) {
        console.error("El nombre de usuario ya existe.");
        alert("El nombre de usuario ya existe.");
        return;
      }

      const newUser = { name: username, email, password };
      createUser(newUser);
      alert("Registro exitoso. Ya puedes iniciar sesion ");
      navigate('/Login');
    } else {
      alert("Por favor, ingrese un correo electrónico válido.");
    }
  };
  

  return (
    <div className= "container">

      <div className= "header">
        <div className= "text-arreglemos">Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">Registrarse</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        <div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
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
