import React, {useState, useContext} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';

const Login = ({ searchUser}) => {
  //Cambiar username por email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useContext(AuthContext); // Obtener la función de inicio de sesión desde el contexto

  //Tomo valores para hacer la llamada a la base de datos
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Mostrar los valores de email y password
    console.log('Email:', email);
    console.log('Password:', password);
  
    const body = {
      email: email,
      password: password,
    };
    console.log("Request Body:", body); 
  
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        } else {
          alert('Error en el servidor. Intenta más tarde.');
        }
        return;
      }
  
      // Parsear la respuesta del backend
      const data = await response.json();
      console.log('Respuesta JSON:', data);

      const token = data.loginUser.token;
      const userId = data.loginUser.user._id;
      const email = data.loginUser.user.email;
      const userName = data.loginUser.user.name;
    

      // Guardar el token e ID del usuario en sessionStorage
      sessionStorage.setItem('access-token', token);
      sessionStorage.setItem('user_id', userId);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('userName', userName);
      console.log('Token y User ID guardados en sessionStorage:', token, userId, email, userName);

      login();
      
      // Redirigir al usuario a la página principal
      navigate('/Home');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error al conectar con el servidor.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className= "container">

      <div className= "header">
        <div className= "text-arreglemos"  onClick={() => navigate('/')}>Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">Ingresar</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        <div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Email" value={email} onChange={handleEmailChange} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña" value={password} onChange={handlePasswordChange} required/>
        </div>

      </div>
      <div className= "forgot-password">Perdiste tu contraseña? <span>Hace click aqui!</span></div>
      <div className= "submit-container">
        <div className="submit gray"  onClick={() => navigate('/Register')}>Registrarse</div>
        <div className="submit" onClick={handleSubmit} >Ingresar</div>
      </div>

    </form>
  )
}

export default Login