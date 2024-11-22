import React, {useState, useContext} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import {users, findUser } from '../../backendLog';
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

  //Ejemplo profe
  /*const handleSubmit = async (e) => {
    e.preventDefault();
    //Llamada a endpoint de log in
    let response = await login(username, password);
    console.log(response);
    console.log("Guardo el token en session storage");
    if(response.status === 200){
      sessionStorage.setItem("access-token", response.token);
      navigate('/Home');
    } else {
      
    }
  }*/

  //Lo que en teoria deberia andar
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
  
      // Guardar el token en sessionStorage
      console.log("Guardo el token en session storage");
      sessionStorage.setItem("access-token", data.token);
  
      // Redirigir al usuario a la página principal
      navigate('/Home');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error al conectar con el servidor.');
    }
  };


  /*const handleSubmit = (e) => {
      e.preventDefault();
      const user = findUser(users, email);
      console.log("Usuario buscado:", user);

      if (user) {
        if (user.password === password) {
          login(user);
          navigate('/Home');
        } else {
          alert("Contraseña incorrecta.");
        }
      } else {
        alert("Usuario no encontrado.");
      }
  };*/
  

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